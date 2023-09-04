import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import cookie from 'js-cookie';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	currentUser = new BehaviorSubject({});
	emailToChangePwd = '';

	constructor(
		private http: HttpClient,
		private router: Router,
		private commonService: CommonService,
	) {}

	
	
	login = (data: any) => {
		
		const { email } = data;		
		let domain = this.getDomain({email});		
		
		return this.http
			.post(
				`${`${domain}${environment.baseUrl}`}/api/Account/Login`,data,)
			.subscribe(
				(response: any) => {
					if (
						!response.success ||
						(response.data && !response.data.role.length)
					) {
						response.data && !response.data.role.length
							? this.commonService.createNotification('error', 'Unauthorized')
							: null;
					} else {
						if (response && response.data) {
							cookie.set('user', JSON.stringify(response.data));
							cookie.set('api',`${domain}${environment.baseUrl}`,);
							this.router.navigateByUrl('/dashboard');
							this.currentUser.next(response);
							this.commonService.getPermission();
						}
					}
				},
				(err) => {},
			);
	};

	logout = () => {
		cookie.remove('user');
		this.router.navigateByUrl('/login');
		this.commonService.resetAccess();
	};

	forgotPassword = (data) => {
		const { email } = data;		
		let domain = this.getDomain({email});	

		//this.http.post(`${this.commonService.getApi()}/api/Account/ForgotPassword`,	data);
		return this.http.post(`${`${domain}${environment.baseUrl}`}/api/Account/ForgotPassword`,data,)
	
	}
		
	resetPassword = (data) => {
		const { email } = data;		
		let domain = this.getDomain({email});	

		//return this.http.post(`${this.commonService.getApi()}/api/Account/ResetPassword`,data);
		return this.http.post(`${`${domain}${environment.baseUrl}`}/api/Account/ResetPassword`,data,)
	};

	confirmEmail = (data) => {
		const { email } = data;		
		let domain = this.getDomain({email});	
 
		return this.http.post(`${`${domain}${environment.baseUrl}`}/api/Account/ConfirmEmail`,data,)
	
	}

	getDomain({email})
	{
		let domain = email.split('@')[1];
		let redirectDomain:any='';
		
		//console.log('1=='+domain);
		if(domain=="foodunitco.com" || domain=="signsa.com" || domain=="foodunitco.onmicrosoft.com"
		|| domain=="2eat.com.sa" || domain=="2eat.sa" || domain=="alzadalyawmi.com"
		|| domain=="estilo.sa" || domain=="foodunit.uk" || domain=="dhyoof.com"
		|| domain=="janburger.com" || domain=="luluatnajd.com" || domain=="shawarma-plus.com"
		|| domain=="shawarmaplus.sa" || domain=="signsa.com" || domain=="tameesa.com"
		|| domain=="tameesa.com.sa" || domain=="thouq.sa" || domain=="tameesa.com" || domain=="foodworldco.com" || domain=="gmail.com" 
		)
		{
			redirectDomain="fw";		
		}else{
			redirectDomain=domain.split('.')[0];
		}
		
		//console.log('redirectDomain=='+redirectDomain);
		redirectDomain = redirectDomain+"server";
		//console.log('redirectDomain=='+redirectDomain);
		
		domain =  environment.baseUrl.includes('localhost') ? 'http://' : `https://${redirectDomain}.`;

		return domain;
	}
}
