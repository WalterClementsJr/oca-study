import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./component/pages/dashboard/dashboard.component";
import {TrainingContentComponent} from "./component/pages/training-content/training-content.component";
import {RandomQuestionComponent} from "./component/pages/random-question/random-question.component";

const routes: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'content/:name', component: TrainingContentComponent},
  {path: 'study', component: RandomQuestionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
