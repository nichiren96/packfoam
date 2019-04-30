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
import { Cart } from '../../models/Cart.model';
import { CartService } from '../../services/cart.service';


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

  carts: Cart[];
  cartsSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, 
              private orderService: OrdersService, 
              private cartService: CartService,
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
      product: ['', Validators.required],
      quantity: ['', Validators.required],
      status:  ['', Validators.required]
    });
  }

  onSaveCart() {

    const client_id = this.orderForm.get('client').value;
    const product_id = this.orderForm.get('product').value;
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

    const cart = new Cart(product_id, order_number, product_quantity, product_quantity*1000);
    this.cartService.createNewCart(cart);

    this.cartsSubscription = this.cartService.cartsSubject.subscribe(
      (carts: Cart[]) => {
        this.carts = carts;
      }
    );

    this.cartService.getCartByOrder(order_number);
    this.cartService.emitCarts();

  }

  onSaveOrder() {
    const client_id = this.orderForm.get('client').value;
    const product_id = this.orderForm.get('product').value;
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
