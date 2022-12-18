import { AntdModule } from '../../components/antd.module';
import { SharedModule } from '../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ExpenseCategoryRoutingModule } from './expense-category-routing.module';
import {ExpenseCategoryComponent } from './expense-category.component';
import {ExpenseCategoryListComponent } from './expense-category-list/expense-category-list.component';

import {ExpenseCategoryFormComponent } from './expense-category-form/expense-category-form.component';

@NgModule({
  declarations: [
   ExpenseCategoryComponent,
   ExpenseCategoryListComponent,
   ExpenseCategoryFormComponent,
    
  ],
  imports: [
    CommonModule,
   ExpenseCategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AntdModule
  ]
})
export class ExpenseCategoryModule {}
