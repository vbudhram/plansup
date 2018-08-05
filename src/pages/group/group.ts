import { NavParams, NavController, AlertController, PopoverController, ModalController } from 'ionic-angular';
import { EventPage } from '../event/event';
import { Component } from '@angular/core';

import { EventService } from '../../providers/events.service';
import { WhenWhereService } from '../../providers/whenwhere.service';
import { AuthService } from '../../providers/auth.service';

import { EventPopoverMenu } from './popover-menu';

import { AddEventPage } from '../add-event/add-event';

@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
  providers: [EventService, WhenWhereService, AuthService]
})
export class GroupPage {

  group: any;
  events: any[];

  constructor(public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public eventService: EventService,
    public whenwhereService: WhenWhereService) {

    this.group = this.navParams.get('group');
  }

  ngOnInit(): void {
    this.eventService.getEvents(this.group.$key)
      .then(events => {

        // This events subscription listens for changes to events and the whenwhers associated with them
        // and updates the view accordly
        events.subscribe((eventsList) => {
          let currEvents = [];
          eventsList.forEach((event) => {
            this.whenwhereService.getWhenWheres(event.$key)
              .then((whenwheres) => {
                whenwheres.subscribe((wwList) => {
                  let currWhenWheres = [];
                  wwList.forEach((ww) => {
                    currWhenWheres.push(ww);
                  });
                  event.whenwheres = currWhenWheres;
                });
              });
            currEvents.push(event);
          });
          this.events = currEvents;
        });
      });
  };

  presentAddEventModal(): void {
    let addEventModal = this.modalCtrl.create(AddEventPage, { group: this.group, view: this });
    addEventModal.present();
  }

  selectEvent(event): void {
    this.navCtrl.push(EventPage, {
      event: event
    });
  };

  presentEventMenu($event, event): void {
    let popover = this.popoverCtrl.create(EventPopoverMenu, {
      event: event
    });
    popover.present({
      ev: $event
    });
  };
}