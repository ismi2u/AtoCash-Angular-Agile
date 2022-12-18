import { AntdModule } from '../../components/antd.module';
import { SharedModule } from '../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GeneralLedgerRoutingModule } from './general-ledger-routing.module';
import { GeneralLedgerComponent } from './general-ledger.component';
import { GeneralLedgerListComponent } from './general-ledger-list/general-ledger-list.component';

import { GeneralLedgerFormComponent } from './general-ledger-form/general-ledger-form.component';

@NgModule({
  declarations: [
    GeneralLedgerComponent,
    GeneralLedgerListComponent,
    GeneralLedgerFormComponent,
    
  ],
  imports: [
    CommonModule,
    GeneralLedgerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AntdModule
  ]
})
export class GeneralLedgerModule {}
