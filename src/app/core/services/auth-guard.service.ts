import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(private router : Router){}
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;  
		return this.verifyLoginAuthentication(url);
	}

	verifyLoginAuthentication(url): boolean {
		if (!this.isLoggedIn()) {
			this.router.navigate(['/login']);
			return false;
		} else {
			return true;
		}
	}
	
	isLoggedIn(): boolean {
		let status = false;
		if (localStorage.getItem('isLoggedIn') === "true") {
			status = true;
		} else {
			status = false;
		}
	
		return status;
	}
}