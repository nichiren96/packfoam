import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {

  show = false;

  constructor() { }

  ngOnInit() {
   
  }

  ngOnDestroy() {
   
  }
}
