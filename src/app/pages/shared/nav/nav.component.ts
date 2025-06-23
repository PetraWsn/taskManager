import { Component } from '@angular/core';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [SecondaryButtonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  constructor(private router: Router) {}

  logOutAndGoHome() {
    this.router.navigate(['/home']);
  }
}
