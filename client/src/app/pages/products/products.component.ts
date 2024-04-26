import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TProduct } from '../../components/cards/product-card/product-card.types';
import { ProductCardComponent } from '../../components/cards/product-card/product-card.component';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    try {
      this.apiService
        .readData<Array<TProduct>>('products')
        .subscribe((response: any) => {
          this.searching = false;
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

  onSearchChange(name: string): void {
    this.searching = true;
    this.productCards = [];
    this.options = [];

    try {
      this.apiService
        .readData<Array<TProduct>>(
          `products?${
            this.selectedType === 'Product' ? 'name' : 'seller'
          }=${name}`
        )
        .subscribe((response: any) => {
          if (response.status == 'Success') {
            this.options = response.products.map(
              (product: TProduct) => product.name
            );
            this.productCards = response.products;
          }
        });
    } catch (error: unknown) {
      this.productCards = [];
      this.options = [];
      this.searching = false;
    }
  }
}
