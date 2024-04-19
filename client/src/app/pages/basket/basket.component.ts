import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
