import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) {}

  searchCountryByCode(query: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${query}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(query: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/capital/${query}`)
      .pipe(catchError((error) => of([])));
  }

  searchCountry(query: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/name/${query}`)
      .pipe(catchError((error) => of([])));
  }

  searchRegion(query: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/region/${query}`)
      .pipe(catchError((error) => of([])));
  }
}
