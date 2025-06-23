import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primary-button',
  imports: [NgStyle],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
})
export class PrimaryButtonComponent {
  @Input() buttonText: string = 'Click me'; // standardvärde om inget anges
  @Input() textColor: string = '#FFFFFF'; // standardfärg vit
  @Input() hoverBorderColor: string = '#FFFFFF'; // standardfärg  vit
  @Output() buttonClicked = new EventEmitter<void>();
  @Input() type: string = 'button';
  @Input() routerLink?: string;

  constructor(private router: Router) {}

  onClick() {
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    } else {
      this.buttonClicked.emit();
    }
  }
}
