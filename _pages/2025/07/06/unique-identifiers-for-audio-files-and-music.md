---
title: "Unique Identifiers for Audio Files and Music"
date: 2025-07-06
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

This article describes unique, standardized identifiers used in the music industry and by various databases for audio recordings and musical copositions.

They differ depending on whether you want to identify:

* The **recording** (the actual audio file/master)
* The **composition** (the song as written)
* Or **metadata from specific services** (Spotify, MusicBrainz, etc.)

For a simple, reliable, offline way to get a unique ID for an audio file, your best bet is to use acousitic fingerprinting. See the companion article [Using Acoustic Fingerprints as Unique Identifiers for Audio Files](using-acoustic-fingerprints-as-unique-identifiers-for-audio-files) for how to get the acoustic fingerprint of an audio file.

Here’s a breakdown of all of the options:

---

### **For the Recording (actual audio track)**

1. **ISRC (International Standard Recording Code)**

   * ISO 3901 standard (as above).
   * Uniquely identifies a *specific* recording/master.
   * Used globally for royalties and licensing.
   * Often embedded in files (MP3, WAV) via metadata.

2. **Acoustic Fingerprint IDs**

   * Not official ISO standards, but used for matching audio by its *sound* rather than metadata.
   * Generated algorithmically, so the same audio produces the same fingerprint even if renamed.
   * See the companion article [Using Acoustic Fingerprints as Unique Identifiers for Audio Files](using-acoustic-fingerprints-as-unique-identifiers-for-audio-files) for how to get the acoustic fingerprint of an audio file.
   * Examples:

     * **AcoustID** (open-source, works with MusicBrainz, uses Chromaprint algorithm).
     * **Gracenote Fingerprint** (proprietary).
     * **Shazam IDs** (internal, proprietary).

---

### **For the Musical Work (composition, not recording)**

3. **ISWC (International Standard Musical Work Code)**

   * ISO 15707 standard.
   * Identifies a *song* as written (lyrics, melody), regardless of who recorded it.

---

### **For Database/Service-specific Tracking**

4. **MusicBrainz Recording ID**

   * UUID (e.g., `f2bf9b7c-7db8-4a63-85af-d3a39ec6f9b5`).
   * Open database, can be linked to ISRCs and AcoustIDs.

5. **Spotify Track ID**

   * 22-character Base62 ID (e.g., `3n3Ppam7vgaVa1iaRUc9Lp`).
   * Can be mapped to ISRC in Spotify’s API.

6. **Apple Music/YouTube Music IDs**

   * Similar service-specific IDs, but not standardized.

---

### **Which should you use?**

* If you want a **globally standardized, royalty-friendly identifier** → **ISRC**.
* If you want something that **works even when metadata is missing/mislabeled** → **AcoustID**.
* If you’re **integrating with MusicBrainz or building open tools** → **MusicBrainz IDs + AcoustID**.
* If you’re only targeting **Spotify/streaming APIs** → their **Track IDs**, but you can also fetch the ISRC through their APIs.
