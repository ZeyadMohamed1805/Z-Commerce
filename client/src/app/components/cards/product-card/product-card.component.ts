import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { TProduct } from './product-card.types';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../services/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubstringPipe } from '../../../pipes/substring/substring.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    SubstringPipe,
  ],
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
      if (element._id === this.details._id) {
        isItemAdded = true;
      }

      return element;
    });

    if (!isItemAdded) {
      localStorage.setItem(
        'cart',
        JSON.stringify([...parsedCartItems, { ...this.details, amount: 1 }])
      );
      this.openSnackBar('Item is added to your cart!', 'Close');
    } else {
      this.openSnackBar('Item is already in your cart', 'Close');
    }
  }

  addToWishlist(): void {
    const wishlistItems = localStorage.getItem('wishlist');
    let parsedWishlistItems = wishlistItems ? JSON.parse(wishlistItems) : [];
    let isItemAdded = false;

    parsedWishlistItems = parsedWishlistItems.map((element: any) => {
      if (element._id === this.details._id) {
        isItemAdded = true;
      }

      return element;
    });

    if (!isItemAdded) {
      localStorage.setItem(
        'wishlist',
        JSON.stringify([...parsedWishlistItems, { ...this.details, amount: 1 }])
      );
      this.openSnackBar('Item is added to your wishlist!', 'Close');
    } else {
      this.openSnackBar('Item is already in your wishlist', 'Close');
    }
  }

  addToBasket(type: string): void {
    const cartItems = localStorage.getItem('cart');
    const wishlistItems = localStorage.getItem('wishlist');
    let parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
    let parsedWishlistItems = wishlistItems ? JSON.parse(wishlistItems) : [];
    let isItemAddedToCart = false;
    let isItemAddedToWishlist = false;

    parsedCartItems.forEach((element: any) => {
      if (element._id === this.details._id) {
        isItemAddedToCart = true;
      }
    });

    parsedWishlistItems.forEach((element: any) => {
      if (element._id === this.details._id) {
        isItemAddedToWishlist = true;
      }
    });

    if (!isItemAddedToCart && !isItemAddedToWishlist) {
      localStorage.setItem(
        type,
        JSON.stringify(
          type === 'cart'
            ? [...parsedCartItems, { ...this.details, amount: 1 }]
            : [...parsedWishlistItems, { ...this.details, amount: 1 }]
        )
      );
      this.openSnackBar(`Item is added to your ${type}!`, 'Close');
    } else {
      if (type === 'cart') {
        if (isItemAddedToCart)
          this.openSnackBar('Item is already in your cart', 'Close');
        else if (isItemAddedToWishlist) {
          localStorage.setItem(
            'wishlist',
            JSON.stringify(
              parsedWishlistItems.filter(
                (item: any) => item._id !== this.details._id
              )
            )
          );
          localStorage.setItem(
            'cart',
            JSON.stringify([...parsedCartItems, { ...this.details, amount: 1 }])
          );
        }
      } else {
        isItemAddedToWishlist &&
          this.openSnackBar('Item is already in your wishlist', 'Close');
        isItemAddedToCart &&
          this.openSnackBar('Item is already in your cart', 'Close');
      }
    }
  }
}
