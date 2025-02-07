import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  standalone: false,

  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService
  ) {}
  countryName: string | null = null;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.countriesService.searchCountryByCode(id).subscribe((country) => {
        console.log({ country });
        // this.countryName = country[0].name.common;
        // this.fetchCountryDetails(this.countryName);
      });
    });
  }

  fetchCountryDetails(countryName: string): void {
    // Implement the logic to fetch country details here
    console.log(`Fetching details for ${countryName}`);
  }
}
