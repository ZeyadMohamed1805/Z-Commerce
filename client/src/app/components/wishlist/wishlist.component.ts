import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatSelectModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  displayedColumns: string[] = ['product', 'price', 'state', 'cart'];
  ELEMENT_DATA: Array<any> = JSON.parse(localStorage.getItem('wishlist')!);
  dataSource = this.ELEMENT_DATA;

  onMoveToCart(element: any) {
    localStorage.setItem(
      'wishlist',
      JSON.stringify(
        this.ELEMENT_DATA.filter((item) => item._id !== element._id)
      )
    );
    const cartItems = localStorage.getItem('cart');
    const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];

    localStorage.setItem('cart', JSON.stringify([...parsedCartItems, element]));
    window.location.reload();
  }
}
