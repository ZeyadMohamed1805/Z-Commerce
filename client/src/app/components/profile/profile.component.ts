import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReplaySubject, merge, takeUntil } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIcon,
    MatDivider,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  options: Array<string> = ['Buyer', 'Seller'];
  userInfo: any = {
    name: '',
    email: '',
    password: '',
    role: 0,
    address: '',
    phone: 0,
    cvv: 0,
    card: 0,
  };
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  errorMessage = '';
  isReadOnly = true;
  destroyed = new ReplaySubject<void>();
  destroyedTwo = new ReplaySubject<void>();

  constructor(
    private apiService: ApiService,
    private _formBuilder: FormBuilder
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.updateErrorMessage());
  }

  formGroup = this._formBuilder.group({
    firstCtrl: [this.userInfo.name, Validators.required],
    secondCtrl: [this.userInfo.email, Validators.required],
    thirdCtrl: [this.userInfo.password, Validators.required],
    fourthCtrl: [this.options[this.userInfo.role], Validators.required],
    fifthCtrl: [this.userInfo.address, Validators.required],
    sixthCtrl: [this.userInfo.phone, Validators.required],
  });

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.apiService
        .createData<any>(`users/payment/${user.user._id}`, {
          token: user.token,
        })
        .pipe(takeUntil(this.destroyedTwo))
        .subscribe((response: any) => {
          console.log(response);
          this.userInfo = {
            name: response.user.name,
            email: response.user.email,
            password: response.user.password,
            role: response.user.role,
            address: response.payment && response.payment.address,
            phone: response.payment && response.payment.phone,
          };
          this.formGroup = this._formBuilder.group({
            firstCtrl: [
              { value: this.userInfo.name, disabled: true },
              Validators.required,
            ],
            secondCtrl: [
              { value: this.userInfo.email, disabled: true },
              Validators.required,
            ],
            thirdCtrl: [
              { value: this.userInfo.password, disabled: true },
              Validators.required,
            ],
            fourthCtrl: [
              { value: this.options[this.userInfo.role], disabled: true },
              Validators.required,
            ],
            fifthCtrl: [
              { value: this.userInfo.address, disabled: true },
              Validators.required,
            ],
            sixthCtrl: [
              { value: this.userInfo.phone, disabled: true },
              Validators.required,
            ],
          });
        });
    }
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.destroyedTwo.next();
    this.destroyedTwo.complete();
  }
}
