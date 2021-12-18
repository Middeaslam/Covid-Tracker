import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { VaccineTable } from './vaccine.interface';

declare var $: any;

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

  vaccineData: any = null
  tableHeader = VaccineTable
  errorMessage: string = '';

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getVaccineData().subscribe(
      (res: any) => {
        this.vaccineData = res.All
        console.log(res.All)
      }, err => {
        this.errorMessage = err;
        console.log('Errors: ', + this.errorMessage)
        $('#errorModal').modal('show');
      }
    )
  }

}
