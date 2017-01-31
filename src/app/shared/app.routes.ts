import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { EditTaskComponent } from "../components/edit-task/edit-task.component";

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'edit-task/:id', component: EditTaskComponent }
];

export const routing = RouterModule.forRoot(routes);
