import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIcon } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../../components/auth/login/login.component';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { ApiService } from '../../services/api/api.service';
import { TProduct } from '../../components/cards/product-card/product-card.types';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

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
export class HeaderComponent implements OnInit {
  navLinks: Array<string> = [];
  navButtons: Array<string> = ['login', 'register'];
  isExpanded: boolean = false;
  loggedIn: boolean = false;
  isBuyer: boolean = false;
  showSubmenu: boolean = false;
  isShowing: boolean = false;
  showSubSubMenu: boolean = false;
  options: Array<string> = [];
  searching: boolean = false;
  destroyed = new ReplaySubject<void>();
  destroyedTwo = new ReplaySubject<void>();

  @HostListener('window:load')
  onLoad() {
    this.loggedIn = Boolean(localStorage.getItem('user'));
    this.isBuyer = this.loggedIn
      ? Boolean(!JSON.parse(localStorage.getItem('user')!).user.role)
      : false;
    this.navLinks = this.loggedIn
      ? this.isBuyer
        ? ['home', 'products', 'basket', 'account']
        : ['home', 'products', 'account']
      : ['home', 'products', 'basket'];
  }

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.apiService
        .readData<Array<TProduct>>('products')
        .pipe(takeUntil(this.destroyed))
        .subscribe((response: any) => {
          this.searching = false;
          this.options = response.products.map(
            (product: TProduct) => product.name
          );
        });
    } catch (error: unknown) {
      this.searching = false;
      error instanceof Error && console.log(error);
    }
  }

  onSearchChange(name: string): void {
    this.searching = true;

    try {
      this.apiService
        .readData<Array<TProduct>>(`products?name=${name}`)
        .pipe(takeUntil(this.destroyedTwo))
        .subscribe((response: any) => {
          if (response.status == 'Success') {
            this.options = response.products.map(
              (product: TProduct) => product.name
            );
            this.searching = false;
          }
        });
    } catch (error: unknown) {
      this.options = [];
      this.searching = false;
    }
  }

  onSearchSubmit(product: string) {
    this.router.navigateByUrl(`products?name=${product}`);
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open<RegisterComponent | LoginComponent>(
      index ? RegisterComponent : LoginComponent
    );

    // Subscribe to the close event emitted by the dialog component
    dialogRef.componentInstance.closeDialog.subscribe((response) => {
      // Close the dialog when the event is emitted
      dialogRef.close();
      if (response.token) {
        localStorage.setItem('user', JSON.stringify(response));
        window.location.reload();
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  closeDialog(close: boolean) {
    console.log('close!');

    this.dialog.closeAll();
  }

  logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }

  expand() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.destroyedTwo.next();
    this.destroyedTwo.complete();
  }
}
