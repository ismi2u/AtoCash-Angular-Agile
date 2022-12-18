import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessAreaComponent } from './businessarea.component';
import { BusinessAreaListComponent } from './businessarea-list/businessarea-list.component';

import { BusinessAreaFormComponent } from './businessarea-form/businessarea-form.component';

const routes: Routes = [{
  path: '', component: BusinessAreaComponent,
  children: [
    {
      path: 'list',
      component: BusinessAreaListComponent,
    },
    {
      path: 'action/:type',
      component: BusinessAreaFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: BusinessAreaFormComponent,
    },
  
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessAreaRoutingModule { }
