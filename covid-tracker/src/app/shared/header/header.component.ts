import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/CountriesData.interface';
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
    $('#loadingmodal').modal('show');
    this.countriesService.getCountriesData().subscribe(
      (res: Country) => {
        this.countries = Object.keys(res);
        $('#loadingmodal').modal('hide');
      }, err => {
        this.errorMessage = err;
        console.log('Errors: ', + this.errorMessage);
        $('#loadingmodal').modal('hide');
        $('#errorModal').modal('show');
      }, () => {
        $('#loadingmodal').modal('hide');
      }
    )
  }

  selectCountry(country: string) {
    this.selectedCountry = country
    this.countriesService.setCountry(country)
  }

}
