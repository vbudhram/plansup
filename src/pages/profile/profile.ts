import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';
import { UserMeta, UserMetaService } from '../../providers/user-meta.service';
import { ModalController } from 'ionic-angular';
import { UserMetaPage } from '../user-meta/user-meta';

@Component({
  selector: 'page-contact',
  templateUrl: 'profile.html',
  providers: [AuthService]
})
export class ProfilePage {
  private userMeta: UserMeta;
  // private profile;
  public recentActivity;
  public statistics;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public authService: AuthService,
    public userMetaService: UserMetaService) {

    // constructor body
    userMetaService.getUserMeta().subscribe(user => {
      this.userMeta = user;
    });

    // Mock recent activity variable
    this.recentActivity = [];
    this.recentActivity[0] = {
      "name": "Sunday Funday",
      "description": "Bottomless mimosas with friends.",
      "date": "October 4, 2017 @ 9:00 AM"
    };
    this.recentActivity[1] = {
      "name": "Coffee Sampling Event",
      "description": "Bougie coffee tasting.",
      "date": "November 11, 2017 @ 11:30 AM"
    };
    this.recentActivity[2] = {
      "name": "Example Whenwhere",
      "description": "Whenwhere description.",
      "date": "December 25, 2017 @ 4:30 PM"
    };

    //Mock Statistics Variable

    this.statistics = [];
    this.statistics[0] = 50;
    this.statistics[1] = 20;
    this.statistics[2] = 35;
  }

  public logout(): Promise<void> {
    return this.authService.logout();
  }

  presentEditNameModal() {
    let modal = this.modalCtrl.create(UserMetaPage, {});
    modal.present();
  }
}