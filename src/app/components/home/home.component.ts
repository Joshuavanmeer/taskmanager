import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../shared/http.service";

@Component({
  selector: 'tm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {





    init(): void {
        this.httpService.init('categories');
        this.httpService.init('tasks');
    }



    constructor(
        private httpService: HttpService
    ) {}

    ngOnInit() {
        this.init();
    }

}
