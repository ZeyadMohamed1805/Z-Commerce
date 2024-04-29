import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  contactInfo = {
    address: '',
    phone: null,
    date: new Date(),
    cvv: null,
    card: null,
  };
  summary: any = {
    products: [],
    subtotal: 0,
    shipping: 0,
    total: 0,
  };
  firstFormGroup = this._formBuilder.group({
    firstCtrl: [this.contactInfo.address, Validators.required],
    secondCtrl: [this.contactInfo.phone, Validators.required],
    thirdCtrl: [this.contactInfo.date, Validators.required],
    fourthCtrl: [this.contactInfo.cvv, Validators.required],
    fifthCtrl: [this.contactInfo.card, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({});
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  displayedColumnsTwo: string[] = ['title', 'value'];
  amounts: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ELEMENT_DATA_TWO: any = [];
  dataSourceTwo = this.ELEMENT_DATA_TWO;

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.apiService
        .createData<any>(`payments/${user.user._id}`, { token: user.token })
        .subscribe((response) => {
          console.log(response);
          this.contactInfo = response.payment;
          this.firstFormGroup = this._formBuilder.group({
            firstCtrl: [this.contactInfo.address, Validators.required],
            secondCtrl: [this.contactInfo.phone, Validators.required],
            thirdCtrl: [this.contactInfo.date, Validators.required],
            fourthCtrl: [this.contactInfo.cvv, Validators.required],
            fifthCtrl: [this.contactInfo.card, Validators.required],
          });
        });
      const cart = JSON.parse(localStorage.getItem('cart')!);
      cart.forEach((item: any) => {
        this.ELEMENT_DATA_TWO.push({
          title: item.name,
          value: item.price * item.amount,
        });
      });
      this.ELEMENT_DATA_TWO.push({
        title: 'subtotal',
        value:
          cart.length > 1
            ? cart.reduce(
                (current: any, next: any) =>
                  current.price * current.amount + next.price * next.amount
              )
            : cart[0].price * cart[0].amount,
      });
      this.ELEMENT_DATA_TWO.push({ title: 'shipping', value: 0 });
      this.ELEMENT_DATA_TWO.push({
        title: 'total',
        value:
          cart.length > 1
            ? cart.reduce(
                (current: any, next: any) =>
                  current.price * current.amount + next.price * next.amount
              )
            : cart[0].price * cart[0].amount,
      });
    }
  }

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('user')!);
    const cart = JSON.parse(localStorage.getItem('cart')!);
    if (user) {
      this.apiService
        .createData<any>(`orders/${user.user._id}`, {
          order: {
            deliveryDate: this.firstFormGroup.value.thirdCtrl,
            user: user.user._id,
            sellers: cart.map((item: any) => item.seller._id),
            state: 0,
            products: cart.map((item: any) => ({
              _id: item._id,
              quantity: item.amount,
            })),
          },
          payment: !user.user.paymentDetails.length
            ? {
                address: this.firstFormGroup.value.firstCtrl,
                phone: this.firstFormGroup.value.secondCtrl,
                cvv: this.firstFormGroup.value.fourthCtrl,
                card: this.firstFormGroup.value.fifthCtrl,
                user: user.user._id,
              }
            : null,
          summary: {
            products: cart.map((item: any) => ({
              _id: item._id,
              quantity: item.amount,
            })),
            subtotal:
              cart.length > 1
                ? cart.reduce(
                    (current: any, next: any) =>
                      current.price * current.amount + next.price * next.amount
                  )
                : cart[0].price * cart[0].amount,
            shipping: 0,
            taxes: 0,
            total:
              cart.length > 1
                ? cart.reduce(
                    (current: any, next: any) =>
                      current.price * current.amount + next.price * next.amount
                  )
                : cart[0].price * cart[0].amount,
          },
          token: user.token,
        })
        .subscribe((response) => {
          console.log(response);
          localStorage.setItem('cart', JSON.stringify([]));
          localStorage.setItem(
            'user',
            JSON.stringify({ user: response.user, token: user.token })
          );
        });
    }
  }
}
