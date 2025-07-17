---
title: "How to Export and Backup All iMessage Chats"
date: 2025-05-10
tags:
    - apple
    - backup
    - export
    - imessage
    - iphone
    - macos 
categories:
    - /apps
    - /iphone
---

This page gives you a simple tool to export and backup all of your iMessage chats, including all attachments such as images.

It uses the truly beautiful [imessage-exporter](https://github.com/ReagentX/imessage-exporter) tool by Christopher Sardegna under the hood, so all credit goes to them. Find them at [@ReagentX on GitHub](https://github.com/ReagentX) or [@rxcs on X](https://x.com/rxcs). Go follow them there, or check out thier website at [chrissardegna.com](https://chrissardegna.com).

The `imsg-dl.py` tool in this article makes some simple yet convenient improvements to `imessage-exporter`, including sensible defaults for downloading messages in multiple formats with all attachments (e.g. images), and re-naming chat logs with the name in your contacts instead of just their phone number.

## tl;dr

**Just want to export your iMessage chats and don't care about the rest?**

1. Download `imessage-exporter` using `cargo install imessage-exporter` (if you don't have Cargo installed, install it with `curl https://sh.rustup.rs -sSf | sh`).
2. Copy-paste `imsg-dl.py` in the [appendix](https://adeposting.com/how-to-export-all-imessage-chats#appendix) section of this page.
3. Open the Mac OS Contacts application, select all (⌘A), go to **File → Export → Export vCard…**, save as `contacts.vcf`.
4. Run `chmod +x imsg-dl.py && imsg-dl.py --vcard-path ~/contacts.vcf`.
5. Messages will be available in HTML and plaintext format in `<today's-date>_imessage_export_html` and `<today's-date>_imessage_export_txt` respectively.

## In More Detail...

The tool, `imsg-dl.py` is a Python script designed to automate the export of iMessage conversations from macOS and to rename exported files with contact names sourced from a macOS vCard file. It acts as a wrapper around the third-party tool `imessage-exporter` and provides additional processing to improve the usability of exported message logs.

The script allows:

* Exporting iMessage conversations in HTML or plain text formats (already possible with `imessage-exporter` alone).
* Parsing a vCard file to extract contact names and phone numbers (new feature not possible with `imessage-exporter`).
* Renaming exported message files to include contact names rather than only phone numbers (new feature not possible with `imessage-exporter`).

By default, `imessage-exporter` names exported conversation files using phone numbers or raw identifiers, which can be difficult to interpret. `imsg-dl.py` resolves this by mapping phone numbers to human-readable contact names. This provides cleaner, more understandable filenames for archived message histories.

### Prerequisites

To use `imsg-dl.py`, you will need to install the `imessage-exporter` tool that the script uses under the hood.

You can download `imessage-exporter` using `cargo install imessage-exporter`.

If you don't have Cargo installed, install it with `curl https://sh.rustup.rs -sSf | sh`

### Features

* Exports iMessage chats using the external `imessage-exporter` CLI tool.
* Supports HTML and plain text output formats.
* Parses macOS vCard files (`.vcf`) exported from the Contacts application.
* Maps phone numbers (by the last seven digits) to contact names.
* Renames exported files to include contact names.
* Supports logging to console or file.
* Provides a command-line interface for ease of use.

### How It Works

#### Command-Line Interface

`imsg-dl.py` exposes a command-line interface. Core arguments include:

* `--vcard-path`: Path to the `.vcf` file exported from macOS Contacts.app.
* `--format`: One or more formats for export (`html` or `txt`).
* `--export-path`: Root folder under which export folders are created.
* `--rename-only`: Skip the export step and only rename existing files.
* Logging options (`--verbose`, `--debug`, `--quiet`, `--log-level`, `--log-file`).

Example usage:

```bash
imsg-dl.py --vcard-path ~/contacts.vcf --format html --export-path ./exports
```

#### Export Process

When not run in `--rename-only` mode, the script:

1. Validates the vCard file and the export directory.
2. Runs `imessage-exporter` for each requested format (HTML or TXT).
3. Writes the export files to a dated folder under the export path.

`imessage-exporter` is executed via subprocess with specific arguments, depending on the chosen format. For HTML, the `--copy-method` is set to `full`. For TXT, the method is disabled.

#### Parsing the vCard

The script processes the vCard file in several steps:

* Filters the vCard to include only essential lines (`BEGIN:VCARD`, `END:VCARD`, `FN:`, and `TEL`).
* Splits the vCard into individual contact blocks.
* For each contact:

  * Extracts the contact’s full name (`FN`).
  * Extracts all phone numbers.
  * Normalizes phone numbers to retain only digits, and stores the last seven digits as a key.
  * Converts the name to a filesystem-safe string by replacing non-alphanumeric characters with underscores and limiting length.

This creates a lookup table mapping the last seven digits of a phone number to a contact name.

#### Renaming Files

After export (or in rename-only mode), the script renames message files:

* It processes each file whose name begins with a `+` symbol, typical of phone-number-based filenames.
* It checks whether a file is already renamed (i.e. contains underscores).
* For each numeric part in the filename:

  * Extracts the digits.
  * Looks up the last seven digits in the vCard mapping.
  * If a match is found, replaces the number with a string including both the phone number and the contact’s sanitized name.
* Writes the renamed file to disk, unless a file with the new name already exists.

Files for which no matching contact is found remain unchanged apart from possible number formatting.

#### vCard Export Instructions

The script includes help text describing how to export a vCard from macOS:

1. Open the macOS Contacts application.
2. Select all contacts (⌘A).
3. Go to **File → Export → Export vCard…**
4. Save the `.vcf` file.

This vCard is then supplied to `imsg-dl.py` using `--vcard-path`.

### Implementation Details

* Written in Python 3.
* Uses `argparse` for CLI parsing.
* Logging functionality with `logger`.
* Leverages `pathlib` for filesystem operations.
* Depends on external tool `imessage-exporter` compiled into the user’s Cargo bin directory (`~/.cargo/bin/imessage-exporter`).
* Designed to avoid overwriting existing export directories unless explicitly directed otherwise.

### Limitations

* Only the last seven digits of phone numbers are used for matching, which can cause collisions if contacts share similar number endings.
* Does not process iMessage handles that are emails or Apple IDs unless they appear in the vCard.
* Relies on the format and output conventions of `imessage-exporter`, which may change in future versions.
* Long contact names are truncated to 50 characters for filename safety.

## Appendix

**Here's the script**:

```python
#!/usr/bin/env python3

# ------------------------------
# Imports
# ------------------------------

from datetime import datetime
from itertools import chain
from pathlib import Path
from typing import Dict, List, Optional
import argparse
import logging
import os
import re
import subprocess
import sys


# ------------------------------
# Class iMsgDL
# ------------------------------


class iMsgDL:
    """
    Encapsulates functionality for running imessage-exporter
    and renaming exported files based on a macOS vCard.

    Attributes:
        vcard_path (Path): Path to the exported vCard file.
        formats (List[str]): List of formats to export (txt, html).
        export_root (Path): Root directory where exports are stored.
        rename_only (bool): Whether to skip export and only rename files.
        phone_to_name (Dict[str, str]): Mapping from last 7 digits of phone number
            to contact name.
        logger (logging.Logger): Logger instance for progress and errors.
    """

    def __init__(
        self,
        vcard_path: Path,
        formats: List[str],
        export_root: Path,
        rename_only: bool,
        log_level: str,
        log_file: Optional[Path],
    ):
        self.vcard_path = vcard_path
        self.formats = formats
        self.export_root = export_root
        self.rename_only = rename_only
        self.phone_to_name: Dict[str, str] = {}
        self.logger = self._setup_logger(log_level, log_file)

    def _setup_logger(self, level: str, logfile: Optional[Path]) -> logging.Logger:
        """
        Configures the Python logger.

        Args:
            level: Logging level as a string.
            logfile: Optional path to a file for writing logs.

        Returns:
            Configured logging.Logger instance.
        """
        numeric_level = getattr(logging, level.upper(), None)
        if not isinstance(numeric_level, int):
            numeric_level = logging.INFO

        handlers = [logging.StreamHandler(sys.stdout)]
        if logfile:
            handlers.append(logging.FileHandler(str(logfile)))

        logging.basicConfig(
            level=numeric_level,
            format="[%(levelname)s] %(message)s",
            handlers=handlers,
        )
        logger = logging.getLogger("iMsgDL")
        logger.debug("Logger initialized with level %s", level.upper())
        return logger

    def run(self) -> None:
        """
        Main entry point for running exports and renaming operations.
        """
        self.logger.info("Starting iMsgDL process")
        self._validate_inputs()
        self._parse_vcard()

        for fmt in self.formats:
            export_path = self._export_path_for_format(fmt)

            if not self.rename_only:
                if export_path.exists():
                    self._fail(
                        f"Export path already exists: {export_path}. "
                        f"Refusing to overwrite. Use --rename-only if you only want to rename."
                    )
                copy_method = self._choose_copy_method(fmt)
                self._run_exporter(fmt, copy_method, export_path)

            if export_path.exists():
                self._rename_files(export_path)
            else:
                self.logger.warning(
                    f"Export path does not exist for format {fmt}: {export_path}. "
                    f"Skipping renaming."
                )

        self.logger.info("iMsgDL completed successfully.")

    def _validate_inputs(self) -> None:
        """
        Validates input paths and CLI arguments.
        """
        self.logger.debug(f"Validating vCard path: {self.vcard_path}")
        if not self.vcard_path.exists():
            self._fail(f"vCard file not found: {self.vcard_path}")
        if not self.vcard_path.is_file():
            self._fail(f"vCard path is not a file: {self.vcard_path}")

        self.logger.debug(f"Validating export root: {self.export_root}")
        if not self.export_root.exists():
            self.logger.info(f"Creating export root: {self.export_root}")
            self.export_root.mkdir(parents=True)

        if not self.formats:
            self.logger.info("No formats specified. Defaulting to ['html', 'txt']")
            self.formats = ["html", "txt"]

    def _parse_vcard(self) -> None:
        """
        Parses vCard file and populates phone-to-name lookup table.
        """
        filtered_vcf = self._filter_vcard(self.vcard_path)
        total_contacts = self._count_vcards(filtered_vcf)

        block: List[str] = []
        processed = 0

        with filtered_vcf.open() as f:
            for line in f:
                line = line.rstrip("\n")
                if line == "BEGIN:VCARD":
                    block = [line]
                elif line == "END:VCARD":
                    block.append(line)
                    self._process_vcard_block(block)
                    processed += 1
                    self.logger.info(f"Processed {processed}/{total_contacts} contacts")
                else:
                    block.append(line)

        filtered_vcf.unlink()
        self.logger.info(
            f"Finished parsing vCard. Loaded {len(self.phone_to_name)} phone mappings."
        )

    def _filter_vcard(self, vcf_path: Path) -> Path:
        """
        Filters vCard file for only relevant lines.

        Args:
            vcf_path: Path to original vCard file.

        Returns:
            Path to the filtered temporary vCard file.
        """
        filtered = vcf_path.with_suffix(".filtered")
        with vcf_path.open() as infile, filtered.open("w") as outfile:
            for line in infile:
                if line.startswith(("BEGIN:VCARD", "END:VCARD", "FN:", "TEL")):
                    outfile.write(line)
        self.logger.debug(f"Filtered vCard written to: {filtered}")
        return filtered

    def _count_vcards(self, vcf_path: Path) -> int:
        """
        Counts the number of contacts in a filtered vCard file.

        Args:
            vcf_path: Path to filtered vCard.

        Returns:
            Number of BEGIN:VCARD entries.
        """
        count = sum(1 for line in vcf_path.open() if line.startswith("BEGIN:VCARD"))
        self.logger.debug(f"Found {count} vCard blocks")
        return count

    def _process_vcard_block(self, block: List[str]) -> None:
        """
        Processes a single vCard block and updates lookup table.

        Args:
            block: Lines from one vCard contact block.
        """
        long_name = ""
        numbers: List[str] = []

        for line in block:
            if line.startswith("FN:"):
                long_name = line[3:]
            elif line.startswith("TEL"):
                phone = self._clean_phone(line.split(":", 1)[1])
                if phone:
                    numbers.append(phone)

        short_name = self._shorten_name(long_name)

        if long_name and numbers:
            for phone in numbers:
                self.phone_to_name[phone] = short_name
                self.logger.debug(f"Mapped phone {phone} → {short_name}")

    def _clean_phone(self, raw_phone: str) -> str:
        """
        Normalizes a phone string to last 7 digits.

        Args:
            raw_phone: Raw TEL string from vCard.

        Returns:
            String of last 7 digits, or empty string if invalid.
        """
        digits = "".join(c for c in raw_phone if c.isdigit())
        if len(digits) >= 7:
            last7 = digits[-7:]
            self.logger.debug(f"Cleaned phone {raw_phone} → {last7}")
            return last7
        else:
            self.logger.debug(f"Ignoring phone number too short: {raw_phone}")
            return ""

    def _shorten_name(self, name: str) -> str:
        """
        Removes parentheses or brackets and trims the name for filenames.

        Args:
            name: Original contact name.

        Returns:
            Cleaned name suitable for filenames.
        """
        clean_name = re.sub(r"\s*[\(\[].*?[\)\]]", "", name).strip()
        clean_name = re.sub(r"[^A-Za-z0-9_]", "_", clean_name)
        if len(clean_name) > 50:
            self.logger.warning(f"Truncating long name for filename safety: {clean_name}")
            clean_name = clean_name[:50]
        self.logger.debug(f"Shortened name: {name} → {clean_name}")
        return clean_name

    def _choose_copy_method(self, fmt: str) -> str:
        """
        Determines copy method based on export format.

        Args:
            fmt: Export format ('html' or 'txt').

        Returns:
            String representing copy method for imessage-exporter.
        """
        if fmt == "html":
            return "full"
        elif fmt == "txt":
            return "disabled"
        else:
            self._fail(f"Unknown format: {fmt}")

    def _run_exporter(self, fmt: str, copy_method: str, export_path: Path) -> None:
        """
        Runs the imessage-exporter CLI tool.

        Args:
            fmt: Export format.
            copy_method: Copy method argument.
            export_path: Destination path for export files.
        """
        binary = self._get_exporter_path()
        cmd = [
            str(binary),
            "--format", fmt,
            "--copy-method", copy_method,
            "--export-path", str(export_path),
        ]

        self.logger.info(f"Running imessage-exporter: {' '.join(cmd)}")
        self._run_subprocess(cmd)
        self.logger.info(f"Export completed: {export_path}")

    def _run_subprocess(self, cmd: List[str]) -> None:
        """
        Executes a subprocess command.

        Args:
            cmd: List of command-line arguments.
        """
        subprocess.run(cmd, check=True)

    def _rename_files(self, export_dir: Path) -> None:
        """
        Renames message export files based on vCard mappings.

        Args:
            export_dir: Directory containing exported message files.
        """
        renamed = 0
        skipped = 0

        for file_path in chain(export_dir.glob("+*.txt"), export_dir.glob("+*.html")):
            stem = file_path.stem

            # Skip files already renamed (contain an underscore)
            if "_" in stem:
                self.logger.debug(f"Skipping already-renamed file: {file_path.name}")
                skipped += 1
                continue

            # Split on commas for multi-number files
            numbers_raw = [n.strip() for n in stem.split(",")]

            new_segments = []
            for num_str in numbers_raw:
                digits = "".join(c for c in num_str if c.isdigit())
                if len(digits) >= 7:
                    last7 = digits[-7:]
                    name = self.phone_to_name.get(last7)
                    if name:
                        safe_name = name.replace(" ", "_")
                        safe_name = re.sub(r"[^A-Za-z0-9_]", "_", safe_name)
                        new_segment = f"+{digits}_{safe_name}"
                    else:
                        new_segment = f"+{digits}"
                    new_segments.append(new_segment)
                else:
                    self.logger.warning(f"Skipping unrecognizable number part: {num_str}")
                    new_segments.append(num_str)

            new_filename = "_".join(new_segments) + file_path.suffix
            new_path = export_dir / new_filename

            if new_path.exists():
                self.logger.warning(f"File already exists, skipping rename: {new_filename}")
                skipped += 1
                continue

            file_path.rename(new_path)
            self.logger.info(f"Renamed {file_path.name} → {new_filename}")
            renamed += 1

        self.logger.info(
            f"Renaming complete. Renamed: {renamed} files. Skipped: {skipped} files."
        )

    def _clean_filename_number(self, text: str) -> str:
        """
        Extracts last 7 digits from a filename stem.

        Args:
            text: Filename stem.

        Returns:
            Last 7 digits of phone number, or empty string if insufficient length.
        """
        digits = "".join(c for c in text if c.isdigit())
        return digits[-7:] if len(digits) >= 7 else ""

    def _get_exporter_path(self) -> Path:
        """
        Returns path to imessage-exporter binary.

        Returns:
            Path to binary.
        """
        return Path.home() / ".cargo" / "bin" / "imessage-exporter"

    def _export_path_for_format(self, fmt: str) -> Path:
        """
        Constructs export path for a given format.

        Args:
            fmt: Format string.

        Returns:
            Path to the export folder for this format.
        """
        date_prefix = datetime.now().strftime("%Y-%m-%d")
        return self.export_root / f"{date_prefix}_imessage_export_{fmt}"

    def _fail(self, message: str) -> None:
        """
        Logs an error and raises a runtime exception.

        Args:
            message: Error message to log.
        """
        self.logger.error(message)
        raise RuntimeError(message)


# ------------------------------
# CLI
# ------------------------------


def cli(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Export iMessages from macOS and rename exported message files "
            "to include contact names from your vCard."
        ),
        epilog=(
            "How to export your vCard:\n"
            "  1. Open the Contacts app on macOS.\n"
            "  2. Select all contacts (⌘A).\n"
            "  3. Go to File → Export → Export vCard…\n"
            "  4. Save your vCard, e.g. ~/contacts.vcf\n\n"
            "Examples:\n"
            "  imsgdl.py --vcard-path ~/contacts.vcf\n"
            "  imsgdl.py --vcard-path ~/contacts.vcf --format txt\n"
            "  imsgdl.py --vcard-path ~/contacts.vcf --rename-only --export-path ./my_exports"
        ),
        formatter_class=argparse.RawTextHelpFormatter,
    )

    parser.add_argument(
        "--vcard-path",
        type=Path,
        required=True,
        help="Path to exported vCard (.vcf) file from Contacts.app",
    )

    parser.add_argument(
        "--format",
        action="append",
        choices=["html", "txt"],
        help="Export format(s): html or txt. Can be specified multiple times.",
    )

    parser.add_argument(
        "--export-path",
        type=Path,
        default=Path.cwd(),
        help="Root directory under which export folders will be created. Defaults to current directory.",
    )

    parser.add_argument(
        "--rename-only",
        action="store_true",
        help="Skip running imessage-exporter and only rename files in existing export directories.",
    )

    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Enable verbose output.",
    )

    parser.add_argument(
        "--debug",
        action="store_true",
        help="Enable debug output.",
    )

    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Suppress non-error output.",
    )

    parser.add_argument(
        "--log-level",
        choices=["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"],
        help="Explicit logging level. Overrides other flags.",
    )

    parser.add_argument(
        "--log-file",
        type=Path,
        help="Write logs to file instead of stdout.",
    )

    args = parser.parse_args(argv)

    # Determine log level priority:
    level = "INFO"

    env_level = os.environ.get("IMSGDL_LOG_LEVEL")
    if env_level:
        level = env_level

    if args.log_level:
        level = args.log_level
    elif args.debug:
        level = "DEBUG"
    elif args.verbose:
        level = "INFO"
    elif args.quiet:
        level = "ERROR"

    try:
        downloader = iMsgDL(
            vcard_path=args.vcard_path,
            formats=args.format or [],
            export_root=args.export_path,
            rename_only=args.rename_only,
            log_level=level,
            log_file=args.log_file,
        )
        downloader.run()
        return 0
    except RuntimeError as e:
        print(str(e))
        return 1


if __name__ == "__main__":
    sys.exit(cli())
```