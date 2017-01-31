import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "../../shared/http.service";

@Component({
  selector: 'tm-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

    private id: any;
    private task: string;
    private category: string;

    private getActivatedRouteParams(): void {
        this.id = this.activatedRoute.snapshot.params['id'];
    }



    private getTaskData(id: string): void {
        const taskData = this.httpService.getTask(id);
        this.task = taskData.content.task;
        this.category = taskData.content.category;
    }




    constructor(
        private activatedRoute: ActivatedRoute,
        private httpService: HttpService
    ) { }


    ngOnInit() {
        this.getActivatedRouteParams();
        this.getTaskData(this.id);
    }


}
