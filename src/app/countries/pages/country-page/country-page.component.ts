import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  standalone: false,

  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
})
export class CountryPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}
  countryName: string | null = null;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCountryByCode(id))
      )
      .subscribe((country) => {
        if (!country) {
          this.router.navigate(['/countries']);
          return;
        }

        console.log('tenemos un pais');
      });
  }

  fetchCountryDetails(countryName: string): void {
    // Implement the logic to fetch country details here
    console.log(`Fetching details for ${countryName}`);
  }
}
