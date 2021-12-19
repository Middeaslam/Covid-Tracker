import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { States, StatesData } from 'src/app/models/StatesData.interface';
import { CountriesService } from 'src/app/services/countries/countries.service';

declare var $: any;

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  statesData: any = null
  errorMessage: string = '';

  subscription!: Subscription

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.subscription = this.countriesService.getCountry().subscribe(
      (data: string) => {
        $('#loadingmodal').modal('show');
        this.countriesService.getStatesData(data).subscribe(
          (res: StatesData) => {
            let tempData = Object.entries(res)
            this.statesData = tempData.length > 1 ? tempData.slice(1) : null
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
      }, err => {
        this.errorMessage = err;
        console.log('Errors: ', + this.errorMessage);
        $('#loadingmodal').modal('hide');
        $('#errorModal').modal('show');
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
