import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    MatBadgeModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  panelOpenState = false;
  displayedColumns: string[] = ['id', 'date', 'buyer', 'seller', 'summary'];
  amounts: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ELEMENT_DATA: Array<{
    id: string;
    date: string;
    buyer: string;
    state: number;
  }> = [
    {
      id: '0',
      date: new Date().toLocaleString(),
      buyer: 'Buyer',
      state: 0,
    },
    {
      id: '1',
      date: new Date().toLocaleString(),
      buyer: 'Buyer',
      state: 1,
    },
    {
      id: '2',
      date: new Date().toLocaleString(),
      buyer: 'Buyer',
      state: 0,
    },
    {
      id: '3',
      date: new Date().toLocaleString(),
      buyer: 'Buyer',
      state: 0,
    },
    {
      id: '4',
      date: new Date().toLocaleString(),
      buyer: 'Buyer',
      state: 1,
    },
    {
      id: '5',
      date: new Date().toLocaleString(),
      buyer: 'Buyer',
      state: 0,
    },
    {
      id: '6',
      date: new Date().toLocaleString(),
      buyer: 'Buyer',
      state: 0,
    },
    {
      id: '7',
      date: new Date().toLocaleString(),
      buyer: 'Buyer',
      state: 1,
    },
    {
      id: '8',
      date: new Date().toLocaleString(),
      buyer: 'Buyer',
      state: 0,
    },
    {
      id: '9',
      date: new Date().toLocaleString(),
      buyer: 'Buyer',
      state: 0,
    },
  ];
  dataSource = this.ELEMENT_DATA;
  displayedColumnsTwo: string[] = ['title', 'value'];
  ELEMENT_DATA_TWO = [
    { title: 'Subtotal', value: 1750 },
    { title: 'Shipping', value: 0 },
    { title: 'Total', value: 1750 },
  ];
  dataSourceTwo = this.ELEMENT_DATA_TWO;
}
