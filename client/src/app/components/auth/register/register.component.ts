import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReplaySubject, merge, takeUntil } from 'rxjs';
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
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(25),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(12),
  ]);
  option = new FormControl(0, [Validators.required]);
  errorMessages = ['', '', '', ''];
  destroyed = new ReplaySubject<void>();
  destroyedTwo = new ReplaySubject<void>();
  destroyedThree = new ReplaySubject<void>();
  destroyedFour = new ReplaySubject<void>();
  destroyedFive = new ReplaySubject<void>();

  @Output() closeDialog = new EventEmitter<any>();

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.updateErrorMessages());
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntil(this.destroyedTwo))
      .subscribe(() => this.updateErrorMessages());
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntil(this.destroyedThree))
      .subscribe(() => this.updateErrorMessages());
    merge(this.option.statusChanges, this.option.valueChanges)
      .pipe(takeUntil(this.destroyedFour))
      .subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    if (this.name.hasError('required')) {
      this.errorMessages[0] = 'You must enter a name';
    } else if (this.name.hasError('minlength')) {
      this.errorMessages[0] = 'Name is too short';
    } else if (this.name.hasError('maxlength')) {
      this.errorMessages[0] = 'Name is too long';
    } else {
      this.errorMessages[0] = '';
    }

    if (this.email.hasError('required')) {
      this.errorMessages[1] = 'You must enter an email';
    } else if (this.email.hasError('pattern')) {
      this.errorMessages[1] = 'Not a valid email';
    } else {
      this.errorMessages[1] = '';
    }

    if (this.password.hasError('required')) {
      this.errorMessages[2] = 'You must enter a password';
    } else if (this.password.hasError('minlength')) {
      this.errorMessages[2] = 'Password is weak';
    } else {
      this.errorMessages[2] = '';
    }

    if (this.option.hasError('required')) {
      this.errorMessages[3] = 'You must choose a role';
    } else {
      this.errorMessages[3] = '';
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.errorMessages.every((message) => message.length === 0)) {
      this.apiService
        .createData<TRegisterUser>('users', {
          name: this.name.value!,
          email: this.email.value!,
          password: this.password.value!,
          role: this.option.value!,
        })
        .pipe(takeUntil(this.destroyedFive))
        .subscribe((response: any) => {
          this.openSnackBar('Registration was successful!', 'Close');
          this.closeDialog.emit(response);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.destroyedTwo.next();
    this.destroyedTwo.complete();
    this.destroyedThree.next();
    this.destroyedThree.complete();
    this.destroyedFour.next();
    this.destroyedFour.complete();
    this.destroyedFive.next();
    this.destroyedFive.complete();
  }
}
