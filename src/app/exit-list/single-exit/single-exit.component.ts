import { Component, OnInit } from '@angular/core';
import { Exit } from '../../models/Exit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExitsService } from '../../services/exits.service';


@Component({
  selector: 'app-single-exit',
  templateUrl: './single-exit.component.html',
  styleUrls: ['./single-exit.component.css']
})
export class SingleExitComponent implements OnInit {

  exit: Exit;

  constructor(private route: ActivatedRoute,
    private exitService: ExitsService,
    private router: Router) { }

  ngOnInit() {
    this.exit = new Exit('', 0, 0, '', '');
    const id = this.route.snapshot.params['id'];
    this.exitService.getSingleExit(+id).then(
      (exit: Exit) => {
        this.exit = exit;
      }
    );
  }

  onBack() {
    this.router.navigate(['/exits']);
  }

}
