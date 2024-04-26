import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class CarouselComponent implements OnInit {
  items: string[] = [
    '../../../assets/images/carousel-two.svg',
    '../../../assets/images/carousel-one.svg',
    '../../../assets/images/carousel-three.svg',
    '../../../assets/images/carousel-five.svg',
  ];
  currentSlide = 0;
  interval: any = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.interval = setInterval(() => this.onNextClick(), 5000);
    }
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.items.length - 1 : previous;
    clearInterval(this.interval);
    this.interval = setInterval(() => this.onNextClick(), 5000);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.items.length ? 0 : next;
    clearInterval(this.interval);
    this.interval = setInterval(() => this.onNextClick(), 5000);
  }
}
