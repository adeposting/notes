---
title: "Spotify API Guide: Getting Track Metadata"
date: 2025-07-10
tags:
  - api
  - audio
  - audio-engineering
  - audio-programming
  - authentication
  - engineering
  - feature-extraction
  - music-programming
  - oauth
  - spotify
categories:
  - /audio/engineering/api/spotify
---

This article explains how to query the Spotify Web API in Node.js to get track metadata, audio features, detailed analysis, and search results. 

For authenticating with the API, see the [Spotify API Guide: Developer Console, Authentication, and Access Tokens](/spotify-api-guide-developer-console-authentication-and-access-tokens) companion article on how to set up the Spotify Developer Console, get access tokens (temporary and permanent), and integrate a reusable wrapper to automatically handle token fetching and refreshing for the Spotify Web API.

For a list of other useful Spotify API endpoints, including for getting track metadata and modifying user playlists, see the [Spotify API Guide: Endpoints for Tracks and Playlists](spotify-api-guide-endpoints-for-tracks-and-playlists) article.

If you just want the script get track metadata, audio features, detailed analysis, and search results, see [the implementation section](#implementation).

## Design

1. **Track Metadata**: `get_track` – Basic info like title, artists, album, popularity, etc.
2. **Audio Features**: `get_audio_features` – High-level stats like BPM, energy, danceability, key, etc.
3. **Audio Analysis**: `get_audio_analysis` – Detailed structure like beats, bars, tempo, loudness, etc.
4. **Search**: `get_search` – Find tracks by structured query (artist, title, album, ISRC, etc.).

Each function returns a `{ request, response }` object, where:

* `request` includes the parameters sent to the API.
* `response` contains either a single track object (for metadata, features, and analysis) or an array of track objects (for searches).


### `get_search`

**Input**

Example for a search:

```json
{
  "artist": "Aphex Twin",
  "track": "Avril 14th",
  "limit": 2
}
```

**Output**

```json
{
  "request": {
    "artist": "Aphex Twin",
    "track": "Avril 14th",
    "limit": 2
  },
  "response": [
    {
      "id": "6GGtHZgBycCgGBUhZo81xe",
      "name": "Avril 14th",
      "artists": ["Aphex Twin"],
      "album": "Drukqs"
    },
    {
      "id": "3n3Ppam7vgaVa1iaRUc9Lp",
      "name": "Windowlicker",
      "artists": ["Aphex Twin"],
      "album": "Windowlicker"
    }
  ]
}
```

---

### `get_track`

**Input**

```json
{
  "id": "3AJwUDP919kvQ9QcozQPxg"
}
```

**Output**

```json
{
  "request": {
    "id": "3AJwUDP919kvQ9QcozQPxg"
  },
  "response": {
    "id": "3AJwUDP919kvQ9QcozQPxg",
    "name": "Avril 14th",
    "artists": ["Aphex Twin"],
    "album": "Drukqs",
    "release_date": "2001-10-22",
    "duration_ms": 122813,
    "popularity": 65,
    "explicit": false,
    "preview_url": "https://p.scdn.co/mp3-preview/example.mp3",
    "external_url": "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg"
  }
}
```

---

### `get_audio_features`

**Input**

```json
{
  "id": "3AJwUDP919kvQ9QcozQPxg"
}
```

**Output**

```json
{
  "request": {
    "id": "3AJwUDP919kvQ9QcozQPxg"
  },
  "response": {
    "id": "3AJwUDP919kvQ9QcozQPxg",
    "tempo": 70.0,
    "key": 0,
    "mode": 1,
    "time_signature": 4,
    "acousticness": 0.92,
    "danceability": 0.45,
    "energy": 0.15,
    "instrumentalness": 0.99,
    "liveness": 0.11,
    "loudness": -18.3,
    "speechiness": 0.04,
    "valence": 0.25,
    "duration_ms": 122813
  }
}
```

---

### `get_audio_analysis`

**Input**

```json
{
  "id": "3AJwUDP919kvQ9QcozQPxg"
}
```

**Output**

```json
{
  "request": {
    "id": "3AJwUDP919kvQ9QcozQPxg"
  },
  "response": {
    "id": "3AJwUDP919kvQ9QcozQPxg",
    "bars": 20,
    "beats": 80,
    "sections": 4,
    "segments": 60,
    "tatums": 160,
    "track": {
      "duration": 122.8,
      "tempo": 70.0,
      "key": 0,
      "mode": 1,
      "time_signature": 4,
      "loudness": -18.3
    }
  }
}
```

## Implementation

**Dependencies**

* [node-fetch](https://github.com/node-fetch/node-fetch) – *Used for making HTTP requests to the Spotify API.*

Install with:

```bash
$ npm install node-fetch
```

**Script**

```javascript
const fetch = require('node-fetch');

/**
 * Build headers for Spotify API calls.
 * @param {string} token - Spotify OAuth Bearer token.
 */
function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Remove null or undefined values from an object.
 */
function cleanParams(args) {
  const result = {};
  for (const key in args) {
    if (args[key] != null) {
      result[key] = args[key];
    }
  }
  return result;
}

/**
 * Construct a structured Spotify search query string.
 * Supports artist, track, album, year, genre, isrc, upc.
 */
function buildQuery({ artist, track, album, year, genre, isrc, upc }) {
  const parts = [];
  if (artist) parts.push(`artist:"${artist}"`);
  if (track) parts.push(`track:"${track}"`);
  if (album) parts.push(`album:"${album}"`);
  if (year) parts.push(`year:${year}`);
  if (genre) parts.push(`genre:"${genre}"`);
  if (isrc) parts.push(`isrc:${isrc}`);
  if (upc) parts.push(`upc:${upc}`);
  return parts.join(' ');
}

/**
 * Fetch metadata for a single track.
 * Returns a single object.
 *
 * @param {string} token - Spotify OAuth token.
 * @param {string} id - Spotify track ID.
 */
async function get_track(token, id) {
  const url = `https://api.spotify.com/v1/tracks/${id}`;
  const res = await fetch(url, { headers: headers(token) });
  const data = await res.json();

  const response = {
    id: data.id,
    name: data.name,
    artists: data.artists?.map(a => a.name),
    album: data.album?.name,
    release_date: data.album?.release_date,
    duration_ms: data.duration_ms,
    popularity: data.popularity,
    explicit: data.explicit,
    preview_url: data.preview_url,
    external_url: data.external_urls?.spotify,
  };

  return { request: { id }, response };
}

/**
 * Fetch high-level audio features (BPM, energy, key, etc.) for a single track.
 * Returns a single object.
 *
 * @param {string} token - Spotify OAuth token.
 * @param {string} id - Spotify track ID.
 */
async function get_audio_features(token, id) {
  const url = `https://api.spotify.com/v1/audio-features/${id}`;
  const res = await fetch(url, { headers: headers(token) });
  const data = await res.json();

  const response = {
    id: data.id,
    tempo: data.tempo,
    key: data.key,
    mode: data.mode,
    time_signature: data.time_signature,
    acousticness: data.acousticness,
    danceability: data.danceability,
    energy: data.energy,
    instrumentalness: data.instrumentalness,
    liveness: data.liveness,
    loudness: data.loudness,
    speechiness: data.speechiness,
    valence: data.valence,
    duration_ms: data.duration_ms,
  };

  return { request: { id }, response };
}

/**
 * Fetch detailed audio analysis (beats, bars, sections, loudness, tempo) for a single track.
 * Returns a single object.
 *
 * @param {string} token - Spotify OAuth token.
 * @param {string} id - Spotify track ID.
 */
async function get_audio_analysis(token, id) {
  const url = `https://api.spotify.com/v1/audio-analysis/${id}`;
  const res = await fetch(url, { headers: headers(token) });
  const data = await res.json();

  const response = {
    id,
    bars: data.bars?.length,
    beats: data.beats?.length,
    sections: data.sections?.length,
    segments: data.segments?.length,
    tatums: data.tatums?.length,
    track: {
      duration: data.track?.duration,
      tempo: data.track?.tempo,
      key: data.track?.key,
      mode: data.track?.mode,
      time_signature: data.track?.time_signature,
      loudness: data.track?.loudness,
    },
  };

  return { request: { id }, response };
}

/**
 * Search for tracks using structured filters (artist, track, album, etc.).
 * Returns an array of objects (one per track).
 * Throws if results exceed `limit`.
 *
 * @param {string} token - Spotify OAuth token.
 * @param {object} options - { artist, track, album, year, genre, isrc, upc, market, limit, offset, include_external }
 */
async function get_search(
  token,
  {
    artist = null,
    track = null,
    album = null,
    year = null,
    genre = null,
    isrc = null,
    upc = null,
    market = null,
    limit = 1,
    offset = null,
    include_external = null,
  }
) {
  const q = buildQuery({ artist, track, album, year, genre, isrc, upc });
  const request = cleanParams({
    artist,
    track,
    album,
    year,
    genre,
    isrc,
    upc,
    market,
    limit,
    offset,
    include_external,
  });

  const query = new URLSearchParams(
    cleanParams({
      q,
      type: 'track',
      market,
      limit,
      offset,
      include_external,
    })
  );

  const url = `https://api.spotify.com/v1/search?${query.toString()}`;
  const res = await fetch(url, { headers: headers(token) });
  const data = await res.json();

  const items = data.tracks?.items || [];

  if (items.length > limit) {
    throw new Error(`Too many results: expected at most ${limit}, got ${items.length}`);
  }

  const response = items.map(track => ({
    id: track.id,
    name: track.name,
    artists: track.artists?.map(a => a.name),
    album: track.album?.name,
  }));

  return { request, response };
}

module.exports = {
  get_track,
  get_audio_features,
  get_audio_analysis,
  get_search,
};
```

## Usage

See [Spotify API Guide: Developer Console, Authentication, and Access Tokens](/spotify-api-guide-developer-console-authentication-and-access-tokens) for getting a Spotify access token.

```javascript
const token = 'YOUR_SPOTIFY_ACCESS_TOKEN';

// Search (returns an array of objects)
get_search(token, { artist: 'Aphex Twin', track: 'Avril 14th', limit: 2 })
  .then(console.log)
  .catch(console.error);

// Get metadata (single object)
get_track(token, '3AJwUDP919kvQ9QcozQPxg')
  .then(console.log);

// Get audio features (single object)
get_audio_features(token, '3AJwUDP919kvQ9QcozQPxg')
  .then(console.log);

// Get audio analysis (single object)
get_audio_analysis(token, '3AJwUDP919kvQ9QcozQPxg')
  .then(console.log);
```

---

## FAQs

### Why use structured `q` for searching?

Spotify’s search supports **field-specific filters** (`artist:`, `track:`, `year:`) for better precision than a plain string query. This avoids irrelevant results when matching by title or artist.

## See Also

* [Spotify API Guide: Developer Console, Authentication, and Access Tokens](/spotify-api-guide-developer-console-authentication-and-access-tokens) *Companion article on how to set up the Spotify Developer Console, get access tokens (temporary and permanent), and integrate a reusable wrapper to automatically handle token fetching and refreshing for the Spotify Web API.*
* [Spotify API Guide: User Authentication and Access Tokens](/spotify-api-guide-user-authentication-and-access-tokens) *Companion article with authorization code flow for user login to access or modify a user's playlists or libraries.*
* [Spotify API Guide: Endpoints for Tracks and Playlists](spotify-api-guide-endpoints-for-tracks-and-playlists) *Companion article with various useful Spotify API endpoints, including for getting track metadata and modifying user playlists.*

## References

* [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/) *Full reference for all Spotify endpoints, including tracks, playlists, search, and playback control.*
* [Spotify API Console](https://developer.spotify.com/console/) *Interactive tool for testing API endpoints and generating temporary tokens for quick experimentation.*
