import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { ApiService } from '../../services/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class InventoryComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity'];
  amounts: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  options: Array<string> = ['Buyer', 'Seller'];
  categories: Array<any> = [
    { _id: 0, name: 'One' },
    { _id: 1, name: 'Two' },
    { _id: 2, name: 'Three' },
  ];
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  errorMessage = '';
  addProductInfo = {
    name: '',
    price: null,
    quantity: null,
    images: null,
    description: '',
    creationDate: new Date(),
    categories: [],
    seller: {},
  };

  constructor(
    private apiService: ApiService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.apiService.readData<any>('categories').subscribe((response: any) => {
      console.log(response);
      this.categories = response.categories
        .filter((category: any) => !category.subcategories.length)
        .map((category: any) => ({ _id: category._id, name: category.name }));
    });
    this.apiService
      .createData<any>(`products/inventory/${user.user._id}`, {
        token: user.token,
      })
      .subscribe((response: any) => {
        console.log(response);
        this.ELEMENT_DATA = response.products.map((product: any) => ({
          product: { image: product.images[0] || '', name: product.name },
          price: product.price,
          quantity: product.quantity,
        }));
        this.dataSource = this.ELEMENT_DATA;
      });
    console.log(this.categories);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
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

  onFileSelected(event: any) {
    this.addProductInfo.images = event.target.files[0];
    console.log(event.target.files[0]);
    console.log(this.addProductInfo.images);
  }

  addProduct() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.apiService
      .createDataWithFile(
        `products/${user.user._id}`,
        {
          name: this.formGroup.value.firstCtrl,
          price: this.formGroup.value.secondCtrl,
          quantity: this.formGroup.value.thirdCtrl,
          description: this.formGroup.value.fifthCtrl,
          categories: this.formGroup.value.sixthCtrl,
          creationDate: new Date(),
        },
        this.addProductInfo.images!
      )
      .subscribe((response) => {
        console.log(response);
        this.openSnackBar('Product created successfully!', 'Close');
        this.addProductInfo = {
          name: '',
          price: null,
          quantity: null,
          images: null,
          description: '',
          creationDate: new Date(),
          categories: [],
          seller: {},
        };
      });
  }

  formGroup = this._formBuilder.group({
    firstCtrl: [this.addProductInfo.name, Validators.required],
    secondCtrl: [this.addProductInfo.price, Validators.required],
    thirdCtrl: [this.addProductInfo.quantity, Validators.required],
    fifthCtrl: [this.addProductInfo.description, Validators.required],
    sixthCtrl: [this.addProductInfo.categories, Validators.required],
  });
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
