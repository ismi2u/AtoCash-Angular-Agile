import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorRoutingModule } from './vendor-routing.module';

import { VendorComponent } from './vendor.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';


@NgModule({
  declarations: [VendorComponent, VendorListComponent, VendorFormComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AntdModule
  ]
})
export class VendorModule { }
