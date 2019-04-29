import { Injectable } from '@angular/core';
import { Entry } from '../models/Entry.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { ProductsService } from './products.service';



@Injectable()
export class EntriesService {

  entries: Entry[] = [];
  entriesSubject = new Subject<Entry[]>();


  constructor(private productService: ProductsService) { }


  emitEntries() {
    this.entriesSubject.next(this.entries);
  }

  saveEntries() {
    firebase.database().ref('/entries').set(this.entries);
  }

  getEntries() {
    firebase.database().ref('/entries')
      .on('value', (data) => {
        this.entries = data.val() ? data.val() : [];
        this.emitEntries();
      })
  }

  getSingleEntry(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/entries/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewEntry(newEntry: Entry) {

    this.entries.push(newEntry);
    this.saveEntries();
    this.emitEntries();

    this.updateProductQuantity(newEntry.product_reference, newEntry.quantity);

  }

  updateProductQuantity(product_reference: string, product_quantity: number) {

    let q;
    let product;
    let id;

    // Get a database reference 
    var db = firebase.database();
    var ref = db.ref("entries");
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

      q = parseInt(product[id].quantity) + product_quantity;

      product[id].quantity = q;

      console.log("PRODUCT TO UPDATE CURRENT QUANTITY AFTER HOT CHANGE :)=> " + product[id].quantity);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

      firebase.database().ref("/products/"+id).update({ quantity: q });

    });



  }


  removeEntry(entry: Entry) {

    const entryIndexToRemove = this.entries.findIndex(
      (EntryEl) => {
        if (EntryEl === entry) {
          return true;
        }
      }
    );
    this.entries.splice(entryIndexToRemove, 1);
    this.saveEntries();
    this.emitEntries();
  }


}
