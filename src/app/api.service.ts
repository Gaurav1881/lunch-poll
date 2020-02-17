import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { User } from './model/user.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user: User;
  gotMoreLocations: Subject<any>;
  private nearbyData = [];
  private nextPage = [];

  constructor(private http: HttpClient, private router: Router) {
    firebase.initializeApp({
      apiKey: environment.FIREBASE_KEY,
      authDomain: "places-1562338603006.firebaseapp.com",
      databaseURL: "https://places-1562338603006.firebaseio.com/",
    });
    this.user = new User();
    this.gotMoreLocations = new Subject();
  }

  async getNearby(location: string) {
    this.nearbyData = [];
    this.http.get("http://localhost:4000/api/getData?location=" + location).subscribe(
      (data: any) => {
        data.results.forEach(place => {
          this.nearbyData.push({
            'id': place.id,
            'name': place.name,
            'rating': place.rating
          });
        });
        this.gotMoreLocations.next(this.nearbyData);
      }
    );
  }

  getUserData() {
    firebase.database().ref("/users/" + this.user.uuid).once("value").then(
      (data) => {
        console.log(data.toJSON());
        this.user.name = data.toJSON()['name'];
        this.router.navigate(['/dash']);
      }
    )
  }

  async getUser(email: string, password: string): Promise<any> {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      (data) => {
        this.user.uuid = data.user.uid;
        this.getUserData();
      }
    );
  }

  setUser(name: string, email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      (data) => {
        this.user.uuid = data.user.uid;
        this.setupUser(name);
      }
    );
  }

  setupUser(name: string) {
    firebase.database().ref("/users/" + this.user.uuid + '/name').set(name).then(
      () => this.getUserData()
    )
  }
}
