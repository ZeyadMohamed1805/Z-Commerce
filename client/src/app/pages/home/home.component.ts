import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ProductCardComponent } from '../../components/cards/product-card/product-card.component';
import { SellerCardComponent } from '../../components/cards/seller-card/seller-card.component';
import { TProduct } from '../../components/cards/product-card/product-card.types';
import { TSeller } from '../../components/cards/seller-card/seller-card.types';
import { MatDividerModule } from '@angular/material/divider';
import { ApiService } from '../../services/api/api.service';

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
export class HomeComponent implements OnInit {
  productCards: Array<TProduct> = [];
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
