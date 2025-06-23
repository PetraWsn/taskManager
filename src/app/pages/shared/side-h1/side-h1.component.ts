import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-h1',
  imports: [],
  templateUrl: './side-h1.component.html',
  styleUrl: './side-h1.component.scss',
})
export class SideH1Component {
  @Input() headerText: string = 'Rubrik'; // standardvärde om inget anges
}
