import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatesData } from 'src/app/models/StatesData.interface';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { HomeModal } from './home.model'
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMessage: string = '';
  countryData: any = null

  subscription!: Subscription;
  homeModal = HomeModal;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.subscription = this.countriesService.getCountry().subscribe(
      (data: string) => {
        $('#loadingmodal').modal('show');
        this.countriesService.getStatesData(data).subscribe(
          (res: StatesData) => {
            const tempData = res.All
            this.countryData = {
              confirmed: tempData.confirmed,
              active: tempData.confirmed - (tempData.recovered + tempData.deaths),
              recovered: tempData.recovered,
              deaths: tempData.deaths,
              population: tempData.population
            }
            $('#loadingmodal').modal('hide');
          }, err => {
            this.errorMessage = err;
            console.log('Errors: ', + this.errorMessage)
            $('#loadingmodal').modal('hide');
            $('#errorModal').modal('show');
          }, () => {
            $('#loadingmodal').modal('hide');
          }
        )
      }, err => {
        this.errorMessage = err;
        console.log('Errors: ', + this.errorMessage)
        $('#errorModal').modal('show');
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

