import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { SingleCompanyComponent } from './company-list/single-company/single-company.component';
import { CompanyFormComponent } from './company-list/company-form/company-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { CompaniesService } from './services/companies.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SingleProductComponent } from './product-list/single-product/single-product.component';
import { ProductFormComponent } from './product-list/product-form/product-form.component';
import { ProductsService } from './services/products.service';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-list/order-form/order-form.component';
import { SingleOrderComponent } from './order-list/single-order/single-order.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-list/client-form/client-form.component';
import { SingleClientComponent } from './client-list/single-client/single-client.component';
import { OrdersService } from './services/orders.service';
import { EntryListComponent } from './entry-list/entry-list.component';
import { SingleEntryComponent } from './entry-list/single-entry/single-entry.component';
import { EntryFormComponent } from './entry-list/entry-form/entry-form.component';
import { ExitListComponent } from './exit-list/exit-list.component';
import { SingleExitComponent } from './exit-list/single-exit/single-exit.component';
import { ExitFormComponent } from './exit-list/exit-form/exit-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntriesService } from './services/entries.service';
import { ExitsService } from './services/exits.service';
import { ProgressbarComponent } from './progressbar/progressbar.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent},
  { path: 'products', canActivate: [AuthGuardService], component: ProductListComponent },
  { path: 'products/new', canActivate: [AuthGuardService], component: ProductFormComponent },
  { path: 'products/view/:id', canActivate: [AuthGuardService], component: SingleProductComponent },
  { path: 'orders', canActivate: [AuthGuardService], component: OrderListComponent},
  { path: 'orders/new', canActivate: [AuthGuardService], component: OrderFormComponent},
  { path: 'orders/view/:id', canActivate: [AuthGuardService], component: SingleOrderComponent},
  { path: 'entries', canActivate: [AuthGuardService], component: EntryListComponent},
  { path: 'entries/new', canActivate: [AuthGuardService], component: EntryFormComponent},
  { path: 'entries/view/:id', canActivate: [AuthGuardService], component: SingleEntryComponent},
  { path: 'exits', canActivate: [AuthGuardService], component: ExitListComponent},
  { path: 'exits/new', canActivate: [AuthGuardService], component: ExitFormComponent},
  { path: 'exits/view/:id', canActivate: [AuthGuardService], component: SingleExitComponent},
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full'},
  { path: '**', redirectTo: 'auth/signin'}
];


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CompanyListComponent,
    SingleCompanyComponent,
    CompanyFormComponent,
    SidebarComponent,
    HeaderComponent,
    ProductListComponent,
    SingleProductComponent,
    ProductFormComponent,
    OrderListComponent,
    OrderFormComponent,
    SingleOrderComponent,
    ClientListComponent,
    ClientFormComponent,
    SingleClientComponent,
    EntryListComponent,
    SingleEntryComponent,
    EntryFormComponent,
    ExitListComponent,
    SingleExitComponent,
    ExitFormComponent,
    DashboardComponent,
    ProgressbarComponent,

  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    CompaniesService,
    OrdersService,
    ProductsService,
    EntriesService,
    ExitsService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
