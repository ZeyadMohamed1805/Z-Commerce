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
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      try {
        this.apiService
          .createData<any>(`products/add-cart/${parsedUser.user._id}`, {
            productId: this.details._id,
            token: parsedUser.token,
          })
          .subscribe((response) => {
            console.log(response);
            this.openSnackBar(
              `${this.details.name} was added to your cart!`,
              'Close'
            );
          });
      } catch (error: unknown) {
        this.openSnackBar(`Something went wrong`, 'Close');
      }
    } else {
      this.openSnackBar('You must login first', 'Close');
    }
  }

  addToWishlist(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      try {
        this.apiService
          .createData<any>(`products/add-wishlist/${parsedUser.user._id}`, {
            productId: this.details._id,
            token: parsedUser.token,
          })
          .subscribe((response) => {
            console.log(response);
            this.openSnackBar(
              `${this.details.name} was added to your wishlist!`,
              'Close'
            );
          });
      } catch (error: unknown) {
        this.openSnackBar(`Something went wrong`, 'Close');
      }
    } else {
      this.openSnackBar('You must login first', 'Close');
    }
  }
}
