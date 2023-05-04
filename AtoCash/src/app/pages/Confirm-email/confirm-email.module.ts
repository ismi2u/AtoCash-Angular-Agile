import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AntdModule } from '../../components/antd.module';
import { SharedModule } from 'src/app/components/shared.module';
import { ConfirmEmailComponent } from './confirm-email.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
	declarations: [ConfirmEmailComponent],
	imports: [
		CommonModule,
		ConfirmEmailRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		AntdModule,
	],
})
export class ConfirmEmailModule {}
