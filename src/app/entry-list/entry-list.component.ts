import { Component, OnInit, OnDestroy } from '@angular/core';
import { Entry } from '../models/Entry.model';
import { Subscription } from 'rxjs';
import { EntriesService } from '../services/entries.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[];
  entriesSubscription: Subscription;

  constructor(private entryService: EntriesService, private router: Router) { }

  ngOnInit() {
    this.entriesSubscription = this.entryService.entriesSubject.subscribe(
      (entries: Entry[]) => {
        this.entries = entries;
      }
    );
    this.entryService.getEntries();
    this.entryService.emitEntries();
  }

  onNewEntry() {
    this.router.navigate(['/entries', 'new']);
  }

  onDeleteEntry(entry: Entry) {
    this.entryService.removeEntry(entry);
  }

  onViewEntry(id: number) {
    this.router.navigate(['/entries', 'view', id]);
  }

  ngOnDestroy() {
    this.entriesSubscription.unsubscribe();
  }

}
