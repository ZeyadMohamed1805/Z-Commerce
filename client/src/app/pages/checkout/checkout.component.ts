import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
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
import { ReplaySubject, merge, takeUntil } from 'rxjs';

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
  address = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(50),
  ]);
  phone = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(15),
  ]);
  date = new FormControl('', [Validators.required]);
  errorMessages = ['', '', ''];
  dataSourceTwo = this.ELEMENT_DATA_TWO;
  destroyed = new ReplaySubject<void>();
  destroyedTwo = new ReplaySubject<void>();
  destroyedThree = new ReplaySubject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    merge(this.address.statusChanges, this.address.valueChanges)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.updateErrorMessages());
    merge(this.phone.statusChanges, this.phone.valueChanges)
      .pipe(takeUntil(this.destroyedTwo))
      .subscribe(() => this.updateErrorMessages());
    merge(this.date.statusChanges, this.date.valueChanges)
      .pipe(takeUntil(this.destroyedThree))
      .subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    if (this.address.hasError('required')) {
      this.errorMessages[0] = 'You must enter an Address';
    } else if (this.address.hasError('minlength')) {
      this.errorMessages[0] = 'Address is too short';
    } else if (this.address.hasError('maxlength')) {
      this.errorMessages[0] = 'Address is too long';
    } else {
      this.errorMessages[0] = '';
    }

    if (this.phone.hasError('required')) {
      this.errorMessages[1] = 'You must enter a phone';
    } else if (this.phone.hasError('minlength')) {
      this.errorMessages[1] = 'Phone is too short';
    } else if (this.phone.hasError('maxlength')) {
      this.errorMessages[1] = 'Phone is too long';
    } else {
      this.errorMessages[1] = '';
    }

    if (this.date.hasError('required')) {
      this.errorMessages[2] = 'You must enter a delivery date';
    } else {
      this.errorMessages[2] = '';
    }
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.apiService
        .createData<any>(`payments/${user.user._id}`, { token: user.token })
        .pipe(takeUntil(this.destroyed))
        .subscribe((response) => {
          console.log(response);
          this.contactInfo = response.payment;
          // this.address.value = this.contactInfo.address;
          // this.phone.value = this.contactInfo.phone;
          // this.date.value = this.contactInfo.date;
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
    if (
      user &&
      !this.address.invalid &&
      !this.phone.invalid &&
      !this.date.invalid
    ) {
      this.apiService
        .createData<any>(`orders/${user.user._id}`, {
          order: {
            deliveryDate: this.date.value,
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
                address: this.address.value,
                phone: this.phone.value,
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
        .pipe(takeUntil(this.destroyedTwo))
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

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.destroyedTwo.next();
    this.destroyedTwo.complete();
  }
}
