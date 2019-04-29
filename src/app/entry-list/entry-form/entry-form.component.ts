import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EntriesService } from '../../services/entries.service';
import { Router } from '@angular/router';
import { Entry } from '../../models/Entry.model';
import { Product } from '../../models/Product.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  entryForm: FormGroup;

  products: Product[];
  productsSubscription: Subscription;
  
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private entryService: EntriesService,
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
    this.entryForm = this.formBuilder.group({
      product: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      entry_date: ['', Validators.required]
    });
  }

  onSaveEntry() {
    const product = this.entryForm.get('product').value;
    const quantity = this.entryForm.get('quantity').value;
    const price = this.entryForm.get('price').value;
    const entry_date = this.entryForm.get('entry_date').value ? 
                  this.entryForm.get('entry_date').value : Date.now().toString() ;
    const user = this.authService.getCurrentUser().email;

    console.log("PRODUCT TO UPDATE: "+ product + " QUANTITY TO ADD: "+ quantity);

    const newEntry = new Entry(product, quantity, price, entry_date, user);
  
    this.entryService.createNewEntry(newEntry);
   // this.entryService.updateProductQuantity(product);


    this.router.navigate(['/entries'])
  }

  onBack() {
    this.router.navigate(['/entries']);
  }

}
