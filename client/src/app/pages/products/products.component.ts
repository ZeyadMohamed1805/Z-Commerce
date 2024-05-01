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
  searching: boolean = false;
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

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.product = activatedRoute.snapshot.queryParamMap.get('name') || '';
    this.category = activatedRoute.snapshot.queryParamMap.get('category') || '';
  }

  ngOnInit(): void {
    try {
      this.apiService
        .readData<Array<TProduct>>(
          `products?name=${this.product}&category=${this.category}`
        )
        .pipe(takeUntil(this.destroyed))
        .subscribe((response: any) => {
          this.options = response.products.map(
            (product: TProduct) => product.name
          );
          this.productCards = response.products;
        });

      this.apiService
        .readData<any>('categories')
        .pipe(takeUntil(this.destroyedTwo))
        .subscribe((response: any) => {
          this.categories = response.categories
            .filter((category: any) => !category.subcategories.length)
            .map((category: any) => category.name);
          this.categories.unshift('All');
        });
    } catch (error: unknown) {
      this.searching = false;
      error instanceof Error && console.log(error);
    }
  }

  onSearchChange(name: string, type: string, category: string): void {
    this.searching = true;

    try {
      this.apiService
        .readData<Array<TProduct>>(
          `products?${
            this.selectedType === 'Product' ? 'name' : 'seller'
          }=${name}&category=${category === 'All' ? '' : category}`
        )
        .pipe(
          catchError((error) => {
            this.searching = false;
            this.options = [];
            this.productCards = [];
            return EMPTY;
          })
        )
        .pipe(takeUntil(this.destroyedThree))
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

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.destroyedTwo.next();
    this.destroyedTwo.complete();
    this.destroyedThree.next();
    this.destroyedThree.complete();
  }
}
