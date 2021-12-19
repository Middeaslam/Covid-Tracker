import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

import { StatesData } from 'src/app/models/StatesData.interface';
import { Country } from 'src/app/models/CountriesData.interface';
import { Vaccinesdata } from 'src/app/models/VaccineData.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private getCountriesUrl: string = 'https://covid-api.mmediagroup.fr/v1/cases?country';
  private getVaccineUrl: string = 'https://covid-api.mmediagroup.fr/v1/vaccines';
  private getStatesUrl: string = 'https://covid-api.mmediagroup.fr/v1/cases'

  private countrySubject: BehaviorSubject<string> = new BehaviorSubject<string>('India')

  constructor(private http: HttpClient) { }

  setCountry(country: string) {
    this.countrySubject.next(country)
  }

  getCountry(): Observable<string> {
    return this.countrySubject.asObservable();
  }

  getCountriesData(): Observable<Country> {
    return this.http.get<Country>(this.getCountriesUrl).pipe(
      catchError(this.handleError)
    )
  }

  getVaccineData(country: string): Observable<Vaccinesdata> {
    return this.http.get<Vaccinesdata>(`${this.getVaccineUrl}?country=${country}`).pipe(
      catchError(this.handleError)
    )
  }

  getStatesData(country: string): Observable<StatesData> {
    return this.http.get<StatesData>(`${this.getStatesUrl}?country=${country}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`
    } else {
      errorMessage = `Server Returned Code: ${err.status}, Error Message is: ${err.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
