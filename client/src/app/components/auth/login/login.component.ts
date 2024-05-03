import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReplaySubject, merge, takeUntil } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { TLoginUser } from './login.types';
import { ApiService } from '../../../services/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatDivider,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(12),
  ]);
  hide = true;
  emailErrorMessage = '';
  passwordErrorMessage = '';
  destroyed = new ReplaySubject<void>();
  destroyedTwo = new ReplaySubject<void>();
  @Output() closeDialog = new EventEmitter<any>();

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.updateErrorMessages());
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntil(this.destroyedTwo))
      .subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage = 'You must enter an email';
    } else if (this.email.hasError('pattern')) {
      this.emailErrorMessage = 'Not a valid email';
    } else {
      this.emailErrorMessage = '';
    }

    if (this.password.hasError('required')) {
      this.passwordErrorMessage = 'You must enter a password';
    } else if (this.password.hasError('minlength')) {
      this.passwordErrorMessage = 'Password is weak';
    } else {
      this.passwordErrorMessage = '';
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.emailErrorMessage && !this.passwordErrorMessage) {
      this.apiService
        .createData<TLoginUser>('users/login', {
          email: this.email.value!,
          password: this.password.value!,
        })
        .pipe(takeUntil(this.destroyedTwo))
        .subscribe((response: any) => {
          this.openSnackBar('Login was successful!', 'Close');
          this.closeDialog.emit(response);
        });
    }
    console.log(this.email.value, this.password.value);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.destroyedTwo.next();
    this.destroyedTwo.complete();
  }
}
