import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BankRoutingModule } from './bank-routing.module';

import { BankComponent } from './Bank.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { BankFormComponent } from './bank-form/bank-form.component';


@NgModule({
  declarations: [BankComponent, BankListComponent, BankFormComponent],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class BankModule { }
