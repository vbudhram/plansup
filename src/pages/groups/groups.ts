import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, PopoverController } from 'ionic-angular';
// import { FirebaseListObservable } from 'angularfire2';
// import { Subscription } from 'rxjs/Subscription';

import { GroupService } from '../../providers/groups.service';
import { EventService } from '../../providers/events.service';
import { AuthService } from '../../providers/auth.service';
import { UserMetaService } from '../../providers/user-meta.service';

import { GroupPage } from '../group/group';
import { GroupPopoverMenu } from './popover-menu';
import { AddGroupPage } from '../add-group/add-group';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
  providers: [EventService, GroupService, AuthService, UserMetaService]
})
export class GroupsPage implements OnInit {

  groups: any;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private groupService: GroupService,
    private authService: AuthService,
    private userMeta: UserMetaService) {
  }

  ngOnInit(): void {
    this.groupService.getGroups()
      .then(groups => {
        groups.subscribe((groupsList) => {
          let currGroups = [];
          groupsList.forEach((group) => {
            currGroups.push(group);
          });
          this.groups = currGroups;
        });
      });
  };

  presentAddGroupModal() {
    let addGroupModal = this.modalCtrl.create(AddGroupPage, { group: undefined });
    addGroupModal.present();
  }

  selectGroup(group): void {
    this.navCtrl.push(GroupPage, {
      group: group
    });
  };

  presentGroupMenu(event, group): void {
    let popover = this.popoverCtrl.create(GroupPopoverMenu, {
      group: group
    });
    popover.present({
      ev: event
    });
  };
}
