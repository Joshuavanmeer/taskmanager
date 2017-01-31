import {Component, OnInit, trigger, state, style, transition, animate, EventEmitter, Output} from '@angular/core';
import { HttpService } from "../../shared/http.service";
import { Router } from "@angular/router";

@Component({
    selector: 'tm-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
    animations: [
        trigger('listAnimation', [
            state('in', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(50px)'
                }),
                animate(200)
            ]),
            transition('* => void', [
                animate(400, style({
                    opacity: 0,
                    transform: 'translateX(50px)'
                }))
            ])
        ])
    ]
})
export class TaskListComponent implements OnInit {

    private tasks: any[];
    private activeCategory: any[];
    private listAnimationState: string = 'in';


    private handleClick(ev): void {
        let target = ev.target;
        if (target.classList.contains('del-btn') || target.classList.contains('edit-btn')) {
            let action = target.classList.contains('del-btn') ? 'delete' : 'edit';
            this[action](this.getRootId(target));
        }
    }



    private getRootId(target: any): string {
        if (!target.classList.contains('task-item')) {
            let parent = target.parentElement;
            while (!parent.classList.contains('task-item')) {
                parent = parent.parentElement;
            }
            return parent.id;
        }
    }



    private taskChecked(ev: any): void {
        const target = ev.target;
        const checked = target.checked;
        const taskId = this.getRootId(target);
        this.httpService.checkTask(taskId, checked);
    }



    private edit(id: string): void {
        this.router.navigate(['/edit-task', id]);
    }



    private delete(id: string): void {
        this.httpService.deleteTask(id);
    }



    constructor(
        private httpService: HttpService,
        private router: Router
    ) { }



    ngOnInit() {
        this.tasks = this.httpService.connect('task');
        this.activeCategory = this.httpService.connect('active-category');
    }

}
