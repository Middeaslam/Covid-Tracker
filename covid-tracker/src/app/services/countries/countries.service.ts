import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountriesData() {
    return this.http.get('https://covid-api.mmediagroup.fr/v1/cases?country').pipe(
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
