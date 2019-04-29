import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  orderForm: FormGroup;
  orders: Order[];
  ordersSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private orderService: OrdersService, private router: Router) { }

  ngOnInit() {

    this.initForm();
    
  }

  initForm() {
    this.orderForm = this.formBuilder.group({
      client: ['', Validators.required],
      article: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  onSaveOrder() {
    const client_id = this.orderForm.get('client').value;
    const product_id = this.orderForm.get('article').value;
    const product_quantity = this.orderForm.get('quantity').value;
    const user_id = this.orderForm.get('user').value;
    const order_status = this.orderForm.get('status').value;

    const order_number = product_id + Date.now().toString()

    const neworder = new Order(order_number, Date.now().toString(), order_status, client_id, user_id, product_id);
    
    this.orderService.createNewOrder(neworder);
    this.router.navigate(['/orders'])
  }

  onBack() {
    this.router.navigate(['/orders']);
  }

  

}
