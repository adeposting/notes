---
title: "Spotify API Guide: User Authentication and Access Tokens"
date: 2025-07-11
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

This article explains how to authenticate with Spotify using user login (the Authorization Code flow).

If you only need **app-level authentication**, i.e. for reading public information, as opposed to accessing or modifying user-specfic information, see the [Spotify API Guide: Developer Console, Authentication, and Access Tokens](/spotify-api-guide-developer-console-authentication-and-access-tokens) article on setting up the Spotify Developer Console, get access tokens (temporary and permanent), and integrate a reusable wrapper to automatically handle token fetching and refreshing for the Spotify Web API.

There is also the [Spotify API Guide: Getting Track Metadata](/spotify-api-guide-getting-track-metadata.md) article with Node.js functions for retrieving track data, audio features, detailed analysis, and performing structured searches, and the [Spotify API Guide: Endpoints for Tracks and Playlists](spotify-api-guide-endpoints-for-tracks-and-playlists) article with various useful Spotify API endpoints, including for getting track metadata and modifying user playlists.

## Design

**Aim**: *Enable apps to access and modify user-specific data, like playlists or libraries, by logging the user in and requesting authorization scopes.*

### Input

```json
{
  "redirect_uri": "http://localhost:8888/callback",
  "scopes": [
    "playlist-read-private",
    "user-library-read"
  ]
}
```

### Output

```json
{
  "request": {
    "redirect_uri": "http://localhost:8888/callback",
    "scopes": ["playlist-read-private", "user-library-read"]
  },
  "response": {
    "access_token": "BQD3y...userToken",
    "refresh_token": "AQDj9...refreshToken",
    "expires_in": 3600
  }
}
```

## Implementation

### Node.js

**Dependencies**

```bash
npm install express node-fetch
```

**Script**

```javascript
const express = require('express');
const fetch = require('node-fetch');
const querystring = require('querystring');

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUri = 'http://localhost:8888/callback';
const port = 8888;

const app = express();

// Step 1: Redirect user to Spotify login
app.get('/login', (req, res) => {
  const scopes = ['playlist-read-private', 'user-library-read'];
  const query = querystring.stringify({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
  });
  res.redirect(`https://accounts.spotify.com/authorize?${query}`);
});

// Step 2: Handle callback and exchange code for tokens
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });
  const data = await tokenResponse.json();

  res.json({
    request: {
      redirect_uri: redirectUri,
      scopes: ['playlist-read-private', 'user-library-read'],
    },
    response: {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    },
  });
});

app.listen(port, () => {
  console.log(`Visit http://localhost:${port}/login to authenticate`);
});
```


## Usage Example – Get a User’s Playlists

Once you have an `access_token` from the `/callback` route, you can use it to fetch a user’s playlists.
Here’s a quick example using the `/v1/me/playlists` endpoint (which requires the `playlist-read-private` scope for private playlists):

```javascript
const fetch = require('node-fetch');

async function getMyPlaylists(accessToken, limit = 10) {
  const res = await fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data.items.map(p => ({
    id: p.id,
    name: p.name,
    owner: p.owner.display_name,
    tracks_total: p.tracks.total,
  }));
}

// Example usage after the callback:
(async () => {
  const token = 'PASTE_YOUR_ACCESS_TOKEN_HERE';
  const playlists = await getMyPlaylists(token);
  console.log('Your Playlists:', playlists);
})();
```

This will print an array of the user’s playlists (both public and private, if you’ve requested the correct scopes) with their IDs, names, owners, and track counts.

---

## FAQs

### When do I need user login?

If you need **access to user-specific data** like private playlists, liked songs, or playback state, you must authenticate users via the Authorization Code flow.
For generic track, album, or search data, you can use app-only tokens (see [Spotify API Guide: Developer Console, Authentication, and Access Tokens](/spotify-api-guide-developer-console-authentication-and-access-tokens)).

### How do I refresh the token?

Use the `refresh_token` returned in the callback by making another request to `https://accounts.spotify.com/api/token` with `grant_type=refresh_token`. Tokens last about 1 hour.

---

## See Also

* [Spotify API Guide: Developer Console, Authentication, and Access Tokens](/spotify-api-guide-developer-console-authentication-and-access-tokens) *Companion article on how to set up the Spotify Developer Console, get access tokens (temporary and permanent), and integrate a reusable wrapper to automatically handle token fetching and refreshing for the Spotify Web API.*
* [Spotify API Guide: Getting Track Metadata](/spotify-api-guide-getting-track-metadata.md) *Companion article with Node.js functions for retrieving track data, audio features, detailed analysis, and performing structured searches.*
* [Spotify API Guide: Endpoints for Tracks and Playlists](spotify-api-guide-endpoints-for-tracks-and-playlists) *Companion article with various useful Spotify API endpoints, including for getting track metadata and modifying user playlists.*

## References

* [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/) *Full reference for all Spotify endpoints, including tracks, playlists, search, and playback control.*
* [Spotify API Console](https://developer.spotify.com/console/) *Interactive tool for testing API endpoints and generating temporary tokens for quick experimentation.*
* [Spotify Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization/) *Spotify’s official guide to user authentication flows.*
