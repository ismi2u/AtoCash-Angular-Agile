import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-task',
	templateUrl: './confirm-email.component.html',
	styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
	showPassword = false;
	EmailConfirmedRequested = false;
	EmailNotConfirmedRequested = false;
	email = '';
	token = '';

	constructor(
		private authService: AuthService,
		private commonService: CommonService,
		private translateService: TranslateService,
		private snapshot: ActivatedRoute,
		private router: Router,
	) {}

	 

	ngOnInit() {
		this.snapshot.queryParamMap.subscribe((data) => {
			this.token = data.get('token');
			this.email = data.get('email');
		});

		this.confirmEmail();
	}

	confirmEmail(){
		this.commonService.unauthorizedLoading.next(true);
		
		this.authService.confirmEmail({token: this.token,
			email: this.email}).subscribe(
			(response: any) => {
				if (
					!response.success ||
					(response.data && !response.data.status.length)
				) {
					response.data && !response.data.status.length ? this.commonService.createNotification('error', 'Invalid Email') : null;
					this.commonService.unauthorizedLoading.next(false);
					this.EmailNotConfirmedRequested = true;
					this.EmailConfirmedRequested = false;
				}else{
						this.EmailConfirmedRequested = true;
						this.EmailNotConfirmedRequested = false;
						this.commonService.unauthorizedLoading.next(false);
					}
			},
			(err) => {
				this.commonService.createNotification('error', 'Something went wrong!');
				this.commonService.unauthorizedLoading.next(false);
			},
		);
	}

}
