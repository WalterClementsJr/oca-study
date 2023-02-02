import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./component/pages/dashboard/dashboard.component";
import {TrainingContentComponent} from "./component/pages/training-content/training-content.component";
import {QuestionFormComponent} from "./component/question-form/question-form.component";


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'content/:name', component: TrainingContentComponent},
  {path: 'study', component: QuestionFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
