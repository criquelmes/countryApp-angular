import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountry: {
      term: '',
      countries: [],
    },
    byRegion: {
      region: '',
      countries: [],
    },
  };

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    const cacheStore = localStorage.getItem('cacheStore');
    if (cacheStore) {
      this.cacheStore = JSON.parse(cacheStore);
    }
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }

  searchCountryByCode(query: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${query}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(query: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${query}`).pipe(
      tap(
        (countries) => (this.cacheStore.byCapital = { term: query, countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountry(query: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${query}`).pipe(
      tap(
        (countries) => (this.cacheStore.byCountry = { term: query, countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(query: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${query}`).pipe(
      tap(
        (countries) => (this.cacheStore.byRegion = { region: query, countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }
}
