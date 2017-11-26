import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../../app.component';

import { HeaderComponent } from '../../components/header/header.component';
import { DemoAppComponent } from '../../components/demo-app/demo-app.component';
import { EditGroupComponent } from '../../components/edit-group/edit-group.component';
import { DisplayGroupStudentsComponent } from '../../components/display-group-students/display-group-students.component';

const Routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'SchoolApp',
        component: DemoAppComponent,
      },
      {
        path: 'EditGroup',
        component: EditGroupComponent,
      },
      {
        path: 'DisplayGroupStudents/:group_id',
        component: DisplayGroupStudentsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
