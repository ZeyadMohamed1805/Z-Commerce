import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIcon } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../components/auth/login/login.component';
import { RegisterComponent } from '../../components/auth/register/register.component';

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
    MatBadgeModule,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navLinks: Array<string> = ['home', 'products', 'sellers', 'basket'];
  navButtons: Array<string> = ['login', 'register'];
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  isShowing: boolean = false;
  showSubSubMenu: boolean = false;
  options: Array<string> = ['One', 'Two', 'Three'];

  constructor(public dialog: MatDialog) {}

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(
      index ? RegisterComponent : LoginComponent
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  expand() {
    this.isExpanded = !this.isExpanded;
  }
}
