import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { ApiService } from '../../services/api/api.service';
import { TCategory } from './categories.types';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories: Array<TCategory> = [];
  isExpanded: boolean = true;
  loadingCount: number = 4;
  showSubmenu: Array<boolean> = [false, false, false, false];
  isShowing: boolean = true;
  showSubSubMenu: Array<boolean> = [false, false, false, false];
  destroyed = new ReplaySubject<void>();

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    try {
      this.apiService
        .readData<Array<TCategory>>('categories')
        .pipe(takeUntil(this.destroyed))
        .subscribe((response: any) => {
          this.categories = response.categories;
        });
    } catch (error: unknown) {
      error instanceof Error && console.log(error);
    }
  }

  @HostListener('window:load', [])
  onLoad() {
    if (window.innerWidth >= 800) {
      this.isExpanded = true;
      this.isShowing = true;
      this.loadingCount = 4;
    } else {
      this.isExpanded = false;
      this.isShowing = false;
      this.loadingCount = 1;
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth >= 800) {
      this.isExpanded = true;
      this.isShowing = true;
      this.loadingCount = 4;
    } else {
      this.isExpanded = false;
      this.isShowing = false;
      this.loadingCount = 1;
    }
  }

  onCategoryClick(category?: string) {
    this.router.navigateByUrl(
      category ? `products?category=${category}` : 'products'
    );
  }

  routerPage(): boolean {
    return (
      this.router.url.includes('basket') ||
      this.router.url.includes('checkout') ||
      this.router.url.includes('account')
    );
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
