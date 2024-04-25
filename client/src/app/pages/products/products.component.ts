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
  options: Array<string> = ['One', 'Two', 'Three'];
  products: Array<string> = ['One', 'Two', 'Three'];
  productCards: Array<TProduct> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    try {
      this.apiService
        .readData<Array<TProduct>>('products')
        .subscribe((response: any) => {
          this.productCards = response.products;
        });
    } catch (error: unknown) {
      error instanceof Error && console.log(error);
    }
  }
}
