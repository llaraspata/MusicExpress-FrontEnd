import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecommendedSong } from './recommended-song';
import { PlaylistsPayload } from './playlists-payload';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private getAvailablePlaylistsUrl = 'http://localhost:8000/recommendation';
  private getRecommendedSongsUrl = 'http://localhost:8000/recommendation';

  constructor(private http: HttpClient) {}

  async getAvailablePlaylists(): Promise<RecommendedSong[]> {
    try {
      const data = await this.http.get<RecommendedSong[]>(this.getAvailablePlaylistsUrl).toPromise();
      return data ?? [];
    } catch (error) {
      console.error('Error fetching recommended songs:', error);
      return [];
    }
  }

  getRecommendedSongs(payload: PlaylistsPayload): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<RecommendedSong[]>>(this.getRecommendedSongsUrl, payload);
  }
}
