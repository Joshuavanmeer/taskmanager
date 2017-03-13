import {Component, OnInit, Input, trigger, state, style, transition, animate} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpService } from "../../shared/http.service";
import { Category } from "../../shared/category";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import {debug} from "util";



@Component({
    selector: 'tm-task-creator',
    templateUrl: './task-creator.component.html',
    styleUrls: ['./task-creator.component.css'],
    animations: [
        trigger('errorMsg', [
            state('show', style({
                opacity: 1
            })),
            transition('void => *', [
                style({
                    opacity: 0
                }),
                animate(400)
            ]),
            transition('* => void', [
                animate(400, style({
                    opacity: 0
                }))
            ])
        ])
    ]
})

export class TaskCreatorComponent implements OnInit {

    @Input() id: string;
    @Input() formIsPrefilled: boolean = false;
    @Input() defaultTaskValue: string;
    @Input() defaultCategoryValue: string = 'sport';

    private taskCreatorForm: FormGroup;
    private categories: { id: string, content: Category }[];
    private promptActive: boolean = false;



    private buildForm(): void {
        this.taskCreatorForm = this.formBuilder.group({
            newTask: ['', [
                Validators.required,
                Validators.pattern('[a-zA-Z 0-9]*')]
            ],
            category: [this.defaultCategoryValue, Validators.required]
        });
    }



    private submitForm(): void {
        if (!this.formIsPrefilled) {
            this.newTaskCreated();
        }
        else if (this.formIsPrefilled) {
            this.editTask();
        }
    }



    private newTaskCreated(): void {
        if (this.taskCreatorForm.valid) {
            const task = this.taskCreatorForm.value.newTask;
            const category = this.taskCreatorForm.value.category;
            this.httpService.addNewTask(task, category, false);
            this.taskCreatorForm.reset({category: this.defaultCategoryValue});
        }
    }



    private editTask(): void {
        if (this.taskCreatorForm.valid) {
            this.httpService.editTask({
                id: this.id,
                newTask: this.taskCreatorForm.value.newTask,
                newCat: this.taskCreatorForm.value.category,
                oldCat: this.defaultCategoryValue
            });
            this.router.navigate(['/']);
        }
    }



    private newCategoryRequest(ev): void {
        if (ev.target.value === '+ Add new Category') {
            this.promptActive = true;
        }
    }



    private closePrompt(): void {
        this.promptActive = false;
        this.rollbackForm();
    }


    private rollbackForm(option?: string): void {
        const newTask: string = this.taskCreatorForm.value.newTask;
        const category: any = option ? option : this.defaultCategoryValue;
        this.taskCreatorForm.setValue({newTask: newTask, category: category});
        this.promptActive = false;
    }


    private prefillForm(): void {
        this.taskCreatorForm.setValue({newTask: this.defaultTaskValue, category: this.defaultCategoryValue});
    }


    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        private router: Router
    ) { }



    ngOnInit() {
        this.buildForm();
        if (this.formIsPrefilled) this.prefillForm();
        this.categories = this.httpService.connect('category');
    }

}
