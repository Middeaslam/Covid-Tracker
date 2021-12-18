import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { VaccineTable } from './vaccine.interface';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

  vaccineData: any = null
  tableHeader = VaccineTable

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getVaccineData().subscribe(
      (res: any) => {
        this.vaccineData = res.All
        console.log(res.All)
      }
    )
  }

}
