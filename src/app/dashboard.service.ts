import { Injectable } from '@angular/core';
import { RecommendedSong } from './recommended-song';
import { Playlist } from './playlist';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private getAvailablePlaylistsUrl = 'http://localhost:3000/playlists';
  private getRecommendedSongsUrl = 'http://localhost:3000/recommended';

  async getAvailablePlaylists(): Promise<Playlist[]> {
    const data = await fetch(this.getAvailablePlaylistsUrl);
    return (await data.json()) ?? [];
  }

  async getRecommendedSongs(): Promise<RecommendedSong[]> {
    const data = await fetch(this.getRecommendedSongsUrl);
    return (await data.json()) ?? [];
  }

}
