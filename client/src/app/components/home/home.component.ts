import { Component } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoriesComponent, MatSidenavContainer],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
