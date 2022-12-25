import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorComponent } from './vendor.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

import { VendorFormComponent } from './vendor-form/vendor-form.component';

const routes: Routes = [{
  path: '', component: VendorComponent,
  children: [
    {
      path: 'list',
      component: VendorListComponent,
    },
    {
      path: 'action/:type',
      component: VendorFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: VendorFormComponent,
    },
  
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
