import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries/countries.service';

declare var $: any;

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  statesData: any = []
  errorMessage: string = '';

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getStatesData().subscribe(
      (res: any) => {
        let tempData = Object.entries(res)
        this.statesData = tempData.length > 1 ? tempData.slice(1) : []
        console.log(this.statesData)
      }, err => {
        this.errorMessage = err;
        console.log('Errors: ', + this.errorMessage)
        $('#errorModal').modal('show');
      }
    )
  }

}
