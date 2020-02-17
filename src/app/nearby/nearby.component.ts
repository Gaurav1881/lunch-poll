import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  location;
  nearbyPlaces: any[];

  ngOnInit() {
  }

  onQuery() {
    this.apiService.getNearby(this.location);
    this.apiService.gotMoreLocations.subscribe(
      (data) => this.nearbyPlaces = data
    );
  }

}
