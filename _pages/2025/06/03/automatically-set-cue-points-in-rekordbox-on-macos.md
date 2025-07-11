---
title: Automatically Set CUE Points in Rekordbox on MacOS
date: 2025-06-03
categories:
  - /dj
  - /rekordbox
tags:
  - applescript
  - code
  - dj
  - music
  - osascript
  - programming
  - rekordbox
  - software
  - software-development
  - software-engineering
---

<video style="margin:auto;display:flex;" width="80%" height="auto" autoplay loop muted>
  <source src="/automatically-set-cue-points-in-rekordbox-on-macos_featured-image.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

This article describes a JavaScript-based automation script for Rekordbox that helps DJs automatically set memory cues, hot cues, and beatgrids for their tracks. The script is particularly useful for batch processing multiple tracks in a playlist, saving time and ensuring consistent cue point placement.

## Prerequisites

Before using the script, you need to set up the keyboard shortcuts in Rekordbox:

1. Open Rekordbox
2. Go to rekordbox => Preferences => Keyboard
3. Download and import the [`rekordbox.mappings`](/automatically-set-cue-points-in-rekordbox-on-macos_rekordbox.mappings) file
4. Alternatively, manually configure the following shortcuts under "Performance 1 (Preset)" for "Deck 1":

### Essential Keyboard Shortcuts

#### Basic Controls
- Play/Pause: shift + `[`
- Cue: `S`
- Return to beginning: `T`
- Next Track: `U`

#### Memory Cue Controls
- Set Memory Cue: `V`
- Delete Memory Cue: `W`
- Call Next Memory Cue: `X`
- Call Previous Memory Cue: `Y`
- Memory Cues 1-10: `A` through `J`
- Delete Memory Cues 1-10: `Shift + A` through `Shift + J`

#### Hot Cue Controls
- Pad mode - Hot Cue: `[`
- Pad A: `]`
- Set Hot Cues A-H: `K` through `R`
- Clear Hot Cues A-H: `Shift + K` through `Shift + R`

#### Navigation Controls
- Forward 4 beats: `Shift + S`
- Forward 8 beats: `Shift + T`
- Forward 16 beats: `Shift + U`
- Forward 8 bars: `Shift + V`
- Backward 4 beats: `Shift + W`
- Backward 8 beats: `Shift + X`
- Backward 16 beats: `Shift + Y`
- Backward 8 bars: `Shift + Z`
- Set 1.1 Bars: `Z`

## Script Functionality

The script provides several automated functions for managing cue points:

### 1. Memory Cue Management
- **Set Memory Cues**: Automatically places memory cues at regular intervals throughout the track, any existing memory cues *will* be deleted.
  - *Set memory cues from first beat of track*: Set memory cues starting at the first beat of the track, note that this is not bar 1.1, but in instead the first beat of the track.
  - *Set memory cues from hot cue A*: Set memory cues starting at hot cue A, note that hot cue A must be set.

- **Delete Memory Cues**: Removes all memory cues from the selected tracks
  - *Delete memory cues*: Deletes any existing memory cues.

### 2. Hot Cue Management
- **Set Hot Cues**: Places hot cues at strategic points relative to memory cues, memory cues must be set first, any existing hot cues *will not* be deleted.
	- *Set hot cues*: Sets all hot cues.
- **Clear Hot Cues**: Removes all hot cues from the selected tracks
  - *Clear hot cues*: Deletes any existing hot cues.

### 3. Bar Setting
- **Set 1.1 Bars**: Automatically sets the 1.1 bar marker, adjusting the beat grid.
  - *Set 1.1 bars at first beat of track*: Set bar 1.1 at the first beat of the track, note that this is not bar 1.1, but in instead the first beat of the track.
  - *Set 1.1 bars at hot cue A*: Set bar 1.1 at hot cue A, note that hot cue A must be set.

## Usage

1. Open the **Rekordbox** application.
2. Download the [`rekordbox.js`](/automatically-set-cue-points-in-rekordbox-on-macos_rekordbox.js).
3. Open the **Script Editor** application.
4. Open the `rekordbox.js` script in the **Script Editor**.
5. Change the language to Javascript.
6. Click the **Run** button.

> Running the script requires Rekordbox to be open and running; you **cannot** change the focussed window from Rekordbox until the script completes. 

When you run the script, it will present a series of prompts:

1. **Action Selection**: Choose from:
	- Set memory cues from first beat of track
	- Set memory cues from hot cue A
	- Delete memory cues
	- Set hot cues
	- Clear hot cues
	- Set 1.1 bars at first beat of track
	- Set 1.1 bars at hot cue A

2. **Genre Selection**: Currently supports:
   - Drum & Bass (with specific cue point patterns)

More genres coming soon!

3. **Track Count**: Enter the number of tracks to process

4. **Confirmation**: Review and confirm the action

## Genre-Specific Settings

### Drum & Bass
- Memory cues are placed every 16 bars
- Hot cues are set relative to memory cues with specific spacing
- Optimized for typical DnB track structure

## Technical Details

The script uses JavaScript for macOS automation (JXA) to:
- Control Rekordbox through keyboard shortcuts
- Navigate through tracks
- Set and clear cue points
- Handle user input through dialog boxes
- Manage timing and delays between actions

## Limitations

- Currently optimized for Drum & Bass tracks
- Requires specific keyboard shortcut configuration
- Works only on macOS
- Processes tracks sequentially

## Future Improvements

- Support for additional genres
- Customizable cue point patterns
- Batch processing optimization
- Additional cue point types
- Error handling and recovery

## Installation

1. Download the script file [`rekordbox.js`](/automatically-set-cue-points-in-rekordbox-on-macos_rekordbox.js)
2. Make it executable: `chmod +x rekordbox.js`
3. Ensure the keyboard shortcuts are configured
4. Run the script: `./rekordbox.js`

## Troubleshooting

If the script doesn't work as expected:
1. Verify keyboard shortcuts are correctly configured
2. Ensure Rekordbox is running and in focus
3. Check that tracks are loaded in the playlist
4. Verify the number of tracks matches your input

## See Also

- [Category: /dj](/notes-by-category#category-/dj)

## Appendix

### `rekordbox.js`

```js
```
{: data-src='/automatically-set-cue-points-in-rekordbox-on-macos_rekordbox.js' }