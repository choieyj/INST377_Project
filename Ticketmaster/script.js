
const SPOTIFY_CLIENT_ID = '579778cdb1a24df0b84b496fc7a5f33e';
const REDIRECT_URI = 'https://https://inst-377-project-sigma.vercel.app/';
const TICKETMASTER_API_KEY = '6QU5kvuR4MH7V6InGySFpZqGADwa21Wo';
const SCOPES = 'user-top-read';
let accessToken = '';

document.getElementById('login').addEventListener('click', () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}`;
  window.location.href = authUrl;
});

window.onload = async () => {
  const hash = window.location.hash;
  if (hash) {
    accessToken = new URLSearchParams(hash.substring(1)).get('access_token');
    window.location.hash = '';
    const topArtists = await getTopArtists();
    const userLocation = await getUserLocation();
    if (userLocation) {
      const { lat, lon } = userLocation;
      showConcerts(topArtists, lat, lon);
    }
  }
};

async function getTopArtists() {
  const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data.items.map(artist => artist.name);
}

async function getUserLocation() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const loc = await res.json();
    return { lat: loc.latitude, lon: loc.longitude };
  } catch (err) {
    alert("Couldn't get location");
    return null;
  }
}

async function showConcerts(artists, lat, lon) {
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = '';

  for (const artist of artists) {
    const tmUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&keyword=${encodeURIComponent(artist)}&latlong=${lat},${lon}&radius=100&unit=miles`;

    const res = await fetch(tmUrl);
    const data = await res.json();

    const events = data._embedded?.events || [];

    const section = document.createElement('section');
    section.innerHTML = `<h2>${artist}</h2>`;

    if (events.length === 0) {
      section.innerHTML += `<p>No upcoming concerts found nearby.</p>`;
    } else {
      events.forEach(event => {
        const el = document.createElement('div');
        el.innerHTML = `
          <p><strong>${event.name}</strong></p>
          <p>${event.dates.start.localDate} @ ${event._embedded.venues[0].name}</p>
          <a href="${event.url}" target="_blank">Buy Tickets</a>
          <hr/>
        `;
        section.appendChild(el);
      });
    }

    resultDiv.appendChild(section);
  }
}

document.getElementById("manual-search").addEventListener("click", async () => {
  const artist = document.getElementById("artist-search").value.trim();
  const userLocation = await getUserLocation();

  if (!artist || !userLocation) return;

  const { lat, lon } = userLocation;
  showConcerts([artist], lat, lon);
});
