import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BankComponent } from './bank.component';
import { BankListComponent } from './bank-list/bank-list.component';

import { BankFormComponent } from './bank-form/bank-form.component';

const routes: Routes = [{
  path: '', component: BankComponent,
  children: [
    {
      path: 'list',
      component: BankListComponent,
    },
    {
      path: 'action/:type',
      component: BankFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: BankFormComponent,
    },
  
    { path: '', redirectTo: 'list', pathMatch: 'full' },


  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
