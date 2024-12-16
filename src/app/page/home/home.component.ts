import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) { 

  }

  ngOnInit(): void {
    this.apiService.ping().subscribe((res) => {
      console.log(res);
    });
  }

}
