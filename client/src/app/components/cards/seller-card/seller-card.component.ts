import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TSeller } from './seller-card.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './seller-card.component.html',
  styleUrl: './seller-card.component.scss',
})
export class SellerCardComponent {
  @Input() details: TSeller = {
    _id: 'ID',
    name: 'Name',
    photo: '../../../../assets/images/light-logo.svg',
    products: ['One', 'Two', 'Three'],
    rating: 5,
    _v: 'Version',
  };
}
