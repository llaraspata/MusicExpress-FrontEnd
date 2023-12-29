import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Playlist } from '../playlist';
import { RecommendedSong } from '../recommended-song';
import { WelcomeComponent } from "../welcome/welcome.component";
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [MatCheckboxModule, WelcomeComponent]
})

export class DashboardComponent {
  dashboardService: DashboardService = inject(DashboardService);

  availablePlaylists: Playlist[] = [];
  
  @ViewChild("extract", { static: false }) extract?: ElementRef;

  @ViewChild("trainPlaylist", { static: false }) trainPlaylist?: ElementRef;
  @ViewChild("testPlaylist", { static: false }) testPlaylist?: ElementRef;

  selectedPlaylists: { "train": string, "test": string } = {
    train: "3fSsw9Mp5Mi2DDiweZggtP",
    test: "2YRe7HRKNRvXdJBp9nXFza"
  };
  
  recommendedSongs: RecommendedSong[] = [];

  songsNames: string[] = [];
  accuracy: number = 0;
  songLikedStatus: { [songName: string]: boolean } = {};

  constructor() {
    this.dashboardService.getAvailablePlaylists().then((availablePlaylists: Playlist[]) => {
      this.availablePlaylists = availablePlaylists;
    });

    this.dashboardService.getRecommendedSongs().then((recommendedSongs: RecommendedSong[]) => {
      this.recommendedSongs = recommendedSongs;
      this.songsNames = recommendedSongs.map((recommendedSongs) => recommendedSongs.name);
      this.songsNames.forEach((songName) => {
        this.songLikedStatus[songName] = false;
      });
    });
  }

  extractPlaylist() {
    console.log("Extracting playlist ", this.extract?.nativeElement.value, "...");
  }

  getRecommedation() {
    this.selectedPlaylists["train"] = this.trainPlaylist?.nativeElement.value;
    this.selectedPlaylists["test"] = this.testPlaylist?.nativeElement.value;

    console.log("Selected playlists: ", this.selectedPlaylists);
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
