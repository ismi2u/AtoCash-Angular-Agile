import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeExtendedInfoComponent } from './employee-extended-info.component';
import { EmployeeExtendedInfoListComponent } from './employee-extended-info-list/employee-extended-info-list.component';
import { EmployeeExtendedInfoFormComponent } from './employee-extended-info-form/employee-extended-info-form.component';

const routes: Routes = [{
  path: '', component: EmployeeExtendedInfoComponent,
  children: [
    {
      path: 'list',
      component: EmployeeExtendedInfoListComponent,
    }, 
    {
      path: 'action/:type',
      component: EmployeeExtendedInfoFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: EmployeeExtendedInfoFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeExtendedInfoRoutingModule { }
