import { Component, HostListener, OnInit } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ProductCardComponent } from '../../components/cards/product-card/product-card.component';
import { SellerCardComponent } from '../../components/cards/seller-card/seller-card.component';
import { TProduct } from '../../components/cards/product-card/product-card.types';
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
  newestCards: Array<TProduct> = [];
  mostLovedCards: Array<TProduct> = [];
  @HostListener('window:load', [])
  onLoad() {
    !localStorage.getItem('cart') &&
      localStorage.setItem('cart', JSON.stringify([]));
    !localStorage.getItem('wishlist') &&
      localStorage.setItem('wishlist', JSON.stringify([]));
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    try {
      this.apiService
        .readData<Array<TProduct>>('products/newest')
        .subscribe((response: any) => {
          this.newestCards = response.products;
        });
    } catch (error: unknown) {
      error instanceof Error && console.log(error);
    }

    try {
      this.apiService
        .readData<Array<TProduct>>('products/most-loved')
        .subscribe((response: any) => {
          this.mostLovedCards = response.products;
        });
    } catch (error: unknown) {
      error instanceof Error && console.log(error);
    }
  }
}
