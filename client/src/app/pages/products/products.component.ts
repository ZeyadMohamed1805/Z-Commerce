import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TProduct } from '../../components/cards/product-card/product-card.types';
import { ProductCardComponent } from '../../components/cards/product-card/product-card.component';
import { ApiService } from '../../services/api/api.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { EMPTY, ReplaySubject, Subject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatAutocompleteModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  searching: boolean = true;
  options: Array<string> = [];
  types: Array<string> = ['Product', 'Seller'];
  selectedType: string = this.types[0];
  productCards: Array<TProduct> = [];
  category: string = '';
  product: string = '';
  categories: Array<string> = [];
  destroyed = new Subject<void>();
  destroyedTwo = new Subject<void>();
  destroyedThree = new Subject<void>();
  destroyedFour = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.category = params.get('category') || '';
      this.product =
        params.get('name') || this.product.length ? this.product : '';

      try {
        this.apiService
          .readData<Array<TProduct>>(
            `products?name=${this.product}&category=${this.category}&limit=12`
          )
          .pipe(takeUntil(this.destroyed))
          .subscribe((response: any) => {
            this.options = response.products.map(
              (product: TProduct) => product.name
            );
            this.productCards = response.products;
          });
      } catch (error: unknown) {
        this.searching = false;
        error instanceof Error && console.log(error);
      }
    });

    try {
      this.apiService
        .readData<Array<TProduct>>(
          `products?name=${this.product}&category=${this.category}&limit=12`
        )
        .pipe(takeUntil(this.destroyedTwo))
        .subscribe((response: any) => {
          this.options = response.products.map(
            (product: TProduct) => product.name
          );
          this.productCards = response.products;
        });
    } catch (error: unknown) {
      this.searching = false;
      error instanceof Error && console.log(error);
    }
  }

  onSearchChange(name: string, type: string): void {
    this.searching = true;

    try {
      this.apiService
        .readData<Array<TProduct>>(
          `products?${
            this.selectedType === 'Product' ? 'name' : 'seller'
          }=${name}&category=${this.category}&limit=12`
        )
        .pipe(
          catchError((error) => {
            this.searching = false;
            this.options = [];
            this.productCards = [];
            return EMPTY;
          }),
          takeUntil(this.destroyedThree)
        )
        .subscribe((response: any) => {
          if (type === 'Product') {
            this.options = response.products.map(
              (product: TProduct) => product.name
            );
          } else {
            this.options = response.products.map(
              (product: TProduct) => product.seller.name
            );
          }
          this.productCards = response.products;
          this.searching = false;
        });
    } catch (error: unknown) {
      this.productCards = [];
      this.options = [];
      this.searching = false;
    }
  }

  onTypeChange(type: string) {
    this.options = this.productCards.map((product) =>
      type === 'Product' ? product.name : product.seller.name
    );
  }

  onPageClick(event: any) {
    console.log(event);
    this.searching = true;

    try {
      this.apiService
        .readData<Array<TProduct>>(
          `products?${this.selectedType === 'Product' ? 'name' : 'seller'}=${
            this.product
          }&category=${this.category}&page=${event.pageIndex + 1}&limit=12`
        )
        .pipe(
          catchError((error) => {
            this.searching = false;
            this.options = [];
            this.productCards = [];
            return EMPTY;
          }),
          takeUntil(this.destroyedFour)
        )
        .subscribe((response: any) => {
          if (this.selectedType === 'Product') {
            this.options = response.products.map(
              (product: TProduct) => product.name
            );
          } else {
            this.options = response.products.map(
              (product: TProduct) => product.seller.name
            );
          }
          this.productCards = response.products;
          this.searching = false;
        });
    } catch (error: unknown) {
      this.productCards = [];
      this.options = [];
      this.searching = false;
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
  }
}
