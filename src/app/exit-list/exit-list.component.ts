import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exit } from '../models/Exit.model';
import { Subscription } from 'rxjs';
import { ExitsService } from '../services/exits.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-exit-list',
  templateUrl: './exit-list.component.html',
  styleUrls: ['./exit-list.component.css']
})
export class ExitListComponent implements OnInit {
  exits: Exit[];
  exitsSubscription: Subscription;

  constructor(private exitService: ExitsService, private router: Router) { }

  ngOnInit() {
    this.exitsSubscription = this.exitService.exitsSubject.subscribe(
      (exits: Exit[]) => {
        this.exits = exits;
      }
    );
    this.exitService.getExits();
    this.exitService.emitExits();
  }

  onNewExit() {
    this.router.navigate(['/exits', 'new']);
  }

  onDeleteExit(exit: Exit) {
    this.exitService.removeExit(exit);
  }

  onViewExit(id: number) {
    this.router.navigate(['/exits', 'view', id]);
  }

  ngOnDestroy() {
    this.exitsSubscription.unsubscribe();
  }


}
