import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    RouterLink,
    MatAutocompleteModule,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navLinks: Array<string> = ['home', 'products', 'sellers'];
  navButtons: Array<string> = ['login', 'register'];
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  isShowing: boolean = false;
  showSubSubMenu: boolean = false;
  options: Array<string> = ['One', 'Two', 'Three'];

  expand() {
    this.isExpanded = !this.isExpanded;
  }
}
