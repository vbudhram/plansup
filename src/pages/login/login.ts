import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { UserMetaService } from '../../providers/user-meta.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService, UserMetaService]
})
export class LoginPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, private userMetaService: UserMetaService) { };

  userMetaSub: Subscription;

  showPassword(emailPassword: any): void {
    emailPassword.type = emailPassword.type === 'password' ? 'text' : 'password';
  };

  onEmailButton(emailInput: string, emailPassword: string): void {
    console.log(emailInput, emailPassword);
    let unPw = {
      email: emailInput,
      password: emailPassword
    };
    this.auth.createEmailUser(unPw).then(
      (success) => {
        console.log(success);
      }).catch(
      (err) => {
        console.log(err);
      });
  };

  onGoogleButton(): void {
    this.auth.loginWithGoogle().then(
      (success) => {
        console.log(success);
      }).catch(
      (err) => {
        console.log(err);
      });
  };

  onFacebookButton(): void {
    this.auth.loginWithFacebook().then(
      (success) => {
        console.log('Facebook asldkf: ' + success);
      }).catch(
      (err) => {
        console.log('a;slkdjf');
        console.log(err);
      });
  };

  signIn(email: string, password: string): void {
    this.auth.loginWithEmail({ email: email, password: password })
      .then(
      (success) => {
        console.log(success);
      }).catch(
      (err) => {
        console.log(err);
      });
  }
}
