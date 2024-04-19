import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { LoginComponent } from '../../components/auth/login/login.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

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
  options: Array<string> = ['One', 'Two', 'Three'];
  navLinks: Array<string> = ['home', 'products', 'sellers', 'basket'];
  navButtons: Array<string> = ['login', 'register'];

  constructor(public dialog: MatDialog) {}

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(
      index ? RegisterComponent : LoginComponent
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
