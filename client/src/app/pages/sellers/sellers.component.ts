import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SellerCardComponent } from '../../components/cards/seller-card/seller-card.component';
import { TSeller } from '../../components/cards/seller-card/seller-card.types';

@Component({
  selector: 'app-sellers',
  standalone: true,
  imports: [
    CommonModule,
    SellerCardComponent,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatAutocompleteModule,
  ],
  templateUrl: './sellers.component.html',
  styleUrl: './sellers.component.scss',
})
export class SellersComponent {
  options: Array<string> = ['One', 'Two', 'Three'];
  sellers: Array<string> = ['One', 'Two', 'Three'];
  sellerCards: Array<TSeller> = [
    {
      _id: 'ID0',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      rating: 5,
      products: ['One', 'Two', 'Three'],
    },
    {
      _id: 'ID1',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      rating: 5,
      products: ['One', 'Two', 'Three'],
    },
    {
      _id: 'ID2',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      rating: 5,
      products: ['One', 'Two', 'Three'],
    },
    {
      _id: 'ID3',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      rating: 5,
      products: ['One', 'Two', 'Three'],
    },
    {
      _id: 'ID4',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      rating: 5,
      products: ['One', 'Two', 'Three'],
    },
    {
      _id: 'ID5',
      _v: 'V',
      name: 'Name',
      photo: '../../../../assets/images/dark-logo.svg',
      rating: 5,
      products: ['One', 'Two', 'Three'],
    },
  ];
}
