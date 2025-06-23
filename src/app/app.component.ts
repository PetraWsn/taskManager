import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { NavComponent } from './pages/shared/nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'taskManager';

  currentPageClass = '';

  onActivate(componentRef: any) {
    // Läs en egenskap från komponenten, t.ex. componentRef.pageClass
    this.currentPageClass = componentRef.pageClass || '';
  }
}
