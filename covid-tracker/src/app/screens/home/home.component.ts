import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries/countries.service';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMessage: string = '';
  countryData: any = null

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getStatesData().subscribe(
      (res: any) => {
        this.countryData = res.All
        console.log(this.countryData)
      }, err => {
        this.errorMessage = err;
        console.log('Errors: ', + this.errorMessage)
        $('#errorModal').modal('show');
      }
    )
  }
}

