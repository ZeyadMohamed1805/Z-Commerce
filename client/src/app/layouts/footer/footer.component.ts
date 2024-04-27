import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { LoginComponent } from '../../components/auth/login/login.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
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
  searching: boolean = false;

  @HostListener('window:load')
  onLoad() {
    this.loggedIn = Boolean(localStorage.getItem('user'));
  }

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    try {
      this.apiService
        .readData<Array<TProduct>>('products')
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
}
