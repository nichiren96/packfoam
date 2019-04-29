import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExitsService } from '../../services/exits.service';
import { Router } from '@angular/router';
import { Exit } from '../../models/Exit.model';
import { Product } from '../../models/Product.model';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-exit-form',
  templateUrl: './exit-form.component.html',
  styleUrls: ['./exit-form.component.css']
})
export class ExitFormComponent implements OnInit {

  exitForm: FormGroup;

  product = 'Yes';

  products: Product[];
  productsSubscription: Subscription;
  
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private exitService: ExitsService,
              private productService: ProductsService,
              private router: Router) { }

  ngOnInit() {
    this.productsSubscription = this.productService.productsSubject.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.productService.getProducts();
    this.productService.emitProducts();
    this.initForm();

  }

  initForm() {
    this.exitForm = this.formBuilder.group({
      product: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      exit_date: ['', Validators.required],
  
    });
  }


  onSaveExit() {
    const product = this.exitForm.get('product').value;
    const quantity = this.exitForm.get('quantity').value;
    const price = this.exitForm.get('price').value;
    const exit_date = this.exitForm.get('exit_date').value ? 
                    this.exitForm.get('exit_date').value : Date.now().toString() ;
    const user = this.authService.getCurrentUser().email

    const newExit = new Exit(product, quantity, price, exit_date, user);
  
    this.exitService.createNewExit(newExit);
    this.router.navigate(['/exits'])
  }

  onBack() {
    this.router.navigate(['/exits']);
  }

}
