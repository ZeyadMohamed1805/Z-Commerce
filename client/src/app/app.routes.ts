import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { SellersComponent } from './pages/sellers/sellers.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'sellers', component: SellersComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: NotFoundComponent },
];
