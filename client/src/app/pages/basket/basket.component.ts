import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  WISHLIST_ELEMENT_DATA: Array<any> = JSON.parse(
    localStorage.getItem('wishlist')!
  );
  CART_ELEMENT_DATA: Array<any> = JSON.parse(localStorage.getItem('cart')!);
  CART_ELEMENT_DATA_TWO = [
    {
      title: 'Subtotal',
      value: this.CART_ELEMENT_DATA.length
        ? this.CART_ELEMENT_DATA.map(
            (element) => element.price * element.amount
          ).reduce((current, next) => current + next)
        : 0,
    },
    { title: 'Shipping', value: 0 },
    {
      title: 'Total',
      value: this.CART_ELEMENT_DATA.length
        ? this.CART_ELEMENT_DATA.map(
            (element) => element.price * element.amount
          ).reduce((current, next) => current + next)
        : 0,
    },
  ];
  cartQuantity = JSON.parse(localStorage.getItem('cart')!).length
    ? JSON.parse(localStorage.getItem('cart')!)
        .map((item: any) => item.amount)
        .reduce((current: any, next: any) => current + next)
    : 0;
  wishlistQuantity = JSON.parse(localStorage.getItem('wishlist')!).length
    ? JSON.parse(localStorage.getItem('wishlist')!)
        .map((item: any) => item.amount)
        .reduce((current: any, next: any) => current + next)
    : 0;
  dataSource = this.CART_ELEMENT_DATA;
  dataSourceTwo = this.CART_ELEMENT_DATA_TWO;

  onMoveToCart(event: any) {
    console.log(event);
    this.WISHLIST_ELEMENT_DATA = this.WISHLIST_ELEMENT_DATA.filter(
      (item) => item._id !== event._id
    ).map((item) => item);
    this.CART_ELEMENT_DATA = [...this.CART_ELEMENT_DATA, event];
    this.CART_ELEMENT_DATA_TWO = [
      {
        title: 'Subtotal',
        value: this.CART_ELEMENT_DATA.length
          ? this.CART_ELEMENT_DATA.map(
              (element) => element.price * element.amount
            ).reduce((current, next) => current + next)
          : 0,
      },
      { title: 'Shipping', value: 0 },
      {
        title: 'Total',
        value: this.CART_ELEMENT_DATA.length
          ? this.CART_ELEMENT_DATA.map(
              (element) => element.price * element.amount
            ).reduce((current, next) => current + next)
          : 0,
      },
    ];
    this.dataSource = this.CART_ELEMENT_DATA;
    this.dataSourceTwo = this.CART_ELEMENT_DATA_TWO;
    this.cartQuantity = this.CART_ELEMENT_DATA.length
      ? this.CART_ELEMENT_DATA.map((item: any) => item.amount).reduce(
          (current: any, next: any) => current + next
        )
      : 0;
    this.wishlistQuantity = this.WISHLIST_ELEMENT_DATA.length
      ? this.WISHLIST_ELEMENT_DATA.map((item: any) => item.amount).reduce(
          (current: any, next: any) => current + next
        )
      : 0;

    localStorage.setItem(
      'wishlist',
      JSON.stringify(this.WISHLIST_ELEMENT_DATA)
    );

    localStorage.setItem('cart', JSON.stringify(this.CART_ELEMENT_DATA));
  }

  onAmountChange(event: [element: any, amount: any]) {
    console.log(event);

    const index = this.CART_ELEMENT_DATA.findIndex(
      (item) => item._id === event[0]._id
    );
    this.CART_ELEMENT_DATA[index].amount = event[1];
    this.CART_ELEMENT_DATA[index].subtotal =
      this.CART_ELEMENT_DATA[index].price * event[1];
    this.CART_ELEMENT_DATA_TWO = [
      {
        title: 'Subtotal',
        value: this.CART_ELEMENT_DATA.length
          ? this.CART_ELEMENT_DATA.map(
              (element) => element.price * element.amount
            ).reduce((current, next) => current + next)
          : 0,
      },
      { title: 'Shipping', value: 0 },
      {
        title: 'Total',
        value: this.CART_ELEMENT_DATA.length
          ? this.CART_ELEMENT_DATA.map(
              (element) => element.price * element.amount
            ).reduce((current, next) => current + next)
          : 0,
      },
    ];
    this.dataSource = this.CART_ELEMENT_DATA;
    this.dataSourceTwo = this.CART_ELEMENT_DATA_TWO;
    this.cartQuantity = this.CART_ELEMENT_DATA.length
      ? this.CART_ELEMENT_DATA.map((item: any) => item.amount).reduce(
          (current: any, next: any) => current + next
        )
      : 0;
    localStorage.setItem('cart', JSON.stringify(this.CART_ELEMENT_DATA));
    // window.location.reload();
  }

  onRemove(element: any) {
    console.log(element);
    this.CART_ELEMENT_DATA = this.CART_ELEMENT_DATA.filter(
      (item) => item._id !== element._id
    );
    this.CART_ELEMENT_DATA_TWO = [
      {
        title: 'Subtotal',
        value: this.CART_ELEMENT_DATA.length
          ? this.CART_ELEMENT_DATA.map(
              (element) => element.price * element.amount
            ).reduce((current, next) => current + next)
          : 0,
      },
      { title: 'Shipping', value: 0 },
      {
        title: 'Total',
        value: this.CART_ELEMENT_DATA.length
          ? this.CART_ELEMENT_DATA.map(
              (element) => element.price * element.amount
            ).reduce((current, next) => current + next)
          : 0,
      },
    ];
    this.dataSource = this.CART_ELEMENT_DATA;
    this.dataSourceTwo = this.CART_ELEMENT_DATA_TWO;
    this.cartQuantity = this.CART_ELEMENT_DATA.length
      ? this.CART_ELEMENT_DATA.map((item: any) => item.amount).reduce(
          (current: any, next: any) => current + next
        )
      : 0;
    localStorage.setItem('cart', JSON.stringify(this.CART_ELEMENT_DATA));
    // window.location.reload();
  }
}
