import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-list',
  standalone: true,
  imports: [],
  templateUrl: './header-list.component.html',
  styleUrl: './header-list.component.scss',
})
export class HeaderListComponent {
  @Input() text: string = '';
}
