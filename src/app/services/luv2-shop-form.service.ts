import { State } from './../common/state';
import { map } from 'rxjs/operators';
import { Country } from './../common/country';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {
  private countriesUrl = 'http://localhost:7070/api/countries';
  private stateUrl = 'http://localhost:7070/api/states';
  ///search/findByCountryCode?code=US

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStates(theCountryCode: string): Observable<State[]> {
    const searchStatesUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseState>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    )
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    // build an array for "Month" dropdown list
    // - start at current month and loop until
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data); // -> wrap the data as an observable
  }

  getCreditCardYeats(): Observable<number[]> {
    let data: number[] = [];
    // build an array for year downlist list
    // - start at current year and loop for next 10 years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}
interface GetResponseState {
  _embedded: {
    states: State[];
  }
}