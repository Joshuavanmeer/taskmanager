import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskCreatorComponent } from './components/task-creator/task-creator.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FilterComponent } from './components/filter/filter.component';
import { HomeComponent } from './components/home/home.component';
import { HttpService } from "./shared/http.service";
import { InputPromptComponent } from './components/input-prompt/input-prompt.component';
import { routing } from "./shared/app.routes";
import { EditTaskComponent } from './components/edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskCreatorComponent,
    TaskListComponent,
    FilterComponent,
    HomeComponent,
    InputPromptComponent,
    EditTaskComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      ReactiveFormsModule,
      routing
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
