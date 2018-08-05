import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { GroupService } from '../../providers/groups.service';
import { EventService } from '../../providers/events.service';
import { WhenWhereService } from '../../providers/whenwhere.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html',
  providers: [GroupService, EventService, WhenWhereService, AuthService]
})
export class AddGroupPage {

  name: string;
  description: string;
  isEdit: boolean;
  group: any;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public groupService: GroupService,
    public authService: AuthService
  ) {
    this.group = this.navParams.get('group');

    if (this.group) {
      this.isEdit = true;
      this.name = this.group.name;
      this.description = this.group.description;
    } else {
      this.isEdit = false;
    }
  }

  updateOrCreate() {
    if (!this.isEdit) {
      return this.groupService.createGroup(this.name, this.description)
        .then(() => {
          this.viewCtrl.dismiss();
        });
    } else {
      return this.groupService.editGroup(this.group, this.name, this.description)
        .then(() => {
          this.viewCtrl.dismiss();
        });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
