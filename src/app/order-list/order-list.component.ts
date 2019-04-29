import { Component, OnInit } from '@angular/core';
import { Order } from '../models/Order.model';
import { Subscription } from 'rxjs';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[];
  ordersSubscription: Subscription;

  constructor(private orderService: OrdersService, private router: Router) { }

  ngOnInit() {
    this.ordersSubscription = this.orderService.ordersSubject.subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      }
    );
    this.orderService.getOrders();
    this.orderService.emitOrders();
  }

  onNewOrder() {
    this.router.navigate(['/orders', 'new']);
  }

  onDeleteOrder(order: Order) {
    this.orderService.removeOrder(order);
  }

  onViewOrder(id: number) {
    this.router.navigate(['/orders', 'view', id]);
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }

}
