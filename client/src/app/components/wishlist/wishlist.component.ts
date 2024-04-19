import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSelectModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  displayedColumns: string[] = [
    'product',
    'price',
    'quantity',
    'subtotal',
    'state',
    'cart',
  ];
  amounts: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ELEMENT_DATA: Array<{
    product: { image: string; name: string };
    price: number;
    quantity: number;
    subtotal: number;
    state: number;
  }> = [
    {
      product: { image: '../../../assets/images/light-logo.svg', name: 'Name' },
      price: 250,
      quantity: 0,
      subtotal: 200,
      state: 0,
    },
    {
      product: { image: '../../../assets/images/light-logo.svg', name: 'Name' },
      price: 250,
      quantity: 0,
      subtotal: 200,
      state: 1,
    },
    {
      product: { image: '../../../assets/images/light-logo.svg', name: 'Name' },
      price: 250,
      quantity: 0,
      subtotal: 200,
      state: 0,
    },
  ];
  dataSource = this.ELEMENT_DATA;
}
