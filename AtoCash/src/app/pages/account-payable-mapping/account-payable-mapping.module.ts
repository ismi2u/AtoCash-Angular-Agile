import { AccountPayableMappingComponent } from './account-payable-mapping.component';
import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPayableMappingRoutingModule } from './account-payable-mapping-routing.module';




@NgModule({
  declarations: [  AccountPayableMappingComponent],
  imports: [
    CommonModule,
    AccountPayableMappingRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule,
    FormsModule
 
  ]
})
export class AccountPayableMappingModule { }
