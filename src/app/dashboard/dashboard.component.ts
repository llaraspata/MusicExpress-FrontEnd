import { Component, ElementRef, ViewChild } from '@angular/core';
import { Playlist } from '../playlist';
import { RecommendedSong } from '../recommended-song';
import { WelcomeComponent } from "../welcome/welcome.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PlaylistsPayload } from '../playlists-payload';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [MatCheckboxModule, MatProgressBarModule, WelcomeComponent, HttpClientModule]
})

export class DashboardComponent {
  @ViewChild("extract", { static: false }) extract?: ElementRef;
  @ViewChild("trainPlaylist", { static: false }) trainPlaylist?: ElementRef;
  @ViewChild("testPlaylist", { static: false }) testPlaylist?: ElementRef;

  /*private getAvailablePlaylistsUrl = 'https://musicexpress.azurewebsites.net/available_playlists';
  private postRecommendedSongsUrl = 'https://musicexpress.azurewebsites.net/recommendation';
  private postExtractPlaylistUrl = 'https://musicexpress.azurewebsites.net/extract';*/

  private getAvailablePlaylistsUrl = 'https://stagingmusicexpress.azurewebsites.net/available_playlists';
  private postRecommendedSongsUrl = 'https://stagingmusicexpress.azurewebsites.net/recommendation';
  private postExtractPlaylistUrl = 'https://stagingmusicexpress.azurewebsites.net/extract';

  availablePlaylists: Playlist[] = [];

  selectedPlaylists = {
    id_playlist_train: "3fSsw9Mp5Mi2DDiweZggtP",
    id_playlist_test: "2YRe7HRKNRvXdJBp9nXFza"
  };

  defaultCase = {
    id_playlist_train: "3fSsw9Mp5Mi2DDiweZggtP",
    id_playlist_test: "2YRe7HRKNRvXdJBp9nXFza"
  };

  isExtracting: boolean = false;
  isRecommending: boolean = false;

  noIdToExtract: boolean = false;
  hasExtracted: boolean = false;
  idsAreEqual: boolean = false;
  
  recommendedSongs: RecommendedSong[] = [];
  accuracy: number = 0;
  songLikedStatus: { [songName: string]: boolean } = {};


  constructor(private http: HttpClient) {
    this.getAvailablePlaylists().subscribe((availablePlaylists: any) => {

      if (availablePlaylists.data && availablePlaylists.data.length > 0) {
        availablePlaylists.data.forEach((playlist: any) => {
          this.availablePlaylists.push({ id: playlist["Id"], name: playlist["Name"] });
        });
      }

      console.log("Available playlists: ", this.availablePlaylists);
    });
  }


  getAvailablePlaylists() {
    console.log("Getting available playlists...");
    return this.http.get(this.getAvailablePlaylistsUrl);
  }


  extractPlaylist() {
    if (!this.extract?.nativeElement.value) {
      this.noIdToExtract = true;
      return;
    }
    
    this.isExtracting = true;
    let playlistId = this.extract?.nativeElement.value;

    this.postExtractPlaylist(playlistId).subscribe((playlistNames: any) => {
      console.log("Extracted playlist: ", playlistNames);

      if (playlistNames.data && playlistNames.data.length > 0) {
        if (this.availablePlaylists.filter((playlist) => playlist.id === playlistId).length === 0) {
          console.log("name: ", playlistNames.data[0]);

          this.availablePlaylists.push({ id: playlistId, name: playlistNames.data[0] });
        }
      }

      this.isExtracting = false;
      this.hasExtracted = true;
    });
  }

  postExtractPlaylist(playlistId: string) {
    const jsonPayload = {
      "id_playlist_train": "",
      "id_playlist_test": ""
    };
    jsonPayload["id_playlist_train"] = playlistId;
    jsonPayload["id_playlist_test"] = playlistId;

    return this.http.post(this.postExtractPlaylistUrl, jsonPayload);
  }


  getRecommedation() {
    this.isRecommending = true;

    this.selectedPlaylists.id_playlist_train = this.trainPlaylist?.nativeElement.value;
    this.selectedPlaylists.id_playlist_test = this.testPlaylist?.nativeElement.value;

    if (this.selectedPlaylists.id_playlist_train === this.selectedPlaylists.id_playlist_test) {
      this.idsAreEqual = true;
      this.isRecommending = false;
      return;
    }

    console.log("Selected playlists: ", this.selectedPlaylists);
    this.recommendedSongs = [];

    this.postRecommendedSongs(this.selectedPlaylists).subscribe((songs: any) => {
      if (songs.data && songs.data.length > 0) {
        songs.data.forEach((song: any) => {
          console.log("Song: ", song);

          this.recommendedSongs.push({ name: song["Name"], artist: song["Artist"], preview: song["Preview"] });
          this.songLikedStatus[song["Name"]] = false;
        });
      }

      this.isRecommending = false;
    });
  }

  postRecommendedSongs(selectedPlaylists: PlaylistsPayload) {
    const jsonPayload = {
      "id_playlist_train": "",
      "id_playlist_test": ""
    };

    if (selectedPlaylists.id_playlist_test != this.defaultCase.id_playlist_test || selectedPlaylists.id_playlist_train != this.defaultCase.id_playlist_train) {
      jsonPayload["id_playlist_train"] = selectedPlaylists.id_playlist_train;
      jsonPayload["id_playlist_test"] = selectedPlaylists.id_playlist_test;
    }

    console.log("jsonPayload: ", jsonPayload);
     
    return this.http.post(this.postRecommendedSongsUrl, jsonPayload);
  }
  


  truncatePlaylistName(playlistName: string): string {
    let maxLength = 35;

    if (playlistName.length > maxLength) {
      return playlistName.substring(0, maxLength) + '...';
    }
    return playlistName;
  }

  countLiked(songName: string) {
    this.songLikedStatus[songName] = !this.songLikedStatus[songName];

    let likedSongs = Object.values(this.songLikedStatus).filter((liked) => liked).length;

    this.accuracy = Math.round((likedSongs / this.recommendedSongs.length) * 100);
  }
}
