import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VATRateRoutingModule } from './vat-rate-routing.module';

import { VATRateComponent } from './vat-rate.component';
import { VATRateFormComponent } from './vat-rate-form/vat-rate-form.component';


@NgModule({
  declarations: [VATRateComponent,  VATRateFormComponent],
  imports: [
    CommonModule,
    VATRateRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class VATRateModule { }
