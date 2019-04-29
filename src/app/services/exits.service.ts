import { Injectable } from '@angular/core';
import { Exit } from '../models/Exit.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';



@Injectable()
export class ExitsService {

  exits: Exit[] = [];
  exitsSubject = new Subject<Exit[]>();

  constructor() { }


  emitExits() {
    this.exitsSubject.next(this.exits);
  }

  saveExits() {
    firebase.database().ref('/exits').set(this.exits);
  }

  getExits() {
    firebase.database().ref('/exits')
      .on('value', (data) => {
        this.exits = data.val() ? data.val() : [];
        this.emitExits();
      })
  }

  getSingleExit(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/exits/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewExit(newExit: Exit) {
    this.exits.push(newExit);
    this.saveExits();
    this.emitExits();
  }

  removeExit(exit: Exit) {

    const exitIndexToRemove = this.exits.findIndex(
      (EntryEl) => {
        if (EntryEl === exit) {
          return true;
        }
      }
    );
    this.exits.splice(exitIndexToRemove, 1);
    this.saveExits();
    this.emitExits();
  }


}
