import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

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
export class CategoriesComponent {
  isExpanded: boolean = true;
  showSubmenu: boolean = false;
  isShowing: boolean = true;
  showSubSubMenu: boolean = false;

  constructor(private router: Router) {}

  @HostListener('window:load', [])
  onLoad() {
    if (window.innerWidth >= 800) {
      this.isExpanded = true;
      this.isShowing = true;
    } else {
      this.isExpanded = false;
      this.isShowing = false;
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth >= 800) {
      this.isExpanded = true;
      this.isShowing = true;
    } else {
      this.isExpanded = false;
      this.isShowing = false;
    }
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
}
