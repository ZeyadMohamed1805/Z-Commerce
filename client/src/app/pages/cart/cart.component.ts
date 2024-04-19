import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSelectModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  displayedColumns: string[] = ['product', 'price', 'quantity', 'subtotal'];
  displayedColumnsTwo: string[] = ['title', 'value'];
  amounts: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ELEMENT_DATA: Array<{
    product: { image: string; name: string };
    price: number;
    quantity: number;
    subtotal: number;
  }> = [
    {
      product: { image: '../../../assets/images/light-logo.svg', name: 'Name' },
      price: 250,
      quantity: 0,
      subtotal: 200,
    },
    {
      product: { image: '../../../assets/images/light-logo.svg', name: 'Name' },
      price: 250,
      quantity: 0,
      subtotal: 200,
    },
    {
      product: { image: '../../../assets/images/light-logo.svg', name: 'Name' },
      price: 250,
      quantity: 0,
      subtotal: 200,
    },
  ];
  ELEMENT_DATA_TWO = [
    { title: 'Subtotal', value: 1750 },
    { title: 'Shipping', value: 0 },
    { title: 'Total', value: 1750 },
  ];
  dataSource = this.ELEMENT_DATA;
  dataSourceTwo = this.ELEMENT_DATA_TWO;
}
