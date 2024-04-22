import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { fadeIn, fadeOut } from './carousel.animations';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        useAnimation(fadeIn, { params: { time: '500ms' } }),
      ]),
      transition('* => void', [
        useAnimation(fadeOut, { params: { time: '500ms' } }),
      ]),
    ]),
  ],
})
export class CarouselComponent {
  items: string[] = [
    '../../../assets/images/light-logo.svg',
    '../../../assets/images/dark-logo.svg',
  ];
  currentSlide = 0;

  constructor() {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.items.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.items.length ? 0 : next;
  }
}
