import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { TProduct } from './product-card.types';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() details: TProduct = {
    _id: 'ID',
    name: 'Name',
    description: 'Description',
    photo: 'Photo.png',
    seller: 'Seller',
    categories: ['One, Two', 'Three'],
    rating: 5,
    price: 199,
    creationDate: new Date(),
    _v: 'Version',
  };
}
