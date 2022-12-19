import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessTypeComponent } from './business-type.component';
import { BusinessTypeListComponent } from './business-type-list/business-type-list.component';

import { BusinessTypeFormComponent } from './business-type-form/business-type-form.component';

const routes: Routes = [{
  path: '', component: BusinessTypeComponent,
  children: [
    {
      path: 'list',
      component: BusinessTypeListComponent,
    },
    {
      path: 'action/:type',
      component: BusinessTypeFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: BusinessTypeFormComponent,
    },
  
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessTypeRoutingModule { }
