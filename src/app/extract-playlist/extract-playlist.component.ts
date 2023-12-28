import { Component, inject } from '@angular/core';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-extract-playlist',
  standalone: true,
  imports: [],
  templateUrl: './extract-playlist.component.html',
  styleUrl: './extract-playlist.component.css'
})
export class ExtractPlaylistComponent {
  housingLocationList: HousingLocation[] = [];
  cities: string[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.cities = housingLocationList.map((housingLocation) => housingLocation.name);
      this.filteredLocationList = housingLocationList;
    });
  }

  extractPlaylist(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
