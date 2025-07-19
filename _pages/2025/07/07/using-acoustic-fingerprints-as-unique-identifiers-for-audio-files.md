---
title: "Using Acoustic Fingerprints as Unique Identifiers for Audio Files"
date: 2025-07-07
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

This article explains how to get the acoustic fingerprint of an audio file. This gives you a unique, standardized identifier for an audio file used in the music industry and by various databases. Implementations are given in Python, Node.js, and Bash, [See the FAQs if you don't know what I'm talking about or are wondering "Why not use a hash?"](#faqs).

Acoustic fingerprinting is not the only means of obtaining a unique identifier for audio recordings and music compositions, for more information, see the companion article [Unique Identifiers for Audio Files and Music](/unique-identifiers-for-audio-files-and-music).

## Design

**Aim**: *Write a function which takes the path to an audio file and returns its acoustic fingerprint and duration.*

### Input

```json
{
  "location": "/path/to/track.mp3"
}
```

### Output

```json
{
  "request": {
    "location": "/path/to/track.mp3"
  },
  "response": {
    "fingerprint": "AQADt...",
    "duration": 123
  }
}
```

## Implementation

### Python

**Dependencies**

* [pyacousticid](https://github.com/beetbox/pyacoustid) *Python bindings for Chromaprint acoustic fingerprinting and the Acoustid Web service.*

```bash
$ pip3 install pyacousticid
```

**Function**

```python
import acousticid

def get_acousticid(location: str) -> dict:
    fingerprint, duration = acousticid.fingerprint_file(location)
    return {
        "request": {
            "location": location
        },
        "response": {
            "fingerprint": fingerprint,
            "duration": duration
        }
    }
```

**Usage**

```python
print(json.dumps(get_acousticid(location="/path/to/track.mp3"), indent=2))
```

### Node.js

**Dependencies**

* [Chromaprint](https://acoustid.org/chromaprint) *Chromaprint is the core component of the AcoustID project. It's a client-side library that implements a custom algorithm for extracting fingerprints from any audio source.*

OSX using Homebrew

```bash
$ brew install chromaprint
```

Ubuntu

```bash
$ sudo apt-get install libchromaprint-tools
``` 

**Function**

```javascript
const { execFile } = require('child_process');
const path = require('path');

function get_acousticid(location) {
  return new Promise((resolve, reject) => {
    execFile('fpcalc', ['-json', location], (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      try {
        const data = JSON.parse(stdout);
        const result = {
          request: {
            location: path.resolve(location),
          },
          response: {
            fingerprint: data.fingerprint,
            duration: data.duration,
          },
        };
        resolve(result);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}
```

**Usage**

```javascript
get_acousticid('/path/to/track.mp3')
  .then(console.log)
  .catch(console.error);
```

There is also `[node-fpcalc](https://github.com/parshap/node-fpcalc)` but this is overkill in my opinion, it's just a wrapper around the `fpcalc` command and still requires `chromaprint` to be installed via the system package manager.

### Bash

**Dependencies**

Install `chromaprint` the same as for Node.js (see above).

**Function**

```bash
get_acousticid() {
    local -r location="$1"
    fpcalc -json "$location" | jq --arg loc "$location" \
        '{request:{location:$loc},response:{fingerprint:.fingerprint,duration:.duration}}'
}
```

**Usage**

```bash
get_acousticid "/path/to/track.mp3"
```

## FAQs

### What is an acoustic fingerprint?

> *An acoustic fingerprint is a condensed digital summary, a digital fingerprint, deterministically generated from an audio signal, that can be used to identify an audio sample or quickly locate similar items in a music database.* - [Acoustic fingerprint page on Wikipedia](https://en.wikipedia.org/wiki/Acoustic_fingerprint) 

### Why not a hash?

> *A robust acoustic fingerprint algorithm must take into account the perceptual characteristics of the audio. If two files sound alike to the human ear, their acoustic fingerprints should match, even if their binary representations are quite different. Acoustic fingerprints are not hash functions, which are sensitive to any small changes in the data. Acoustic fingerprints are more analogous to human fingerprints where small variations that are insignificant to the features the fingerprint uses are tolerated. One can imagine the case of a smeared human fingerprint impression that can accurately be matched to another fingerprint sample in a reference database; acoustic fingerprints work similarly.* - [Acoustic fingerprint page on Wikipedia](https://en.wikipedia.org/wiki/Acoustic_fingerprint)

## See Also

* [Acoustic fingerprint on Wikipedia](https://en.wikipedia.org/wiki/Acoustic_fingerprint) *An acoustic fingerprint is a condensed digital summary, a digital fingerprint, deterministically generated from an audio signal, that can be used to identify an audio sample or quickly locate similar items in a music database.*
* [AcoustID on Wikipedia](https://en.wikipedia.org/wiki/AcoustID): *AcoustID is a webservice for the identification of music recordings based on the Chromaprint acoustic fingerprint algorithm. It can identify entire songs but not short snippets*
* [AcoustID.org](https://acoustid.org/) *AcoustID is a project providing complete audio identification service, based entirely on open source software. It consists of a client library for generating compact fingerprints from audio files, a large crowdsourced database of audio fingerprints, many of which are linked to the MusicBrainz metadata database using their unique identifiers, and a web service that enables applications to quickly search in the fingerprint database.*
* [Chromaprint on AcoustID.org](https://acoustid.org/chromaprint) *Chromaprint is the core component of the AcoustID project. It's a client-side library that implements a custom algorithm for extracting fingerprints from any audio source. Overview of the fingerprint extraction process can be found in the blog post "How does Chromaprint work?".*