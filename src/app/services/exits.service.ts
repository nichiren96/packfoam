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

    this.updateProductQuantity(newExit.product_reference, newExit.quantity);
  }


  updateProductQuantity(product_reference: string, product_quantity: number) {

    let q;
    let product;
    let id;

    // Get a database reference 
    var db = firebase.database();
    var ref = db.ref("exits");
    var aref = db.ref("products").orderByChild('reference').equalTo(product_reference);

    aref.once('value', (data) => {

      product = data.val();

      console.log("KEY "+ data.key);

      console.log(product.reference);

      switch (product_reference) {
        case "HD10":
          id = 0
          break;
        case "HD20":
          id = 1
          break;
        case "HD30":
          id = 2;
          break;

      }

      console.log("PRODUCT TO UPDATE CURRENT FROM DATABASE ===> " + product[id].reference);
      console.log("PRODUCT TO UPDATE CURRENT QUANTITY FROM DATABASE => " + product[id].quantity);

      q = parseInt(product[id].quantity) - product_quantity;

      product[id].quantity = q;

      console.log("PRODUCT TO UPDATE CURRENT QUANTITY AFTER HOT CHANGE :)=> " + product[id].quantity);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

      firebase.database().ref("/products/"+id).update({ quantity: q });

    });



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
