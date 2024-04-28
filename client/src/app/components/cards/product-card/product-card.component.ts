import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { TProduct } from './product-card.types';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../services/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() details: TProduct = {
    _id: 'ID',
    name: 'Product',
    description: 'Description',
    images: ['Photo.png'],
    seller: {
      _id: 'ID',
      name: 'Seller',
    },
    categories: [
      { _id: 'ID0', name: 'Category' },
      { _id: 'ID1', name: 'Category' },
      { _id: 'ID2', name: 'Category' },
    ],
    rating: 5,
    price: 199,
    state: 1,
    quantity: 5,
  };

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  addToCart(): void {
    const cartItems = localStorage.getItem('cart');
    let parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
    let isItemAdded = false;

    parsedCartItems.forEach((element: any) => {
      console.log(parsedCartItems, 1);

      if (element._id === this.details._id) {
        isItemAdded = true;
        element.amount += 1;
        console.log(parsedCartItems, 2);
      }

      return element;
    });

    if (!isItemAdded) {
      localStorage.setItem(
        'cart',
        JSON.stringify([...parsedCartItems, { ...this.details, amount: 1 }])
      );
    } else {
      localStorage.setItem('cart', JSON.stringify(parsedCartItems));
    }
    console.log(localStorage.getItem('cart'), 3);
  }

  addToWishlist(): void {
    const wishlistItems = localStorage.getItem('wishlist');
    let parsedWishlistItems = wishlistItems ? JSON.parse(wishlistItems) : [];
    let isItemAdded = false;

    parsedWishlistItems = parsedWishlistItems.map((element: any) => {
      if (element._id === this.details._id) {
        isItemAdded = true;
        element.amount++;
      }

      return element;
    });

    if (!isItemAdded) {
      localStorage.setItem(
        'wishlist',
        JSON.stringify([...parsedWishlistItems, { ...this.details, amount: 1 }])
      );
    }
    console.log(localStorage.getItem('wishlist'));
  }
}
