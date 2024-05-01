import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { ReplaySubject, takeUntil } from 'rxjs';

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
export class OrdersComponent implements OnInit {
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
    [
      { title: 'Subtotal', value: 1750 },
      { title: 'Shipping', value: 0 },
      { title: 'Total', value: 1750 },
    ],
    [
      { title: 'Subtotal', value: 1750 },
      { title: 'Shipping', value: 0 },
      { title: 'Total', value: 1750 },
    ],
    [
      { title: 'Subtotal', value: 1750 },
      { title: 'Shipping', value: 0 },
      { title: 'Total', value: 1750 },
    ],
  ];
  dataSourceTwo = this.ELEMENT_DATA_TWO;
  destroyed = new ReplaySubject<void>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.apiService
      .createData(`orders/summary/${user.user._id}`, { token: user.token })
      .pipe(takeUntil(this.destroyed))
      .subscribe((response: any) => {
        console.log(response);
        this.ELEMENT_DATA = response.orders.map((order: any) => ({
          id: order._id,
          date: order.createAt,
          buyer: order.user,
          state: order.state,
        }));
        this.ELEMENT_DATA_TWO = response.summaries.map((summary: any) => [
          { title: 'subtotal', value: summary.subtotal },
          { title: 'shipping', value: summary.shipping },
          { title: 'taxes', value: summary.taxes },
          { title: 'total', value: summary.total },
        ]);
        this.dataSource = this.ELEMENT_DATA;
        this.dataSourceTwo = this.ELEMENT_DATA_TWO;
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
