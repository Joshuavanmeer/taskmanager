import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpService } from "../../shared/http.service";

@Component({
  selector: 'tm-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrls: ['./input-prompt.component.css']
})
export class InputPromptComponent implements OnInit {

    @Output() close: EventEmitter<any> = new EventEmitter();
    @Output() addedCategory: EventEmitter<any> = new EventEmitter();
    private inputForm: FormGroup;



    private newCategoryAdded(): void {
        const newCategory = this.inputForm.value.newCategoryName;
        this.httpService.addNewCategory(newCategory)
        this.addedCategory.emit(newCategory);
    }



    private buildForm(): void {
        this.inputForm = this.formBuilder.group({
            newCategoryName: ['', Validators.required]
        });
    }



    private handleClick(ev): void {
        const target = ev.target.id;
        if (target === 'input-prompt-container' || target === 'close-btn') {
            this.close.emit();
        }
    }



    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService
    ) { }


    ngOnInit() {
        this.buildForm();
    }

}
