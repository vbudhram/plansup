/**
 * Group pull down menu.
 *
 * Created by vbudhram on 3/19/17.
 */
import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';

import { EventService } from '../../providers/events.service';
import { WhenWhereService } from '../../providers/whenwhere.service';
import { AuthService } from '../../providers/auth.service';

import { AddWWPage } from '../add-ww/add-ww';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="presentAddWWModal()">Propose When/Where</button>
    </ion-list>
    <ion-list>
      <button ion-item (click)="deleteEvent()">Delete Event</button>
    </ion-list>
  `,
  providers: [EventService, WhenWhereService, AuthService]
})
export class EventPopoverMenu {

  event: any;

  constructor(public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    private whenwhereService: WhenWhereService,
    private eventService: EventService) {
    this.event = this.navParams.get('event');
  }

  presentAddWWModal(): void {
    this.close();
    let addWWModal = this.modalCtrl.create(AddWWPage, { event: this.event });
    addWWModal.present();
  }

  deleteEvent(): Promise<void> {
    return this.eventService.deleteEvent(this.event.$key)
      .then(() => {
        this.close();
      });
  };

  close() {
    this.viewCtrl.dismiss();
  };
}