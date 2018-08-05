import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserMetaService } from '../../providers/user-meta.service';

/*
  Generated class for the UserMeta page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-meta',
  templateUrl: 'user-meta.html',
  providers: [UserMetaService]
})
export class UserMetaPage {
  private notValid: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userMetaService: UserMetaService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserMetaPage');
  }

  submitUserMetaData(firstName: string, lastName: string, phoneNumber?: number): void {
    this.notValid = '';

    if(!firstName) {
      this.notValid += 'First Name not set ';
    }
    if(!lastName) {
      this.notValid += 'Second Name not set';
    }
    if(firstName && lastName) {
      this.userMetaService.createUserMeta({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
      }).then(() => {
        this.navCtrl.pop();
      });
    }
  }

}
