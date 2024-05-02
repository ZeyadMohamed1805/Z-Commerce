import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatSelectModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  displayedColumns: string[] = ['product', 'price', 'state', 'cart'];
  @Input() ELEMENT_DATA: Array<any> = JSON.parse(
    localStorage.getItem('wishlist')!
  );
  @Output() eventEmitter = new EventEmitter();
  dataSource = this.ELEMENT_DATA;

  onMoveToCart(element: any) {
    this.eventEmitter.emit(element);
  }
}
