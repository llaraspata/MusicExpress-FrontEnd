import { Injectable } from '@angular/core';
import { RecommendedSong } from './recommended-song';
import { Playlist } from './playlist';
import { HttpClient } from '@angular/common/http';
import { PlaylistsPayload } from './playlists-payload';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private getAvailablePlaylistsUrl = 'http://localhost:3000/playlists';
  private getRecommendedSongsUrl = 'http://localhost:3000/recommended';

  private postRecommendedSongsUrl = 'http://localhost:8000/recommendation';
  private postExtractPlaylistUrl = 'http://localhost:8000/extract';
  
  constructor(private http: HttpClient) {}

  getAvailablePlaylists() {
    console.log("Getting available playlists...");
    return this.http.get<Playlist[]>(this.getAvailablePlaylistsUrl);
  }

  postExtractPlaylist(playlistId: string) {
    console.log("Extracting playlist ", playlistId, "...");
    return this.http.post(this.postExtractPlaylistUrl, playlistId);
  }

  getRecommendedSongs() {
    console.log("Getting recommended songs...");
    return this.http.get<RecommendedSong[]>(this.getRecommendedSongsUrl);
  }

  postRecommendedSongs(selectedPlaylists: PlaylistsPayload[]) {
    console.log("Posting selected playlists: ", selectedPlaylists);
    return this.http.post(this.postRecommendedSongsUrl, selectedPlaylists);
  }

}
