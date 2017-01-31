import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../shared/http.service";

@Component({
  selector: 'tm-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {


    private categories: any[];


    private handleClick(ev: any): void {
        const id = this.getRootId(ev.target).slice(7);
        if (id === 'all' || this.isValidFilter(id)) {
            this.httpService.setActiveCategory(id);
        }
    }



    private getRootId(target: any): string {
        if (target.id.includes('filter')) return target.id;
        while (!target.id.includes('filter')) {
            return this.getRootId(target.parentElement);
        }
    }



    private isValidFilter(id: string): boolean {
        const category = this.categories.filter(category => category.content.name === id)[0];
        if (category.content.total > 0) return true;
        else return false;
    }


    constructor(
        private httpService: HttpService
    ) { }



    ngOnInit() {
        this.categories = this.httpService.connect('category');
    }

}
