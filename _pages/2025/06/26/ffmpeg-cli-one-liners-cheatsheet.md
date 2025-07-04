---
title: "ffmpeg CLI One-Liners Cheatsheet"
date: 2025-06-26
tags:
    - audio
    - cli
    - development
    - engineering
    - ffmpeg
    - ffprobe
    - media
    - one-liners
    - software
    - software-development
    - software-engineering
    - video
categories:
    - /cheatsheet
    - /cli
    - /development
---

This is a cheatsheet of useful `ffmpeg` CLI commands for manipulating, converting, and editing video and audio in various formats.

Most are "one-liners", but a few more complex examples are included too.

For other one-liner cheatsheets, see my [CLI One-Liners Cheatsheets](https://adeposting.com/cli-one-liners-cheatsheets) page.

## Dependencies

* `ffmpeg`
* `ffprobe`

---

## Basic Usage

### Convert input to output with automatic format detection

**Automatic format detection via file extension**

```bash
ffmpeg -i "$INPUT" "$OUTPUT"
```

### Show help

```bash
ffmpeg -h
```

---

## Info & Inspection

### Show media file info

```bash
ffmpeg -i "$INPUT"
```

### Show only format and stream info

```bash
ffprobe "$INPUT"
```

### Print duration in seconds

```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$INPUT"
```

### Print video resolution

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$INPUT"
```

---

## Conversion & Transcoding

### Convert video to another format (e.g. mp4)

```bash
ffmpeg -i "$INPUT" "$OUTPUT.mp4"
```

### Change container without re-encoding

```bash
ffmpeg -i "$INPUT" -c copy "$OUTPUT"
```

### Convert to specific video codec

```bash
ffmpeg -i "$INPUT" -c:v libx264 -c:a aac "$OUTPUT"
```

---

## Audio Operations

### Extract audio to mp3

```bash
ffmpeg -i "$INPUT" -vn -acodec libmp3lame "$OUTPUT.mp3"
```

### Convert audio bitrate

```bash
ffmpeg -i "$INPUT" -b:a 192k "$OUTPUT"
```

### Change audio sample rate

```bash
ffmpeg -i "$INPUT" -ar 44100 "$OUTPUT"
```

### Merge audio and video from separate files

```bash
ffmpeg -i "$VIDEO_INPUT" -i "$AUDIO_INPUT" -c copy "$OUTPUT"
```

---

## Video Operations

### Extract video without audio

```bash
ffmpeg -i "$INPUT" -an "$OUTPUT"
```

### Change frame rate

```bash
ffmpeg -i "$INPUT" -r 30 "$OUTPUT"
```

### Scale video to new resolution

```bash
ffmpeg -i "$INPUT" -vf scale=1280:720 "$OUTPUT"
```

### Encode video for lower file size

```bash
ffmpeg -i "$INPUT" -vcodec libx265 -crf 28 "$OUTPUT"
```

---

## Subtitles

### Burn subtitles into video

```bash
ffmpeg -i "$INPUT" -vf subtitles="$SUBTITLE_FILE" "$OUTPUT"
```

### Extract subtitles to .srt

```bash
ffmpeg -i "$INPUT" "$OUTPUT.srt"
```

---

## Cutting / Trimming

### Trim a video (start at \$START for \$DURATION seconds)

```bash
ffmpeg -i "$INPUT" -ss "$START" -t "$DURATION" -c copy "$OUTPUT"
```

### Cut a video (re-encode for precise cuts)

```bash
ffmpeg -i "$INPUT" -ss "$START" -to "$END" "$OUTPUT"
```

---

## Merging & Concatenation

### Concatenate videos with identical codecs (file list)

```bash
ffmpeg -f concat -safe 0 -i "$LIST_FILE" -c copy "$OUTPUT"
```

### Concatenate videos using intermediate TS files

```bash
ffmpeg -i "$VIDEO1" -c copy -bsf:v h264_mp4toannexb -f mpegts temp1.ts
ffmpeg -i "$VIDEO2" -c copy -bsf:v h264_mp4toannexb -f mpegts temp2.ts
ffmpeg -i "concat:temp1.ts|temp2.ts" -c copy -bsf:a aac_adtstoasc "$OUTPUT"
```

---

## Filters & Effects

### Increase brightness

```bash
ffmpeg -i "$INPUT" -vf eq=brightness=0.1 "$OUTPUT"
```

### Rotate video 90 degrees clockwise

```bash
ffmpeg -i "$INPUT" -vf "transpose=1" "$OUTPUT"
```

### Blur video

```bash
ffmpeg -i "$INPUT" -vf "boxblur=10:1" "$OUTPUT"
```

---

## Metadata Handling

### Set metadata title

```bash
ffmpeg -i "$INPUT" -metadata title="My Title" -codec copy "$OUTPUT"
```

### Remove all metadata

```bash
ffmpeg -i "$INPUT" -map_metadata -1 -codec copy "$OUTPUT"
```

---

## Recursive / Non-One-Liner Operations (ffmpeg)

### Batch Convert All Videos in a Folder

**Convert all .mp4 files in a folder to .mkv**

```bash
for f in *.mp4; do
  ffmpeg -i "$f" "${f%.mp4}.mkv"
done
```

### Batch Resize Videos

**Scale every .mp4 file to 720p**

```bash
for f in *.mp4; do
  ffmpeg -i "$f" -vf scale=1280:720 "720p_${f}"
done
```

### Conditional Processing Based on Bitrate

**Check video bitrate and skip files under 500kbps**

```bash
for f in *.mp4; do
  bitrate=$(ffprobe -v error -select_streams v:0 \
            -show_entries stream=bit_rate \
            -of default=noprint_wrappers=1:nokey=1 "$f")
  if [ "$bitrate" -gt 500000 ]; then
    ffmpeg -i "$f" -c:v libx265 -crf 28 "converted_${f}"
  else
    echo "Skipping $f (bitrate too low)"
  fi
done
```

### Concatenate Many Videos Dynamically

**Automatically generate a list file and concatenate videos**

```bash
# Generate list.txt
ls part*.mp4 | while read f; do
  echo "file '$f'" >> list.txt
done

# Run concat
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
```

### Process All Videos in Nested Folders

**Re-encode every video recursively**

```bash
find . -type f -name "*.mp4" | while read f; do
  dir=$(dirname "$f")
  base=$(basename "$f" .mp4)
  ffmpeg -i "$f" -c:v libx264 -crf 23 "$dir/${base}_converted.mp4"
done
```

### Dynamic Subtitle Time Shifting

**Shift subtitles forward by 3 seconds (requires calculating time offsets)**

```bash
ffmpeg -i input.srt -sub_charenc UTF-8 \
  -vf "subtitles=input.srt:force_style='Alignment=2'" \
  -ss 00:00:03 -c:a copy shifted_output.mp4
```

*(Or with specialized subtitle tools, which is often simpler.)*

### Advanced Filter Graphs

**Overlay logo, blur background, and scale video all at once**

```bash
ffmpeg -i "$INPUT" -i logo.png \
  -filter_complex "
    [0:v]scale=1280:720,boxblur=10:1[blurred];
    [blurred][1:v]overlay=W-w-10:H-h-10
  " -c:a copy "$OUTPUT"
```

### Example Complex Command 

**Convert a video, scale to 720p, burn subtitles, trim to 30 seconds:**

```bash
ffmpeg -i "$INPUT" -vf "scale=1280:720,subtitles=$SUBTITLE_FILE" -ss 00:00:10 -t 30 "$OUTPUT"
```
