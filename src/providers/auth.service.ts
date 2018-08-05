import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {
  constructor(public http: Http, private af: AngularFire) { }

  public onUserChange(): Observable<FirebaseAuthState> {
    return this.af.auth.asObservable();
  }

  public createEmailUser(userData: EmailUserData): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.createUser(userData);
  }

  public loginWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  public loginWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    });
  };

  public loginWithEmail(userData: EmailUserData): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login(
      {
        email: userData.email,
        password: userData.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      });
  };

  public logout(): Promise<void> {
    return this.af.auth.logout();
  };

  public getCurrentUserId() {
    return this.af.auth.getAuth().uid;
  };
}

export interface EmailUserData {
  email: string;
  password: string;
}