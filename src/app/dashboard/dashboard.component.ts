import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }
  name: string;

  ngOnInit() {
    this.name = this.apiService.user.name;
  }

  findNearby() {
    this.router.navigate(['/nearby']);
  }

  navGroups() {
    this.router.navigate(['/groups']);
  }

}
