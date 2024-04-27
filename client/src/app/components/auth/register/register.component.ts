import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api/api.service';
import { TRegisterUser } from './register.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIcon,
    MatDivider,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  options: Array<string> = ['buyer', 'seller'];
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  option = new FormControl(0, [Validators.required]);
  hide = true;
  errorMessage = '';

  @Output() closeDialog = new EventEmitter<boolean>();

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
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

  register(event: Event) {
    event.preventDefault();
    if (!this.errorMessage) {
      this.apiService
        .createData<TRegisterUser>('users', {
          name: this.name.value!,
          email: this.email.value!,
          password: this.password.value!,
          role: this.option.value!,
        })
        .subscribe((response: any) => {
          this.openSnackBar('Registration was successful!', 'Close');
          this.closeDialog.emit(true);
        });
    }
  }
}
