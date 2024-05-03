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
import { ReplaySubject, merge, takeUntil } from 'rxjs';
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
  isLoading = false;
  panelOpenState = false;
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity'];
  amounts: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  name = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  price = new FormControl('', [Validators.required, Validators.max(5000)]);
  quantity = new FormControl('', [Validators.required, Validators.max(100)]);
  description = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(50),
  ]);
  category = new FormControl('', [Validators.required]);
  errorMessages = ['', '', '', '', ''];
  options: Array<string> = ['Buyer', 'Seller'];
  categories: Array<any> = [
    { _id: 0, name: 'One' },
    { _id: 1, name: 'Two' },
    { _id: 2, name: 'Three' },
  ];
  email = new FormControl('', [Validators.required, Validators.email]);
  image: string = '../../../assets/images/default-product.png';
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
  destroyed = new ReplaySubject<void>();
  destroyedTwo = new ReplaySubject<void>();
  destroyedThree = new ReplaySubject<void>();
  destroyedFour = new ReplaySubject<void>();
  destroyedFive = new ReplaySubject<void>();

  constructor(
    private apiService: ApiService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => this.updateErrorMessages());
    merge(this.price.statusChanges, this.price.valueChanges)
      .pipe(takeUntil(this.destroyedTwo))
      .subscribe(() => this.updateErrorMessages());
    merge(this.quantity.statusChanges, this.quantity.valueChanges)
      .pipe(takeUntil(this.destroyedThree))
      .subscribe(() => this.updateErrorMessages());
    merge(this.description.statusChanges, this.description.valueChanges)
      .pipe(takeUntil(this.destroyedThree))
      .subscribe(() => this.updateErrorMessages());
    merge(this.category.statusChanges, this.category.valueChanges)
      .pipe(takeUntil(this.destroyedThree))
      .subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    if (this.name.hasError('required')) {
      this.errorMessages[0] = 'You must enter a name';
    } else if (this.name.hasError('maxlength')) {
      this.errorMessages[0] = 'Name is too long';
    } else {
      this.errorMessages[0] = '';
    }

    if (this.price.hasError('required')) {
      this.errorMessages[1] = 'You must enter a price';
    } else if (this.price.hasError('max')) {
      this.errorMessages[1] = 'Price must be less than 5000';
    } else {
      this.errorMessages[1] = '';
    }

    if (this.quantity.hasError('required')) {
      this.errorMessages[2] = 'You must enter a quantity';
    } else if (this.quantity.hasError('max')) {
      this.errorMessages[2] = 'Quantity must be less than 100';
    } else {
      this.errorMessages[2] = '';
    }

    if (this.description.hasError('required')) {
      this.errorMessages[3] = 'You must enter a description';
    } else if (this.description.hasError('minlength')) {
      this.errorMessages[3] = 'Description is too short';
    } else if (this.description.hasError('maxlength')) {
      this.errorMessages[3] = 'Description is too long';
    } else {
      this.errorMessages[3] = '';
    }

    if (this.category.hasError('required')) {
      this.errorMessages[4] = 'You must choose a category';
    } else {
      this.errorMessages[4] = '';
    }
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.apiService
      .readData<any>('categories')
      .pipe(takeUntil(this.destroyedTwo))
      .subscribe((response: any) => {
        console.log(response);
        this.categories = response.categories
          .filter((category: any) => !category.subcategories.length)
          .map((category: any) => ({ _id: category._id, name: category.name }));
      });
    this.apiService
      .createData<any>(`products/inventory/${user.user._id}`, {
        token: user.token,
      })
      .pipe(takeUntil(this.destroyedThree))
      .subscribe((response: any) => {
        console.log(response);
        this.ELEMENT_DATA = response.products.map((product: any) => ({
          id: product._id,
          product: { image: product.images[0] || '', name: product.name },
          price: product.price,
          quantity: product.quantity,
        }));
        this.dataSource = this.ELEMENT_DATA;
        this.updateFormGroups = response.products.map((product: any) =>
          this._formBuilder.group({
            firstCtrl: [
              product.name,
              [Validators.required, Validators.maxLength(15)],
            ],
            secondCtrl: [
              product.price,
              [Validators.required, Validators.max(5000)],
            ],
            thirdCtrl: [
              product.quantity,
              [Validators.required, Validators.max(100)],
            ],
            fifthCtrl: [
              product.description,
              [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(50),
              ],
            ],
          })
        );
      });
    console.log(this.categories);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  onFileSelected(event: any) {
    this.addProductInfo.images = event.target.files[0];
    this.image = URL.createObjectURL(event.target.files[0]);
  }

  addProduct() {
    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem('user')!);
    if (
      user &&
      !this.name.invalid &&
      !this.price.invalid &&
      !this.quantity.invalid &&
      !this.description.invalid &&
      !this.category.invalid
    ) {
      this.apiService
        .createDataWithFile(
          `products/${user.user._id}`,
          {
            name: this.name.value,
            price: this.price.value,
            quantity: this.quantity.value,
            description: this.description.value,
            categories: this.category.value,
          },
          this.addProductInfo.images!
        )
        .pipe(takeUntil(this.destroyedFour))
        .subscribe((response) => {
          console.log(response);
          this.openSnackBar('Product created successfully!', 'Close');
          this.name.reset();
          this.price.reset();
          this.quantity.reset();
          this.description.reset();
          this.category.reset();
          this.errorMessages = ['', '', '', '', ''];
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
          this.isLoading = false;
        });
    }
  }

  updateProduct(id: string, index: number) {
    // console.log(id, this.updateFormGroups[index].controls.firstCtrl.errors);
    const user = JSON.parse(localStorage.getItem('user')!);
    if (
      user &&
      !this.updateFormGroups[index].controls.firstCtrl.errors &&
      !this.updateFormGroups[index].controls.secondCtrl.errors &&
      !this.updateFormGroups[index].controls.thirdCtrl.errors &&
      !this.updateFormGroups[index].controls.fifthCtrl.errors
    ) {
      this.apiService
        .updateData<any>(`products/${id}`, {
          product: {
            name: this.updateFormGroups[index].value.firstCtrl,
            price: this.updateFormGroups[index].value.secondCtrl,
            quantity: this.updateFormGroups[index].value.thirdCtrl,
            description: this.updateFormGroups[index].value.fifthCtrl,
          },
          token: user.token,
        })
        .pipe(takeUntil(this.destroyedFive))
        .subscribe((response) => {
          console.log(response);
          this.openSnackBar('Product updated successfully!', 'Close');
        });
    }
  }

  deleteProduct(id: string, index: number) {
    console.log(id, this.updateFormGroups[index].value);
    this.apiService
      .deleteData<any>(`products/${id}`)
      .pipe(takeUntil(this.destroyedFive))
      .subscribe((response) => {
        console.log(response);
        this.openSnackBar('Product deleted successfully!', 'Close');
        this.updateFormGroups.splice(index, 1);
        this.ELEMENT_DATA.splice(index, 1);
        this.dataSource = this.ELEMENT_DATA;
      });
  }

  formGroup = this._formBuilder.group({
    firstCtrl: [this.addProductInfo.name, Validators.required],
    secondCtrl: [this.addProductInfo.price, Validators.required],
    thirdCtrl: [this.addProductInfo.quantity, Validators.required],
    fifthCtrl: [this.addProductInfo.description, Validators.required],
    sixthCtrl: [this.addProductInfo.categories, Validators.required],
  });

  updateFormGroups: any = [];
  ELEMENT_DATA: Array<any> = [];
  dataSource = this.ELEMENT_DATA;

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
