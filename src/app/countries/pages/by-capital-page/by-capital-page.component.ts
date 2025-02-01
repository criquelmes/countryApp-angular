import { Component } from '@angular/core';

@Component({
  selector: 'countries-by-capital-page',
  standalone: false,

  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent {
  searchByCapital(onValue: string): void {
    console.log('Searching by capital...');
    console.log(onValue);
  }
}
