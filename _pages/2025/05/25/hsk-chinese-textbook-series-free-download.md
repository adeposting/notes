---
title: "HSK Chinese Textbook Series Free Download"
date: 2025-05-25
tags:
    - china
    - chinese
    - languages 
    - hsk
    - mandarin
    - mandarin-chinese
    - learn-chinese
categories:
    - /learn-chinese
---

**DISCLAIMER:** This article is for educational purposes only. I do not endorse piracy, and purchased the HSK textbook series myself before looking for digital copies. I use the digital versions on the go, instead of carrying around heavy textbooks. Always respect copyright laws in your country. Remember: lie, but never steal.

## tl;dr

**Already know what HSK is and just want to download the textbooks and workbooks?**

* HSK Textbooks and Workbooks 1 through 6 are available for download in this [HSK Google Drive Folder](https://drive.google.com/drive/folders/1sokLkXNydcG5jzs-i639_38LU3bzga1f).
* [Mandarin Time on SoundCloud](https://soundcloud.com/user-682871665/) has playlists with the audio for all the textbooks and workbooks, as well as mock test audio. 
* Use `yt-dlp` to download the playlists - e.g. `yt-dlp https://soundcloud.com/user-682871665/sets/hsk-1-textbook-audio` - you can install `yt-dlp` via Homebrew with `brew install yt-dlp`.

---

## What is the HSK?

The **HSK** (Hanyu Shuiping Kaoshi) is China’s official Mandarin proficiency test for non-native speakers. It has six levels, from beginner (HSK 1) to near-native fluency (HSK 6).

---

## What Are the HSK Textbooks and Workbooks?

The official HSK textbook and workbook series helps learners prepare for the exam. Each level usually includes:

* A **Textbook** with lessons, dialogues, and grammar explanations.
* A **Workbook** with exercises and practice activities.

Higher levels, like HSK 4, 5, and 6, are often split into A and B volumes due to the volume of material.

---

## Where to Download HSK Textbooks and Workbooks

If you want digital copies, there’s a website hosting PDFs for HSK levels 1 through 6:

* [HSK Textbooks and Workbooks — baulchino.com](https://www.baulchino.com/en/libros-hsk)

This page links to a Google Drive folder:

* [HSK Google Drive Folder](https://drive.google.com/drive/folders/1sokLkXNydcG5jzs-i639_38LU3bzga1f)

Note that these files don’t include audio.

---

## Where to Get HSK Audio

You can find audio tracks for the textbooks, workbooks, and mock exams at this SoundCloud account:

* [Mandarin Time on SoundCloud](https://soundcloud.com/user-682871665/)

This account offers:

* Audio for **HSK textbooks and workbooks** across all levels.
* Mock **test audio for HSK 1–6**.

Additionally to HSK, it has:

* **HSKK mock tests** for Primary, Intermediate, and Advanced levels.

### What is HSKK?

**HSKK** (Hanyu Shuiping Kouyu Kaoshi) is the speaking version of the HSK. It has three levels:

* **Primary:** simple daily conversations.
* **Intermediate:** expressing opinions and retelling short texts.
* **Advanced:** fluent, nuanced speech on complex topics.

---

## How to Download the Audio

To download audio instead of streaming, use [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) - this tool is typically used to download videos from sites like YouTube, but also supports Soundcloud.

On macOS, install it with [Homebrew](https://brew.sh/):

```bash
brew install yt-dlp
```

For example, o download the HSK 1 textbook audio playlist:

```bash
yt-dlp https://soundcloud.com/user-682871665/sets/hsk-1-textbook-audio
```

Repeat this process for each of the playlists you want to download.

SoundCloud files may be in formats like `opus`. If your player doesn’t support them, try [VLC](https://www.videolan.org/vlc/).

To convert them to other formats like `mp3`, see my [ffmpeg CLI One-Liners Cheatsheet](https://adeposting.com/ffmpeg-cli-one-liners-cheatsheet).
