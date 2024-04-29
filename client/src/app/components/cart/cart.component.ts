import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatSelectModule,
    MatTabsModule,
    MatBadgeModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  displayedColumns: string[] = [
    'product',
    'price',
    'quantity',
    'subtotal',
    'remove',
  ];
  displayedColumnsTwo: string[] = ['title', 'value'];
  ELEMENT_DATA: Array<any> = JSON.parse(localStorage.getItem('cart')!);
  ELEMENT_DATA_TWO = [
    {
      title: 'Subtotal',
      value: this.ELEMENT_DATA.length
        ? this.ELEMENT_DATA.map(
            (element) => element.price * element.amount
          ).reduce((current, next) => current + next)
        : 0,
    },
    { title: 'Shipping', value: 0 },
    {
      title: 'Total',
      value: this.ELEMENT_DATA.length
        ? this.ELEMENT_DATA.map(
            (element) => element.price * element.amount
          ).reduce((current, next) => current + next)
        : 0,
    },
  ];
  dataSource = this.ELEMENT_DATA;
  dataSourceTwo = this.ELEMENT_DATA_TWO;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onAmountChange(element: any, amount: any) {
    const index = this.ELEMENT_DATA.findIndex(
      (item) => item._id === element._id
    );
    this.ELEMENT_DATA[index].amount = amount;
    localStorage.setItem('cart', JSON.stringify(this.ELEMENT_DATA));
    window.location.reload();
  }

  onRemove(element: any) {
    localStorage.setItem(
      'cart',
      JSON.stringify(
        this.ELEMENT_DATA.filter((item) => item._id !== element._id)
      )
    );
    window.location.reload();
  }

  onCheckout() {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigateByUrl('checkout');
    } else {
      this.openSnackBar('You must login first', 'Close');
    }
  }
}
