import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private getCountriesUrl: string = 'https://covid-api.mmediagroup.fr/v1/cases?country';
  private getVaccineUrl: string = 'https://covid-api.mmediagroup.fr/v1/vaccines';

  constructor(private http: HttpClient) { }

  getCountriesData(): Observable<any> {
    return this.http.get(this.getCountriesUrl).pipe(
      catchError(this.handleError)
    )
  }

  getVaccineData(country: string = 'India'): Observable<any> {
    return this.http.get(`${this.getVaccineUrl}?country=${country}`).pipe(
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
