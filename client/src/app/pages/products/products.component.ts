import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TProduct } from '../../components/cards/product-card/product-card.types';
import { ProductCardComponent } from '../../components/cards/product-card/product-card.component';

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
  productCards: Array<TProduct> = [
    {
      _id: 'ID0',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      seller: 'Seller',
      categories: ['One', 'Two', 'Three'],
      rating: 5,
      price: 199,
      creationDate: new Date(),
      description: 'Description',
    },
    {
      _id: 'ID1',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      seller: 'Seller',
      categories: ['One', 'Two', 'Three'],
      rating: 5,
      price: 199,
      creationDate: new Date(),
      description: 'Description',
    },
    {
      _id: 'ID2',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      seller: 'Seller',
      categories: ['One', 'Two', 'Three'],
      rating: 5,
      price: 199,
      creationDate: new Date(),
      description: 'Description',
    },
    {
      _id: 'ID3',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      seller: 'Seller',
      categories: ['One', 'Two', 'Three'],
      rating: 5,
      price: 199,
      creationDate: new Date(),
      description: 'Description',
    },
    {
      _id: 'ID4',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      seller: 'Seller',
      categories: ['One', 'Two', 'Three'],
      rating: 5,
      price: 199,
      creationDate: new Date(),
      description: 'Description',
    },
    {
      _id: 'ID5',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      seller: 'Seller',
      categories: ['One', 'Two', 'Three'],
      rating: 5,
      price: 199,
      creationDate: new Date(),
      description: 'Description',
    },
  ];
}
