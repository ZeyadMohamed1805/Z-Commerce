import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIcon,
    MatDivider,
    MatTabsModule,
    MatBadgeModule,
    MatExpansionModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  panelOpenState = false;
  displayedColumns: string[] = ['product', 'price', 'quantity'];
  amounts: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  options: Array<string> = ['Buyer', 'Seller'];
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  errorMessage = '';

  constructor() {
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
  ELEMENT_DATA: Array<{
    product: { image: string; name: string };
    price: number;
    quantity: number;
  }> = [
    {
      product: { image: '../../../assets/images/light-logo.svg', name: 'Name' },
      price: 250,
      quantity: 0,
    },
    {
      product: { image: '../../../assets/images/light-logo.svg', name: 'Name' },
      price: 250,
      quantity: 0,
    },
    {
      product: { image: '../../../assets/images/light-logo.svg', name: 'Name' },
      price: 250,
      quantity: 0,
    },
  ];
  dataSource = this.ELEMENT_DATA;
}
