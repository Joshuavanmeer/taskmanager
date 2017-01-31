export class Category {

    constructor(public name: string, public total: number) {}

    incrementTotal(): void { this.total++ }

    decrementTotal(): void { this.total-- }

}
