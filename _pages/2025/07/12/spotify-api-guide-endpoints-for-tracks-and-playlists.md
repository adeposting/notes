---
title: "Spotify API Guide: Endpoints for Tracks and Playlists"
date: 2025-07-12
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

This article is a breakdown of useful Spotify Web API endpoints. 

Some require only app authorization (i.e. no user login), while others require user authorization and are given together with which OAuth scopes are needed. 

See these other articles for more information:

* [Spotify API Guide: Developer Console, Authentication, and Access Tokens](/spotify-api-guide-developer-console-authentication-and-access-tokens) *Set up the Spotify Developer Console, get access tokens (temporary and permanent), and integrate a reusable wrapper to automatically handle token fetching and refreshing for the Spotify Web API.*
* [Spotify API Guide: Getting Track Metadata](/spotify-api-guide-getting-track-metadata.md) *Node.js functions for retrieving track data, audio features, detailed analysis, and performing structured searches.*
* [Spotify API Guide: User Authentication and Access Tokens](/spotify-api-guide-user-authentication-and-access-tokens) *Authorization code flow for user login to access or modify a user's playlists or libraries.*

Here are the endpoints covered in this article:

* `GET /v1/search?q={query}&type=track`: Search for a track by query (returns metadata and paging info)
* `GET /v1/tracks/{id}`: Get full metadata for a specific track
* `GET /v1/audio-features/{id}`: Get audio feature analysis for a track (tempo, key, energy, etc.)
* `GET /v1/users/{user_id}/playlists`: Get all playlists for a user (public and private with scope)
* `GET /v1/playlists/{playlist_id}`: Get metadata for a specific playlist (public or private)
* `GET /v1/playlists/{playlist_id}/tracks`: Get all tracks in a playlist with pagination
* `POST /v1/users/{user_id}/playlists`: Create a new playlist for a user
* `POST /v1/playlists/{playlist_id}/tracks`: Add tracks to a playlist
* `DELETE /v1/playlists/{playlist_id}/tracks`: Remove tracks from a playlist

---

## **1. Search for a Track**

**Endpoint:**

```
GET /v1/search?q={query}&type=track
```

**What the API Returns (for each track):**

* `id`, `name`, `duration_ms`, `popularity`, `explicit`.
* `artists` – Array of artist objects (`id`, `name`, `href`, `external_urls.spotify`).
* `album` – Album object (`id`, `name`, `images`, `release_date`, `external_urls.spotify`).
* `preview_url`, `external_urls.spotify`, `href`, `uri`, `type`.
* Results are wrapped in a **paging object**: `limit`, `offset`, `next`, `previous`, `total`.

**Scopes Required:**

* No scopes required (works with **Client Credentials** or user tokens).

---

## **2. Get Track (Metadata)**

**Endpoint:**

```
GET /v1/tracks/{id}
```

**What the API Returns:**

* `id`, `name`, `duration_ms`, `popularity`, `explicit`.
* `artists` – Array of artist objects (`id`, `name`, `href`, `external_urls.spotify`).
* `album` – Album object (`id`, `name`, `release_date`, `images`, `external_urls.spotify`).
* `preview_url`, `external_urls.spotify`, `href`, `uri`, `type`.

**Scopes Required:**

* No scopes required (works with **Client Credentials** or user tokens).

---

## **3. Get Audio Features for a Track**

**Endpoint:**

```
GET /v1/audio-features/{id}
```

**What the API Returns:**

* `id`, `duration_ms`, `tempo` (BPM), `key`, `mode`, `time_signature`.
* `acousticness`, `danceability`, `energy`, `instrumentalness`, `liveness`, `loudness`, `speechiness`, `valence`.
* No artist/album info (purely analysis values).

**Scopes Required:**

* No scopes required (works with **Client Credentials** or user tokens).

---

## **4. Get All Playlists for a User**

**Endpoint:**

```
GET /v1/users/{user_id}/playlists
```

**What the API Returns (per playlist):**

* `id`, `name`, `description`, `public`, `collaborative`.
* `owner` (object: `id`, `display_name`, `external_urls.spotify`).
* `tracks` (object with `href` and `total`).
* `images` – Array of playlist cover image objects.
* `snapshot_id`, `external_urls.spotify`, `href`, `uri`, `type`.
* Results wrapped in a **paging object**: `limit`, `offset`, `next`, `previous`, `total`.

**Scopes Required:**

* `playlist-read-private` (for **private playlists**).
* No scope needed for **public playlists** (if accessed via `/users/{id}/playlists`).

---

## **5. Get a User Playlist (Metadata)**

**Endpoint:**

```
GET /v1/playlists/{playlist_id}
```

**What the API Returns:**

* `id`, `name`, `description`, `public`, `collaborative`.
* `owner` (object: `id`, `display_name`, `external_urls.spotify`).
* `followers.total` – Number of followers.
* `images` – Playlist cover images.
* `snapshot_id`, `external_urls.spotify`, `href`, `uri`, `type`.
* `tracks` – Object with `href`, `total`, pagination fields, and `items` (each track entry).

**Scopes Required:**

* `playlist-read-private` for **private playlists**.
* No scope needed for **public playlists**.

---

## **6. Get a Public Playlist (Metadata)**

**Endpoint:**

```
GET /v1/playlists/{playlist_id}
```

**What the API Returns:**

* Same fields as **5 (Get a User Playlist)**.
* Public playlists can be fetched without a user token, as long as you use an app token.

**Scopes Required:**

* No scopes needed for **public playlists** (works with **Client Credentials**).

---

## **7. Get All Tracks in a Playlist**

**Endpoint:**

```
GET /v1/playlists/{playlist_id}/tracks
```

**What the API Returns (per track entry):**

* `added_at` – When the track was added.
* `added_by` – User object for the person who added it.
* `is_local` – If the track is a local file.
* `track` – Full track object (same fields as `GET /v1/tracks/{id}`).

Results are wrapped in a **paging object**: `limit`, `offset`, `next`, `previous`, `total`.

**Scopes Required:**

* `playlist-read-private` (for private playlists).
* No scopes needed for public playlists.

---

## **8. Create a Playlist**

**Endpoint:**

```
POST /v1/users/{user_id}/playlists
```

**Request Body:**

```json
{
  "name": "My New Playlist",
  "description": "Created via API",
  "public": false
}
```

**What the API Returns (on success):**

* Full playlist object with all metadata (as returned by `GET /v1/playlists/{id}`).

**Scopes Required:**

* `playlist-modify-public` (for public playlists).
* `playlist-modify-private` (for private playlists).

---

## **9. Add a Track to a User Playlist**

**Endpoint:**

```
POST /v1/playlists/{playlist_id}/tracks
```

**Request Body:**

```json
{
  "uris": ["spotify:track:3AJwUDP919kvQ9QcozQPxg"]
}
```

**What the API Returns (on success):**

* `snapshot_id` – New version identifier for the playlist.

**Scopes Required:**

* `playlist-modify-public` (if adding to a public playlist).
* `playlist-modify-private` (if adding to a private playlist).

---

## **10. Delete a Track from a User Playlist**

**Endpoint:**

```
DELETE /v1/playlists/{playlist_id}/tracks
```

**Request Body:**

```json
{
  "tracks": [
    { "uri": "spotify:track:3AJwUDP919kvQ9QcozQPxg" }
  ]
}
```

**What the API Returns (on success):**

* `snapshot_id` – New version identifier for the playlist.

**Scopes Required:**

* `playlist-modify-public` (if removing from a public playlist).
* `playlist-modify-private` (if removing from a private playlist).

---

## See Also

* [Spotify API Guide: Developer Console, Authentication, and Access Tokens](/spotify-api-guide-developer-console-authentication-and-access-tokens) *Companion article on how to set up the Spotify Developer Console, get access tokens (temporary and permanent), and integrate a reusable wrapper to automatically handle token fetching and refreshing for the Spotify Web API.*
* [Spotify API Guide: Getting Track Metadata](/spotify-api-guide-getting-track-metadata.md) *Companion article with Node.js functions for retrieving track data, audio features, detailed analysis, and performing structured searches.*
* [Spotify API Guide: User Authentication and Access Tokens](/spotify-api-guide-user-authentication-and-access-tokens) *Companion article with authorization code flow for user login to access or modify a user's playlists or libraries.*

## References 

* [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/) *Full reference for all Spotify endpoints, including tracks, playlists, search, and playback control.*
* [Spotify API Console](https://developer.spotify.com/console/) *Interactive tool for testing API endpoints and generating temporary tokens for quick experimentation.*
* [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization/) *Spotify’s official guide to user authentication flows.*
* [Spotify Authentication Guide - Scopes Reference](https://developer.spotify.com/documentation/general/guides/authorization/scopes/) *List of permissions you can request for user data access.*
