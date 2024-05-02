import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { LoginComponent } from '../../components/auth/login/login.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { EMPTY, ReplaySubject } from 'rxjs';
import { TProduct } from '../../components/cards/product-card/product-card.types';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    MatDivider,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  options: Array<string> = [];
  navLinks: Array<string> = ['home', 'products', 'basket'];
  navButtons: Array<string> = ['login', 'register'];
  loggedIn: boolean = false;
  isBuyer: boolean = false;
  searching: boolean = false;
  destroyed = new ReplaySubject<void>();
  destroyedTwo = new ReplaySubject<void>();
  destroyedThree = new ReplaySubject<void>();
  destroyedFour = new ReplaySubject<void>();

  @HostListener('window:load')
  onLoad() {
    this.loggedIn = Boolean(localStorage.getItem('user'));
    this.isBuyer = this.loggedIn
      ? Boolean(!JSON.parse(localStorage.getItem('user')!).user.role)
      : false;
    this.navLinks = this.loggedIn
      ? this.isBuyer
        ? ['home', 'products', 'basket']
        : ['home', 'products']
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
        .pipe(
          catchError((error) => {
            this.searching = false;
            this.options = [];
            return EMPTY;
          })
        )
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
    dialogRef.componentInstance.closeDialog
      .pipe(takeUntil(this.destroyedThree))
      .subscribe((response) => {
        // Close the dialog when the event is emitted
        dialogRef.close();
        if (response.token) {
          localStorage.setItem('user', JSON.stringify(response));
          window.location.reload();
        }
      });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyedFour))
      .subscribe((result) => {
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

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.destroyedTwo.next();
    this.destroyedTwo.complete();
    this.destroyedThree.next();
    this.destroyedThree.complete();
    this.destroyedFour.next();
    this.destroyedFour.complete();
  }
}
