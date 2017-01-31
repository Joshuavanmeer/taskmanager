import { Task } from './task';

export class TaskList {

    private list: any[] = [];


    // transforms and adds new tasks or initial load
    add(taskData: any, single?: boolean): void {
        if (!single) this.list.length = 0;
        for (let key in taskData) {
            this.list.unshift({
                id: key,
                content: new Task(
                    taskData[key].task,
                    taskData[key].category,
                    taskData[key].checked)
            })
        }
    }



    // returns categorydata based on db id
    getTask(id: string): any {
        return this.list.filter(task => task.id === id)[0];
    }


    delete(id: string) {
        return this.list.splice(this.getIndexOf(id), 1)[0];
    }

    // updates the checked state of a task
    toggleCheck(id: string, checked: boolean): void {
        const index = this.getIndexOf(id);
        this.list[index].content.checked = checked;
    }

    // returns the index of a category based on db id
    getIndexOf(id: string): number {
        return this.list.findIndex(task => task.id === id);
    }


    updateTask(id: string, newTask: string, newCat: string, checked: boolean): void {
        const taskObj = this.getTask(id);
        taskObj.content.update(newTask, newCat, checked);
    }


    connect(): any[] {
        return this.list;
    }


}
