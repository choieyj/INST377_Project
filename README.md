# INST377_Project - Eugene Choi/Richard Zhou

# TuneTrail

## Project Description
TuneTrail helps music fans discover concerts and festivals based on their Spotify listening history. It combines Spotify's user data with Ticketmaster's events database to offer local events that are tailored toward the user's music taste. 

## Target Browsers
- Desktop: Chrome, Firefox, Edge, Safari
- Mobile: iOS Safari (iOS 15+), Android Chrome (Android 10+)




# Developer Manual


# 📘 Developer Manual – TuneTrail

Hey future devs! This guide will help you set up and run TuneTrail on your own machine, and give you a good starting point if you’re planning to add features or fix stuff.

---

## 🚀 Getting Started

### 1. Clone the Repo

First, grab the project from GitHub:

```bash
git clone https://github.com/YOUR_USERNAME/TuneTrail.git
cd TuneTrail
```

### 2. Add Your API Keys

Create a `.env` file in the root folder and drop this in:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
TICKETMASTER_API_KEY=your_ticketmaster_api_key
REDIRECT_URI=https://your-vercel-project-url.vercel.app/callback
```

> Make sure the redirect URI matches exactly what you set in the Spotify developer dashboard or auth will break.

---

## 💻 How to Run It

### Option A: Run Locally (easy way)

Open `index.html` with Live Server in VS Code or drag it into your browser. That’s it.

### Option B: Deploy on Vercel

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com), connect your GitHub account, and deploy the project.
3. In the project settings, add your `.env` values under **Environment Variables**.

---

## 🎧 Function

- **Spotify**: Gets your top artists (after you log in).
- **Ticketmaster**: Searches for concerts that match those artists.
- Then we show you links to buy tickets, sorted by artist.

---

## 🐛 Bugs

- Login might fail if the Spotify redirect URI is wrong.
- Some artists don’t return concert results (especially lesser-known ones).

---

## 🛠 Potential Future Improvements

- Add error messages when no concerts are found.
- Maybe show artist images while loading.
- Filter concerts by location.
- Save previous searches (local storage or cookies?).

---

