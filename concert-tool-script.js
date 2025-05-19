const SPOTIFY_CLIENT_ID = '579778cdb1a24df0b84b496fc7a5f33e';
const REDIRECT_URI = 'https://inst-377-project-sigma.vercel.app/concert-tool.html';
const TICKETMASTER_API_KEY = '6QU5kvuR4MH7V6InGySFpZqGADwa21Wo';
const SCOPES = 'user-top-read';
let accessToken = '';

// Spotify login
document.getElementById('login').addEventListener('click', () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}`;
  window.location.href = authUrl;
});

// On page load
window.onload = async () => {
  const hash = window.location.hash;
  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    accessToken = params.get('access_token');
    if (accessToken) {
      document.getElementById('loading').classList.remove('hidden');
      await getTopArtists();
    }
  }
};

// Get user's top artists
async function getTopArtists() {
  const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const data = await response.json();
  const artistNames = data.items.map(artist => artist.name);
  fetchConcerts(artistNames);
}

// Fetch concerts for each artist from Ticketmaster
async function fetchConcerts(artists) {
  const container = document.getElementById('concerts');
  container.innerHTML = '';

  for (const artist of artists) {
    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&keyword=${encodeURIComponent(artist)}`);
    const data = await response.json();

    const events = data._embedded?.events || [];
    if (events.length === 0) continue;

    const section = document.createElement('div');
    section.classList.add('artist-section');

    const title = document.createElement('h2');
    title.className = 'artist-name';
    title.textContent = artist;
    section.appendChild(title);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Event</th><th>Date</th><th>Location</th><th>Link</th></tr>';
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (const event of events) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${event.name}</td>
        <td>${new Date(event.dates.start.dateTime).toLocaleString()}</td>
        <td>${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].country.name}</td>
        <td><a href="${event.url}" target="_blank">Buy Tickets</a></td>
      `;
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    section.appendChild(table);
    container.appendChild(section);
  }

  document.getElementById('loading').classList.add('hidden');
}
