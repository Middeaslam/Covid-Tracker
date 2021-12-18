import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries/countries.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  countries: string[] = []
  selectedCountry: string = 'India'

  errorMessage: string = '';

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getCountriesData().subscribe(
      (res: any) => {
        this.countries = Object.keys(res)
      }, err => {
        this.errorMessage = err;
        console.log('Errors: ', + this.errorMessage)
        $('#errorModal').modal('show');
      }
    )
  }

  selectCountry(country: string) {
    this.selectedCountry = country
  }

}
