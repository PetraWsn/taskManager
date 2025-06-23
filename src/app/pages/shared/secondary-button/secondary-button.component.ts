import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secondary-button',
  imports: [NgStyle, CommonModule],
  templateUrl: './secondary-button.component.html',
  styleUrl: './secondary-button.component.scss',
})
export class SecondaryButtonComponent {
  @Input() buttonText: string = 'Klick';
  @Input() textColor: string = '#261292';
  @Input() hoverBorderColor: string = '#261292';
  @Output() buttonClicked = new EventEmitter<void>();
  @Input() type: string = 'button';
  @Input() routerLink?: string;
  @Input() iconSrc?: string | null;

  constructor(private router: Router) {}

  onClick() {
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    } else {
      this.buttonClicked.emit();
    }
  }
}
