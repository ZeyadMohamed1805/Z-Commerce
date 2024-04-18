import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
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
  navLinks: Array<string> = ['home', 'products', 'sellers'];
  navButtons: Array<string> = ['login', 'register'];
}
