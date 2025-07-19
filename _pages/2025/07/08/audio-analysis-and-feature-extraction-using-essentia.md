---
title: "Audio Analysis and Feature Extraction Using Essentia"
date: 2025-07-08
tags:
  - audio
  - engineering
  - audio-engineering
  - feature-extraction
  - audio-programming
  - music-programming
categories:
  - /audio/engineering
---

This article provides a script for analysis and feature extraction of audio files, in particular for music. Use cases include feature extraction for training AI models, but it is useful in general for various audio engineering purposes.

**Usage**

**1.** Install dependencies

```bash
$ pip install essentia
```

**2.** Copy-paste [the script](#the-script) into `analyze_track.py`.

**3.** Run the script

```bash
$ python3 analyze_track.py /path/to/track.mp3
```

**4.** Observe the output, for example

```json
{
  "request": {
    "location": "/path/to/track.mp3" // The path to the audio file being analyzed
  },
  "response": {
    "summary": {
      "bpm": 128.0,                   // Beats per minute (tempo)
      "key": "F#",                    // Detected root key
      "scale": "minor",               // Scale type (major/minor)
      "camelot": "11A",               // Camelot wheel key notation for DJs
      "energy_norm": 0.72,            // Normalized energy (0–1), how intense the track feels
      "brightness_norm": 0.61,        // Normalized tonal brightness (0–1), treble-heavy feel
      "vocal_presence_norm": 0.18,    // Normalized vocal prominence (0–1)
      "set_role": "peak",             // Suggested DJ set placement (e.g., intro, peak, breakdown)
      "mood": {
        "dark_bright": 0.61,          // 0–1 position on dark ↔ bright mood spectrum
        "chill_intense": 0.72         // 0–1 position on chill ↔ intense energy spectrum
      }
    },
    "rhythm": {
      "bpm": 128.0,                   // Repeated for context; tempo of track
      "beats": [0.48, 0.95, 1.42, 1.89, 2.36], // Timestamps (sec) of detected beats
      "bars": [0.48, 2.36, 4.24, 6.12],        // Timestamps (sec) of detected bar downbeats
      "beat_clarity": 0.031,          // Beat strength (0–1, low if syncopated or noisy)
      "tempo_stability": 0.985        // Consistency of tempo (0–1, 1 = steady)
    },
    "tonal": {
      "key": "F#",                    // Detected root key again (for tonal section)
      "scale": "minor",               // Scale (major/minor)
      "key_confidence": 0.82,         // Confidence (0–1) in detected key
      "chords": ["F#m", "D", "E", "C#"],       // Detected prominent chords
      "chord_strength": [0.67, 0.59, 0.62, 0.53], // Confidence (0–1) per chord
      "harmonic_complexity": 0.052,   // Measure of harmonic density (relative scale)
      "tuning_frequency": 440.2,      // Detected tuning reference (Hz)
      "camelot": "11A"                // Camelot wheel key notation (repeated)
    },
    "dynamics": {
      "loudness_lufs": -8.5,          // Integrated loudness in LUFS (broadcast standard)
      "dynamic_range_db": 9.1,        // Peak-to-average dynamic range (dB)
      "intro_energy": 0.042,          // Energy (0–1) during intro
      "outro_energy": 0.051,          // Energy (0–1) during outro
      "overall_energy": 0.145,        // Average energy (0–1) across the whole track
      "breakdowns": [16.0, 64.0, 128.0], // Timestamps (sec) where breakdowns start
      "drops": [32.0, 96.0, 160.0]    // Timestamps (sec) for energy drops or EDM “drops”
    },
    "timbre": {
      "brightness": 0.61,             // Tonal brightness (0–1), similar to brightness_norm
      "spectral_flux": 0.035,         // Rate of spectral change between frames (motion)
      "spectral_contrast": [18.2, 14.5, 9.8, 6.3, 4.1, 3.2], // Contrast between peaks and valleys per frequency band
      "spectral_rolloff": 15320.0,    // Frequency (Hz) below which ~90% of energy is contained
      "zero_crossing_rate": 0.092,    // Rate of waveform zero crossings (can indicate noisiness)
      "bass_pct": 0.42,               // Proportion of energy in low frequencies
      "mids_pct": 0.36,               // Proportion of energy in mid frequencies
      "highs_pct": 0.22               // Proportion of energy in high frequencies
    },
    "content": {
      "vocal_presence": 0.18,         // Overall vocal presence (0–1)
      "percussiveness": 0.42,         // Percussion prominence (0–1)
      "instrumentalness": 0.82        // Likelihood track is instrumental (0–1)
    }
  }
}
```

## The Script

```python
#!/usr/bin/env python3
"""
Analyzes a single audio track and outputs a comprehensive JSON profile
containing BPM, key, tonal, rhythmic, timbral, and dynamic features.

This script is designed for audio engineers who need *offline* track analysis to:
- Plan harmonic and energy-consistent sets.
- Identify cue points, breakdowns, and drops.
- Understand track brightness, vocal content, bass/mid/high balance.

Relies on Essentia (standard) for feature extraction.
"""

import sys
import json
import numpy as np
import essentia.standard as es

# ------------------------
# Tunable Constants (no magic numbers)
# ------------------------

# Frame size for RMS energy calculation (in seconds)
FRAME_SEC = 1.0

# Frequency bands for EQ balance (Hz)
BASS_RANGE = (20, 200)
MIDS_RANGE = (200, 2000)
HIGHS_RANGE = (2000, 20000)

# Thresholds for detecting breakdowns and drops (multiples of mean energy)
BREAKDOWN_THRESHOLD = 0.5
DROP_THRESHOLD = 1.5

# Default sample rate from Essentia’s MonoLoader
DEFAULT_SAMPLE_RATE = 44100

# Energy normalization range (typical RMS values for mixed tracks)
ENERGY_MIN = 0.0
ENERGY_MAX = 0.2  # Most mastered music falls under ~0.2 RMS

# Beats per bar (most EDM is 4/4)
BEATS_PER_BAR = 4


# ------------------------
# Utility Functions
# ------------------------

def normalize(value, min_val, max_val):
    """
    Normalize a value to 0–1 based on expected min and max.
    Returns 0 if min == max (avoid division by zero).
    """
    return 0.0 if max_val == min_val else (value - min_val) / (max_val - min_val)


def camelot_key(key, scale):
    """
    Converts musical key + scale into Camelot wheel notation (e.g., 8A, 12B).

    Camelot wheel is based on the circle of fifths:
    - Numbers 1–12 represent keys around the circle.
    - 'A' = minor, 'B' = major.
    """
    circle = [
        ('G', 'major'), ('D', 'major'), ('A', 'major'), ('E', 'major'),
        ('B', 'major'), ('F#', 'major'), ('Db', 'major'), ('Ab', 'major'),
        ('Eb', 'major'), ('Bb', 'major'), ('F', 'major'), ('C', 'major'),
        ('E', 'minor'), ('B', 'minor'), ('F#', 'minor'), ('Db', 'minor'),
        ('Ab', 'minor'), ('Eb', 'minor'), ('Bb', 'minor'), ('F', 'minor'),
        ('C', 'minor'), ('G', 'minor'), ('D', 'minor'), ('A', 'minor')
    ]
    try:
        idx = circle.index((key, scale))
        num = (idx % 12) + 1
        letter = 'B' if scale == 'major' else 'A'
        return f"{num}{letter}"
    except ValueError:
        return None


def compute_band_energy(audio, sample_rate, low, high):
    """
    Computes the total spectral energy in a frequency band.
    Used for bass/mid/high balance (% energy distribution).
    """
    spectrum = es.Spectrum()(audio)
    freqs = np.fft.rfftfreq(len(audio), d=1 / sample_rate)
    mask = (freqs >= low) & (freqs < high)
    return float(np.sum(spectrum[mask]))


def segment_bars(beats, beats_per_bar=BEATS_PER_BAR):
    """
    Groups beats into bars for cue point and structural mapping.
    Returns timestamps of bar starts (in seconds).
    """
    return [beats[i] for i in range(0, len(beats), beats_per_bar)]


def compute_energy_curve(audio, sample_rate, frame_sec=FRAME_SEC):
    """
    Splits audio into frames and computes RMS energy for each frame.
    Used to detect breakdowns, drops, and overall energy flow.
    """
    frame_size = int(sample_rate * frame_sec)
    frames = [audio[i:i + frame_size] for i in range(0, len(audio), frame_size)
              if len(audio[i:i + frame_size])]
    return [np.sqrt(np.mean(frame ** 2)) for frame in frames]


# ------------------------
# Feature Extractors
# ------------------------

def extract_rhythm(audio):
    """
    Extracts BPM, beats, bars, and measures of tempo stability.
    """
    bpm, beats, beat_conf, bpm_hist, bpm_conf = es.RhythmExtractor2013()(audio)
    beat_intervals = np.diff(beats)
    beat_clarity = float(np.std(beat_intervals)) if len(beat_intervals) > 1 else 0.0
    tempo_stability = 1.0 - float(np.std(beat_intervals) / (np.mean(beat_intervals) + 1e-9))
    bars = segment_bars(beats)
    return {
        "bpm": float(bpm),
        "beats": list(beats),
        "bars": bars,
        "beat_clarity": beat_clarity,
        "tempo_stability": tempo_stability
    }


def extract_tonal(audio):
    """
    Extracts key, scale, chord progression, tuning, and harmonic complexity.
    """
    key, scale, key_strength = es.KeyExtractor()(audio)
    chords, chords_strength = es.ChordsDetectionBeats()(audio)
    harmonic_complexity = float(np.std(chords_strength))
    tuning = es.TuningFrequency()(audio)
    return {
        "key": key,
        "scale": scale,
        "key_confidence": float(key_strength),
        "chords": list(chords),
        "chord_strength": list(chords_strength),
        "harmonic_complexity": harmonic_complexity,
        "tuning_frequency": float(tuning),
        "camelot": camelot_key(key, scale)
    }


def extract_dynamics(audio, sample_rate):
    """
    Analyzes loudness (LUFS), dynamic range, energy over time,
    and finds breakdowns (quiet parts) and drops (peaks).
    """
    loudness = es.LoudnessEBUR128()(audio)
    rms = np.sqrt(np.mean(audio ** 2))
    peak = np.max(np.abs(audio))
    dynamic_range = float(20 * np.log10((peak + 1e-9) / (rms + 1e-9)))

    energy_curve = compute_energy_curve(audio, sample_rate)
    energy_array = np.array(energy_curve)
    mean_energy = np.mean(energy_array)

    breakdowns = [float(i) for i, e in enumerate(energy_array) if e < BREAKDOWN_THRESHOLD * mean_energy]
    drops = [float(i) for i, e in enumerate(energy_array) if e > DROP_THRESHOLD * mean_energy]

    intro_energy = float(np.mean(energy_curve[:30])) if len(energy_curve) >= 30 else float(np.mean(energy_curve))
    outro_energy = float(np.mean(energy_curve[-30:])) if len(energy_curve) >= 30 else float(np.mean(energy_curve))
    overall_energy = float(np.mean(energy_curve))

    return {
        "loudness_lufs": float(loudness),
        "dynamic_range_db": dynamic_range,
        "intro_energy": intro_energy,
        "outro_energy": outro_energy,
        "overall_energy": overall_energy,
        "breakdowns": breakdowns,
        "drops": drops
    }


def extract_timbre(audio, sample_rate):
    """
    Extracts brightness, spectral features, and bass/mid/high energy percentages.
    """
    spectral_centroid = es.SpectralCentroidTime()(audio)[0]
    brightness = float(np.clip(spectral_centroid / (sample_rate / 2), 0, 1))

    spectral_flux = es.Flux()(audio)
    spectral_contrast = es.SpectralContrast()(audio)
    spectral_rolloff = es.RollOff()(audio)
    zcr = es.ZeroCrossingRate()(audio)

    bass = compute_band_energy(audio, sample_rate, *BASS_RANGE)
    mids = compute_band_energy(audio, sample_rate, *MIDS_RANGE)
    highs = compute_band_energy(audio, sample_rate, *HIGHS_RANGE)
    total_energy = bass + mids + highs + 1e-9
    bass_pct, mids_pct, highs_pct = [x / total_energy for x in (bass, mids, highs)]

    return {
        "brightness": brightness,
        "spectral_flux": float(spectral_flux),
        "spectral_contrast": list(spectral_contrast),
        "spectral_rolloff": float(spectral_rolloff),
        "zero_crossing_rate": float(zcr),
        "bass_pct": bass_pct,
        "mids_pct": mids_pct,
        "highs_pct": highs_pct
    }


def extract_content(audio):
    """
    Estimates vocal presence, percussiveness, and instrumentalness.
    """
    hpss = es.HarmonicPercussiveSeparation()
    harmonic, percussive = hpss(audio)
    vocal_presence = float(np.mean(np.abs(harmonic)) / (np.mean(np.abs(audio)) + 1e-9))
    percussiveness = float(np.mean(np.abs(percussive)) / (np.mean(np.abs(audio)) + 1e-9))
    instrumentalness = 1.0 - vocal_presence

    return {
        "vocal_presence": vocal_presence,
        "percussiveness": percussiveness,
        "instrumentalness": instrumentalness
    }


# ------------------------
# Main Analyzer
# ------------------------

def analyze_track(filepath):
    """
    Full analysis pipeline for one track.
    Loads audio, extracts all feature sets, normalizes critical metrics,
    and prints a comprehensive JSON profile.
    """
    loader = es.MonoLoader(filename=filepath)
    audio = loader()
    sample_rate = DEFAULT_SAMPLE_RATE

    rhythm = extract_rhythm(audio)
    tonal = extract_tonal(audio)
    dynamics = extract_dynamics(audio, sample_rate)
    timbre = extract_timbre(audio, sample_rate)
    content = extract_content(audio)

    # Normalize key continuous metrics
    energy_norm = normalize(dynamics["overall_energy"], ENERGY_MIN, ENERGY_MAX)
    brightness_norm = timbre["brightness"]  # already 0–1
    vocal_norm = normalize(content["vocal_presence"], 0.0, 1.0)

    # Mood axes for grid plotting (e.g., dark-bright, chill-intense)
    chill_intense = energy_norm
    dark_bright = brightness_norm

    # Set placement heuristic
    if chill_intense < 0.3:
        set_role = "opener"
    elif chill_intense < 0.6:
        set_role = "builder"
    elif chill_intense >= 0.6 and dark_bright >= 0.5:
        set_role = "peak"
    else:
        set_role = "closer"

    result = {
        "request": {"location": filepath},
        "response": {
            "summary": {
                "bpm": rhythm["bpm"],
                "key": tonal["key"],
                "scale": tonal["scale"],
                "camelot": tonal["camelot"],
                "energy_norm": energy_norm,
                "brightness_norm": brightness_norm,
                "vocal_presence_norm": vocal_norm,
                "set_role": set_role,
                "mood": {
                    "dark_bright": dark_bright,
                    "chill_intense": chill_intense
                }
            },
            "rhythm": rhythm,
            "tonal": tonal,
            "dynamics": dynamics,
            "timbre": timbre,
            "content": content
        }
    }

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: dj_analyzer_final.py <path-to-audio-file>")
        sys.exit(1)
    analyze_track(sys.argv[1])
```

## In Detail

Here’s a breakdown of each field in the output JSON:

---

### **`summary`**

* **`bpm`** – Beats per minute; overall tempo of the track.
* **`key`** – Musical key (root note) the track is centered in (here, F#).
* **`scale`** – Indicates whether the key is major or minor.
* **`camelot`** – DJ-friendly key notation (e.g., “11A” for F# minor).
* **`energy_norm`** – Normalized (0–1) perceived intensity/drive level across the track.
* **`brightness_norm`** – Normalized (0–1) tonal brightness, roughly how treble-heavy the mix feels.
* **`vocal_presence_norm`** – Normalized (0–1) measure of vocal prominence.
* **`set_role`** – Suggested role for DJ set placement (e.g., “intro”, “peak”, “breakdown”).
* **`mood.dark_bright`** – A scalar (0–1) showing where the track sits on the dark ↔ bright mood spectrum.
* **`mood.chill_intense`** – A scalar (0–1) showing where it sits on the chill ↔ intense energy spectrum.

---

### **`rhythm`**

* **`bpm`** – Same as in `summary`; reiterated here for context.
* **`beats`** – Detected timestamps (in seconds) for individual beats.
* **`bars`** – Detected timestamps (in seconds) for downbeats (bar starts).
* **`beat_clarity`** – Measure (0–1, often low) of how clear the beat is relative to noise or syncopation.
* **`tempo_stability`** – Consistency of tempo (0–1, with 1 meaning metronomic).

---

### **`tonal`**

* **`key` / `scale`** – Same as `summary`, repeated for tonal analysis context.
* **`key_confidence`** – Likelihood (0–1) the detected key is correct.
* **`chords`** – Most prominent chord roots detected.
* **`chord_strength`** – Confidence (0–1) for each chord in `chords`.
* **`harmonic_complexity`** – Rough measure of how harmonically dense (0–1 or relative scale) the track is.
* **`tuning_frequency`** – Detected tuning reference (e.g., \~440 Hz standard).
* **`camelot`** – DJ-friendly key again (for quick lookup).

---

### **`dynamics`**

* **`loudness_lufs`** – Integrated loudness across the track (in LUFS, a broadcast/loudness standard).
* **`dynamic_range_db`** – Peak-to-average range (dB), showing how compressed the track is.
* **`intro_energy`** – Normalized energy of the intro section (0–1).
* **`outro_energy`** – Normalized energy of the outro section (0–1).
* **`overall_energy`** – Average energy across the track (0–1).
* **`breakdowns`** – Timestamps (seconds) where breakdown sections start.
* **`drops`** – Timestamps (seconds) for major energy drops or “drops” in EDM.

---

### **`timbre`**

* **`brightness`** – Tonal brightness (0–1), similar to `brightness_norm`.
* **`spectral_flux`** – Amount of spectral change between frames (motion in the frequency domain).
* **`spectral_contrast`** – Difference between spectral peaks and valleys across multiple frequency bands (values are per band).
* **`spectral_rolloff`** – Frequency (Hz) below which a percentage (typically 85–95%) of spectral energy is contained (indicator of brightness).
* **`zero_crossing_rate`** – Rate at which the waveform crosses zero (can indicate noisiness or brightness).
* **`bass_pct` / `mids_pct` / `highs_pct`** – Proportion of energy in low, mid, and high frequency bands.

---

### **`content`**

* **`vocal_presence`** – Overall vocal presence score (0–1).
* **`percussiveness`** – Percussion prominence (0–1).
* **`instrumentalness`** – Likelihood the track is mostly instrumental (0–1).

