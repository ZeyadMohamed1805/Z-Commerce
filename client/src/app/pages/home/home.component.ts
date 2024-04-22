import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ProductCardComponent } from '../../components/cards/product-card/product-card.component';
import { SellerCardComponent } from '../../components/cards/seller-card/seller-card.component';
import { TProduct } from '../../components/cards/product-card/product-card.types';
import { TSeller } from '../../components/cards/seller-card/seller-card.types';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    ProductCardComponent,
    SellerCardComponent,
    MatDividerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  productCards: Array<TProduct> = [
    {
      _id: 'ID0',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/light-logo.svg',
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
      photo: '../../../../assets/images/light-logo.svg',
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
      photo: '../../../../assets/images/light-logo.svg',
      seller: 'Seller',
      categories: ['One', 'Two', 'Three'],
      rating: 5,
      price: 199,
      creationDate: new Date(),
      description: 'Description',
    },
  ];
  sellerCards: Array<TSeller> = [
    {
      _id: 'ID0',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/light-logo.svg',
      rating: 5,
      products: ['One', 'Two', 'Three'],
    },
    {
      _id: 'ID1',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/light-logo.svg',
      rating: 5,
      products: ['One', 'Two', 'Three'],
    },
    {
      _id: 'ID2',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/light-logo.svg',
      rating: 5,
      products: ['One', 'Two', 'Three'],
    },
  ];
}
