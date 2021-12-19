import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OverAllData, States, Vaccinesdata } from 'src/app/models/VaccineData.interface';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { VaccineTable } from './vaccine.interface';

declare var $: any;

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

  vaccineData: any | null = null
  tableHeader = VaccineTable
  errorMessage: string = '';
  subscription!: Subscription

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.subscription = this.countriesService.getCountry().subscribe(
      (data: string) => {
        this.countriesService.getVaccineData(data).subscribe(
          (res: Vaccinesdata) => {
            this.vaccineData = res.All
            console.log(this.vaccineData)
          }, err => {
            this.errorMessage = err;
            console.log('Errors: ', + this.errorMessage)
            $('#errorModal').modal('show');
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
