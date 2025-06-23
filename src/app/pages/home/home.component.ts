import { Component } from '@angular/core';
import { SecondaryButtonComponent } from '../shared/secondary-button/secondary-button.component';
import { PrimaryButtonComponent } from '../shared/primary-button/primary-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SecondaryButtonComponent, PrimaryButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  pageClass = 'home-background';
}
