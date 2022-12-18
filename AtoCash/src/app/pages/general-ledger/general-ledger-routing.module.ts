import { GeneralLedgerFormComponent } from './general-ledger-form/general-ledger-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralLedgerComponent } from './general-ledger.component';
import { GeneralLedgerListComponent } from './general-ledger-list/general-ledger-list.component';


const routes: Routes = [{
  path: '', component: GeneralLedgerComponent,
  children: [
    {
      path: 'list',
      component: GeneralLedgerListComponent,
    },
    {
      path: 'action/:type',
      component: GeneralLedgerFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: GeneralLedgerFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralLedgerRoutingModule { }
