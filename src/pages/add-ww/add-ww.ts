import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { GroupService } from '../../providers/groups.service';
import { EventService } from '../../providers/events.service';
import { WhenWhereService } from '../../providers/whenwhere.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-add-ww',
  templateUrl: 'add-ww.html',
  providers: [GroupService, EventService, WhenWhereService, AuthService]
})
export class AddWWPage {

  when;
  where: string;
  event: any;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public whenwhereService: WhenWhereService,
    public authService: AuthService) {
    this.event = this.navParams.get('event');
    this.when = new Date().toISOString();
  }

  addWW() {
    return this.whenwhereService.createWhenWhere(this.event.$key, this.when, this.where)
      .then(() => {
        this.viewCtrl.dismiss();
      });
  };

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
