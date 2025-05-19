import spotipy
from spotipy.oauth2 import SpotifyOAuth
import spotipy.util as util
from dotenv import load_dotenv
import os

#Set up the Spotify API client
load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_SECRET = os.getenv("SPOTIFY_SECRET")
SCOPE = "user-top-read"
REDIRECT_URI = "http://127.0.0.1:8080"
USERNAME = "X"

token = util.prompt_for_user_token(USERNAME,scope=SCOPE,client_id=SPOTIFY_CLIENT_ID,client_secret=SPOTIFY_SECRET, redirect_uri=REDIRECT_URI)

if token:
    sp = spotipy.Spotify(auth=token)
    # Get user's top artists for spotify wrapped
    top_artists = sp.current_user_top_artists(limit=5, time_range="medium_term")
else:
    print("Can't get token for", USERNAME)

#Print the user's top artists
print("Your top 5 artists from the past 6 months are:")
i=0
for artist in top_artists["items"]:
    i+=1
    print(f"{i}: " + artist["name"])
