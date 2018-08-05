/**
 * Group pull down menu.
 *
 * Created by vbudhram on 3/19/17.
 */
import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/index';

import { GroupService } from '../../providers/groups.service';
import { EventService } from '../../providers/events.service';
import { WhenWhereService } from '../../providers/whenwhere.service';
import { AuthService } from '../../providers/auth.service';

import { AddGroupPage } from '../add-group/add-group';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="editGroup()">Edit</button>
      <button ion-item (click)="deleteGroup()">Delete</button>
    </ion-list>
  `,
  providers: [GroupService, EventService, WhenWhereService, AuthService]
})
export class GroupPopoverMenu {

  group: any;

  constructor(private navParams: NavParams,
    private viewCtrl: ViewController,
    private groupService: GroupService,
    private modalCtrl: ModalController) {
    this.group = this.navParams.get('group');
  };

  deleteGroup(): Promise<void> {
    return this.groupService.deleteGroup(this.group.$key)
      .then(() => {
        this.close();
      });
  };

  editGroup(): void {
    let addGroupModal = this.modalCtrl.create(AddGroupPage, { group: this.group });
    addGroupModal.present();
    this.close();    
  }

  close(): void {
    this.viewCtrl.dismiss();
  };
}