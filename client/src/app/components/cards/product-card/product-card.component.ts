import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { TProduct } from './product-card.types';
import { MatIconModule } from '@angular/material/icon';

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
}
