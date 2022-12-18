import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessUnitComponent } from './business-unit.component';
import { BusinessUnitListComponent } from './business-unit-list/business-unit-list.component';

import { BusinessUnitFormComponent } from './business-unit-form/business-unit-form.component';

const routes: Routes = [{
  path: '', component: BusinessUnitComponent,
  children: [
    {
      path: 'list',
      component: BusinessUnitListComponent,
    },
    {
      path: 'action/:type',
      component: BusinessUnitFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: BusinessUnitFormComponent,
    },
  
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessUnitRoutingModule { }
