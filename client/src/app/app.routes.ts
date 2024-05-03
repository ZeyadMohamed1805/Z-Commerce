import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { BasketComponent } from './pages/basket/basket.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AccountComponent } from './pages/account/account.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', component: NotFoundComponent },
];
