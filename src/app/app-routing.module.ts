import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestFormComponent } from './request-form/request-form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'newReq/:editable', component: RequestFormComponent},
  {path: 'newReq/:editable/:reqKey', component: RequestFormComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
