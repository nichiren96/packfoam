import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading = false;

  constructor(private router: Router) {
    var config = {
      apiKey: "AIzaSyDiuoRrODxHGO-aM5fLE-0QKi-h-sjOEmw",
      authDomain: "lazandraha-9b719.firebaseapp.com",
      databaseURL: "https://lazandraha-9b719.firebaseio.com",
      projectId: "lazandraha-9b719",
      storageBucket: "lazandraha-9b719.appspot.com",
      messagingSenderId: "815920179583"
    };
    firebase.initializeApp(config);

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }



}

