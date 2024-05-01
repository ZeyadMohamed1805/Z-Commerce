import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
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
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  errorMessage = '';
  destroyed = new ReplaySubject<void>();
  destroyedTwo = new ReplaySubject<void>();
  @Output() closeDialog = new EventEmitter<any>();

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.updateErrorMessage());
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.errorMessage) {
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
