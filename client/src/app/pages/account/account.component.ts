import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileComponent } from '../../components/profile/profile.component';
import { InventoryComponent } from '../../components/inventory/inventory.component';
import { OrdersComponent } from '../../components/orders/orders.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ProfileComponent,
    InventoryComponent,
    OrdersComponent,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  role = JSON.parse(localStorage.getItem('user')!).user.role;
}
