export class Task {

    update(task: string, category: string, checked: boolean) {
        this.task = task;
        this.category = category;
        this.checked = checked;
    }

    constructor(public task: string, public category: string, public checked: boolean) {}

}
