import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { WishlistComponent } from '../../components/wishlist/wishlist.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    CartComponent,
    WishlistComponent,
    MatTableModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule,
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  cartQuantity = JSON.parse(localStorage.getItem('cart')!).length
    ? JSON.parse(localStorage.getItem('cart')!)
        .map((item: any) => item.amount)
        .reduce((current: any, next: any) => current + next)
    : 0;
  wishlistQuantity = JSON.parse(localStorage.getItem('wishlist')!).length
    ? JSON.parse(localStorage.getItem('wishlist')!)
        .map((item: any) => item.amount)
        .reduce((current: any, next: any) => current + next)
    : 0;
}
