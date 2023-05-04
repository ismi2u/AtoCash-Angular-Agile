import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPayableMappingComponent } from './account-payable-mapping.component';

const routes: Routes = [{
  path: '', component: AccountPayableMappingComponent,
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPayableMappingRoutingModule {}
