import { Injectable } from '@angular/core';
import { Order } from '../models/Order.model';
import { Subject } from 'rxjs/';
import * as firebase from 'firebase';


@Injectable()
export class OrdersService {

  orders: Order[] = [];
  ordersSubject = new Subject<Order[]>();


  constructor() { }

  emitOrders() {
    this.ordersSubject.next(this.orders);
  }

  saveOrders() {
    firebase.database().ref('/orders').set(this.orders);
  }

  getOrders() {
    firebase.database().ref('/orders')
      .on('value', (data) => {
        this.orders = data.val() ? data.val() : [];
        this.emitOrders();
      })
  }

  getSingleOrder(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/orders/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewOrder(newOrder: Order) {
    this.orders.push(newOrder);
    this.saveOrders();
    this.emitOrders();
  }

  removeOrder(Order: Order) {

    const OrderIndexToRemove = this.orders.findIndex(
      (OrderEl) => {
        if (OrderEl === Order) {
          return true;
        }
      }
    );
    this.orders.splice(OrderIndexToRemove, 1);
    this.saveOrders();
    this.emitOrders();
  }

}
