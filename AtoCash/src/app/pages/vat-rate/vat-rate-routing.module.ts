import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VATRateComponent } from './vat-rate.component';
import { VATRateFormComponent } from './vat-rate-form/vat-rate-form.component';

const routes: Routes = [{
  path: '', component: VATRateComponent,
  children: [
    {
      path: 'action/:type/1',
      component: VATRateFormComponent,
    },
  
    { path: '', redirectTo: 'action/edit/1', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VATRateRoutingModule { }
