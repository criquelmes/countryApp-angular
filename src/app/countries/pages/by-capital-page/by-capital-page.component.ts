import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  standalone: false,

  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}
  searchByCapital(onValue: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(onValue).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
