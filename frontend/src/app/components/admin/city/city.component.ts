import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit {
  private http = inject(HttpClient)

  cityList : any [] = []
  ngOnInit(): void {
    this.getAllCity()
  }

  getAllCity() {
    this.http.get('https://freeapi.gerasim.in/api/FlightBooking/GetAllCity').subscribe((res:any) => {
      this.cityList = res.data
    })
  }
}
