import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { CategoryList } from "./categorylist";
import { TaskList } from "./tasklist";
import 'rxjs/Rx';


@Injectable()
export class HttpService {

    private categoriesURL: string = 'https://ngdb-1c3fd.firebaseio.com/categories.json';
    private categoryURL: string = 'https://ngdb-1c3fd.firebaseio.com/categories/';
    private tasksURL: string = 'https://ngdb-1c3fd.firebaseio.com/tasks.json';
    private taskURL: string = 'https://ngdb-1c3fd.firebaseio.com/tasks/';
    private header: Headers = new Headers({'Content-type': 'application/json'});

    private categoryList: CategoryList = new CategoryList();
    private taskList: TaskList = new TaskList();


    getData(jsonUri): any {
        return this.http.get(jsonUri)
            .map((res: Response) => res.json());
    }



    addNewTask(task: string, category: string, checked: boolean) {
        const taskBody = { task: task, category: category, checked: checked };
        this.post(this.tasksURL, taskBody, this.header).subscribe((res) => {
            const newTask = {[res.name]: {task: task, category: category, checked: checked}};
            this.processReflectedTaskData(newTask, true);
        });
        this.updateCategoryTotal(category, 'increment');
    }



    // makes changes to reflected category totals
    private updateCategoryTotal(category: string, action: string): void {
        this.categoryList.updateTotal(category, action);
        const url = this.categoryURL + this.categoryList.getUrlId(category) + '.json';
        const categoryBody = this.categoryList.generateBody(category);
        this.update(url, categoryBody, this.header).subscribe()
    }



    private post(url: string, body: any, header: any): any {
        return this.http.post(url, body, {headers: header}).
            map((res: Response) => res.json())
    }



    addNewCategory(categoryName: string) {
        const categoryBody = { name: categoryName, totalTasks: 0 };
        this.post(this.categoriesURL, categoryBody, this.header).subscribe((res) => {
            const newCategory = {[res.name]: categoryBody};
            this.processReflectedCategoryData(newCategory, true);
        });
    }



    editTask(dataObj: {id: string, newTask: string, newCat: string, oldCat: string}): void {
        const oldTaskObj    = this.taskList.getTask(dataObj.id);
        const checked       = oldTaskObj.content.checked;
        const url           = this.taskURL + dataObj.id + '.json';
        const body          = {task: dataObj.newTask, category: dataObj.newCat, checked: checked};
        this.update(url, body, this.header).subscribe(() => {
            this.taskList.updateTask(dataObj.id, dataObj.newTask, dataObj.newCat, checked);
            this.updateCategoryTotal(dataObj.newCat, 'increment');
            this.updateCategoryTotal(dataObj.oldCat, 'decrement');
        });
    }



    deleteTask(id: string): void {
        const deletedTask = this.taskList.delete(id);
        console.log(deletedTask);
        this.updateCategoryTotal(deletedTask.content.category, 'decrement');
        this.delete(id).subscribe()
    }



    checkTask(id: string, checked: boolean) {
        const task = this.taskList.getTask(id)
        const url = this.taskURL + id + '.json';
        const body = {task: task.content.task, category: task.content.category, checked: checked};
        this.update(url, body, this.header).subscribe((res) => {
            this.taskList.toggleCheck(id, checked);
            console.log(res);
        });
    }


    setActiveCategory(category: string): void {
        this.categoryList.setActiveCategory(category);
    }



    // updates new value to database
    private update(url: string, body:any, header: any) {
        return this.http.put(url, body, {headers: header})
            .map((res: Response) => res.json())
    }



    // deletes task from db
    private delete(id: string): any {
        const url = this.taskURL + id + '.json';
        return this.http.delete(url, {headers: this.header})
            .map(res => res);
    }



    getTask(id: string): any {
        return this.taskList.getTask(id);
    }


    // gets data from the database and pushes
    // it to datapusher service so components
    // get notified of changes through change detection
    init(type: string):void {
        let uri, action;
        if (type === 'categories') {
            uri = this.categoriesURL;
            action = 'processReflectedCategoryData';
        }
        if (type === 'tasks') {
            uri = this.tasksURL;
            action = 'processReflectedTaskData';
        }
        this.getData(uri).subscribe(
            (res: Response) => {
                this[action](res);
            }
        );
    }



    // transform db data into a reflected data list
    processReflectedCategoryData(categoryData: any, single?: boolean): void {
        this.categoryList.add(categoryData, single);
    }


    // transform db data into a reflected data list
    processReflectedTaskData(taskData: any, single?: boolean): void {
        this.taskList.add(taskData, single);
    }



    // end point for components to connect to the
    // change detection of httpService data changes
    connect(type: string): any {
        if (type === 'category') return this.categoryList.connect('category');
        if (type === 'active-category') return this.categoryList.connect('active-category');
        if (type === 'task') return this.taskList.connect();
    }



    constructor(private http: Http) {}

}
