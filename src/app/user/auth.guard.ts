import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private snack: SnackService
  ) {}

  // Fireship says they like to use Promises for using async/await, which leads to simplified code
  // make canActivate async to ensure it returns a promise
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const user = await this.afAuth.auth.currentUser;
    const isLoggedIn = !!user; // will be null if not logged in

    if (!isLoggedIn) {
      this.snack.authError();
    }

    return isLoggedIn;
  }

}
