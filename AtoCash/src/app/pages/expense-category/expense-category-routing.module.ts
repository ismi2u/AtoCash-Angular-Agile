import { ExpenseCategoryFormComponent } from './expense-category-form/expense-category-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpenseCategoryComponent } from './expense-category.component';
import { ExpenseCategoryListComponent } from './expense-category-list/expense-category-list.component';


const routes: Routes = [{
  path: '', component: ExpenseCategoryComponent,
  children: [
    {
      path: 'list',
      component: ExpenseCategoryListComponent,
    },
    {
      path: 'action/:type',
      component: ExpenseCategoryFormComponent,
    },
    {
      path: 'action/:type/:id',
      component: ExpenseCategoryFormComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseCategoryRoutingModule { }
