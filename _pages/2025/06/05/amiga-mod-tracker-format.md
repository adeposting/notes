---
title: Amiga MOD Tracker Format
date: 2025-06-05
categories:
  - /daw
  - /music-production
  - /vintage-software
  - /amiga
tags:
  - amiga
  - amiga
  - mod-file
  - mod-format
  - software
  - tracker
  - tracker-daw
  - tracker-music
  - vintage-software
---

## Overview

The **Amiga MOD** file format is one of the earliest formats for creating and playing music on personal computers. Originally developed for the **Commodore Amiga** in the late 1980s, it stores music created using **tracker software**, which combines pattern-based sequencing with embedded audio samples.

MOD files encapsulate everything needed to play back a song: samples (instruments), patterns (rows of note events), effects (vibrato, portamento, volume slides, etc.), and playback order. The format became a foundational building block for the **demoscene**, **game audio**, and later **chiptune** and **retro-inspired music**.

---

## History

* **1987** – The MOD format was introduced with **Ultimate Soundtracker** on the Amiga.
* **1989–1990** – Popularity exploded with the release of **ProTracker**, which standardized the format into what is now called the "M.K." MOD format (4 channels, 31 instruments).
* **1990s–present** – Variants with more channels and features appeared (e.g. ScreamTracker, FastTracker, IT, XM), but the classic MOD format remains in use for its Amiga compatibility and retro authenticity.

---

## Tracker Programs

###  Original Amiga Trackers

* **Ultimate Soundtracker** – The original tracker, limited features but groundbreaking.
* **ProTracker** – The gold standard; introduced the 4-channel "M.K." format.
* **OctaMED** – Supported 8-channel playback using CPU mixing.

### Modern Trackers and Tools

* **OpenMPT (Open ModPlug Tracker)** – Powerful Windows-based tracker that supports MOD and many other formats.
* **MilkyTracker** – Cross-platform clone of FastTracker II with full MOD support.
* **SchismTracker** – Modernized clone of Impulse Tracker with MOD import/export.
* **Deflemask** – Multi-chip tracker supporting Amiga MOD among other vintage formats.
* **libxmp** – A portable C library for MOD/XM/S3M/IT playback, used in many players and emulators.
* **Renoise** – A modern digital audio workstation (DAW) that evolved from the tracker paradigm.

---

## Advantages of MOD Files 

* **Authenticity** – Perfect for retro Amiga-style games or demos.
* **Portability** – Self-contained, minimal overhead.
* **Efficiency** – Extremely small file sizes (compared to WAV or MP3).
* **Simplicity** – Easy to parse and understand compared to full MIDI or DAWs.

---

## Format Specification (ProTracker 4-Channel)

```ascii
==============================================================
                AMIGA MOD FILE FORMAT SPECIFICATION
                (ProTracker-compatible, 4 channels)
==============================================================

A standard ProTracker MOD file is a binary file with the following layout:

--------------------------------------------------------------
| Offset | Length | Description
--------------------------------------------------------------
| 0x000  | 20     | Song title (ASCII, null-padded)
--------------------------------------------------------------
| 0x014  | 30 × 31 = 930 bytes | Sample headers (31 instruments)
         Each sample header has the following layout:
         ------------------------------------------------------
         | Offset | Length | Field
         ------------------------------------------------------
         | 0x00   | 22     | Sample name (ASCII)
         | 0x16   | 2      | Sample length (in words = 2 bytes, so ×2 for bytes)
         | 0x18   | 1      | Finetune (4-bit signed nibble stored as byte: 0–15)
                           |   (0–7 = 0 to +7 semitones, 8–15 = -8 to -1)
         | 0x19   | 1      | Volume (0–64)
         | 0x1A   | 2      | Loop start (in words)
         | 0x1C   | 2      | Loop length (in words)
         ------------------------------------------------------
         (Total = 30 bytes per sample × 31 samples = 930 bytes)
--------------------------------------------------------------
| 0x3B6  | 1      | Song length (number of positions to play, 0–127)
| 0x3B7  | 1      | Restart position (usually 0)
--------------------------------------------------------------
| 0x3B8  | 128    | Pattern order table (sequence of pattern numbers)
--------------------------------------------------------------
| 0x438  | 4      | Signature (identifies format):
         - "M.K." = 4-channel MOD (ProTracker)
         - "M!K!" = alternate ProTracker
         - "6CHN", "8CHN", etc. = more channels
         NOTE: "M.K." is the most common Amiga-compatible MOD.
--------------------------------------------------------------
| 0x43C  | n × 1024 | Pattern data
         Each pattern is 64 rows × 4 channels × 4 bytes = 1024 bytes
         Each "note" is 4 bytes, packed as follows:
         ------------------------------------------------------
         Byte 0: Upper 4 bits of sample number + upper 4 bits of period
         Byte 1: Lower 8 bits of period
         Byte 2: Lower 4 bits of sample number + upper 4 bits of effect
         Byte 3: Effect parameter
         ------------------------------------------------------
         Notes are stored row-major: all 4 channels for row 0, then row 1, etc.
         Number of patterns is inferred from the highest index in the pattern table.
--------------------------------------------------------------
| After patterns | Sample data for all instruments
         The sample data is raw signed 8-bit PCM, one block per sample
         Length of each sample = sample length × 2 bytes (from header)
--------------------------------------------------------------

==============================================================
                    DETAILS AND NOTES
==============================================================

- PERIOD TABLE:
  Notes are encoded as "periods" (inverse of frequency). Common values:
    C-3 = 428, C#3 = 404, D-3 = 381, ..., C-4 = 214, etc.
  There is a standard lookup table to convert periods to notes.

- EFFECT COMMANDS:
  The effect command is 1 hex digit, and the parameter is 2 hex digits.
  Examples:
    0xy – Arpeggio
    1xy – Portamento up
    2xy – Portamento down
    3xy – Tone portamento
    4xy – Vibrato
    9xx – Sample offset
    Axy – Volume slide
    Bxx – Jump to order
    Cxx – Set volume
    Dxy – Pattern break
    Fxx – Set speed (<= 32) or tempo (> 32)

- SAMPLE DATA:
  - Each sample is raw 8-bit signed PCM audio.
  - Sample length and loop values are in *words* (2 bytes).
  - Volume is 0–64. Finetune is signed 4-bit (0–15).

- COMPATIBILITY:
  - "M.K." format is standard for Amiga MODs (4 channels, 31 samples).
  - File size is variable: grows with number of patterns and sample data.
  - Real Amiga hardware and ProTracker clones expect strict adherence to the format.

==============================================================
                    COMMON LIMITATIONS
==============================================================

- Max samples: 31
- Max patterns: 64 (though pattern table can index up to 128)
- Max channels: 4 (for "M.K." format; others exist but not Amiga-safe)
- Sample size per instrument: up to 64 KB (in bytes)
- No support for stereo, 16-bit, or compressed samples
- All samples are inline; no external sample banks

==============================================================
                    EXAMPLE PATTERN ENTRY (HEX)
==============================================================
Example 4-byte note:
  0x48 0x71 0x37 0x0F
Split:
  Byte 0: 0x48 → 0100 1000
     → Sample high nibble = 4
     → Period high nibble = 8
  Byte 1: 0x71 → Period low byte = 0x71
     → Period = 0x871 = 2161 (somewhere between C-4 and B-3)
  Byte 2: 0x37 → Sample low nibble = 7
     → Sample = (4 << 4) | 7 = 0x47 = 71
     → Effect = 3
  Byte 3: 0x0F → Effect param = 0F
     → Full effect command: 3 0F = Tone portamento with param 0F

==============================================================
                    END OF SPECIFICATION
==============================================================
```

---

## See Also

* [ProTracker Clone for Windows](https://16-bits.org/pt.php)
* [MilkyTracker](https://milkytracker.org/)
* [libxmp](https://xmp.sourceforge.net/) – A C library for MOD playback
* [The MOD Archive](https://modarchive.org/) – Huge collection of MOD music
* [OpenMPT](https://openmpt.org/) – Advanced tracker with MOD support
