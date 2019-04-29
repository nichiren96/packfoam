import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/Order.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { Product } from '../../models/Product.model';
import { Client } from '../../models/Client.model';
import { ProductsService } from '../../services/products.service';
import { ClientsService } from '../../services/clients.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  orderForm: FormGroup;
  orders: Order[];
  ordersSubscription: Subscription;

  products: Product[];
  productsSubscription: Subscription;

  clients: Client[];
  clientsSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, 
              private orderService: OrdersService, 
              private productService: ProductsService,
              private clientService: ClientsService,
              private router: Router) { }

  ngOnInit() {

    this.productsSubscription = this.productService.productsSubject.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.productService.getProducts();
    this.productService.emitProducts();

    this.clientsSubscription = this.clientService.clientsSubject.subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      }
    );
    this.clientService.getClients()
    this.clientService.emitClients();

    this.initForm();
    
  }

  initForm() {
    this.orderForm = this.formBuilder.group({
      client: ['', Validators.required],
      article: ['', Validators.required],
      quantity: ['', Validators.required],
      product:  ['', Validators.required],
      status:  ['', Validators.required]
    });
  }

  onSaveOrder() {
    const client_id = this.orderForm.get('client').value;
    const product_id = this.orderForm.get('article').value;
    const product_quantity = this.orderForm.get('quantity').value;
    const user_id = firebase.auth().currentUser.email;
    const order_status = this.orderForm.get('status').value ?
                            this.orderForm.get('status').value : true ;

    const order_number = product_id + "/" +Date.now().toString()

    const neworder = new Order(order_number, 
                                Date.now().toString(),
                                product_quantity,
                                order_status, 
                                client_id, 
                                user_id, 
                                product_id);
    
    this.orderService.createNewOrder(neworder);
    this.router.navigate(['/orders'])
  }

  onBack() {
    this.router.navigate(['/orders']);
  }

  

}
