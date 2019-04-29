import { Component, OnInit } from '@angular/core';
import { Entry } from '../../models/Entry.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EntriesService } from '../../services/entries.service';

@Component({
  selector: 'app-single-entry',
  templateUrl: './single-entry.component.html',
  styleUrls: ['./single-entry.component.css']
})
export class SingleEntryComponent implements OnInit {

  entry: Entry;

  constructor(private route: ActivatedRoute,
    private entryService: EntriesService,
    private router: Router) { }

  ngOnInit() {
    this.entry = new Entry('', 0, '', '', '');
    const id = this.route.snapshot.params['id'];
    this.entryService.getSingleEntry(+id).then(
      (entry: Entry) => {
        this.entry = entry;
      }
    );
  }

  onBack() {
    this.router.navigate(['/entries']);
  }


}
