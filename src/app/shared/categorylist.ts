import { Category } from './category';

export class CategoryList {

    private list: any[] = [];
    private activeCategory: any[] = ['all'];



    // transforms db data into reflected data structure
    add(categoryData: any, single?: boolean): void {
        if (!single) this.list.length = 0;
        for (let key in categoryData) {
            this.list.push({
                id: key,
                content: new Category(
                    categoryData[key].name,
                    categoryData[key].totalTasks
                )
            });
        }
    }



    // returns categorydata based on db id
    getCategoryById(id: string): any {
        return this.list.filter(cat => cat.id === id)[0];
    }



    // returns categorydata based on db id
    getCategoryByName(name: string): any {
        return this.list.filter(cat => cat.content.name === name)[0];
    }



    // generate body for an API request
    generateBody(category: string): any {
        const data = this.list[this.getIndexOf(category)];
        return {name: data.content.name, totalTasks: data.content.total}
    }



    getUrlId(category: string): string {
        const index = this.getIndexOf(category);
        return this.list[index].id;
    }




    // updates the category totals of certain categories
    updateTotal(catName: string, action: string): void {
        const index = this.getIndexOf(catName);
        this.list[index].content[action + 'Total']();
    }



    connect(type: string): any[] {
        if (type === 'category') return this.list;
        if (type === 'active-category') return this.activeCategory;
    }



    setActiveCategory(category: string): void {
        this.activeCategory[0] = category;
    }


    // returns the index of a category based on db id
    private getIndexOf(catName: string): number {
        return this.list.findIndex(cat => cat.content.name === catName);
    }


    constructor() {}

}
