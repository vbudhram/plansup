import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { EventService } from '../../providers/events.service';
import { WhenWhereService } from '../../providers/whenwhere.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
  providers: [EventService, WhenWhereService, AuthService]
})
export class AddEventPage {

  group: any;
  event: any;
  isEdit: boolean;
  when;
  where: string;
  name: string;
  description: string;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public eventService: EventService,
    public navParams: NavParams) {
    this.group = this.navParams.get('group');

    // If an event object is passed, then show
    // editing flags
    this.event = this.navParams.get('event');
    if (this.event) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
      this.when = new Date().toISOString();
    }
  }

  updateOrCreate() {
    if (this.isEdit) {
      this.editEvent();
    } else {
      this.addEvent();
    }
  }

  editEvent() {
    return this.eventService.editEvent(this.event.$key, this.name, this.description)
      .then(() => {
        this.viewCtrl.dismiss();
      });
  }

  addEvent(): Promise<void> {
    if (!this.when) {
      this.when = Date.now().toString();
    }

    if (!this.where) {
      this.where = '';
    }

    return this.eventService.createEvent(this.group.$key, this.name, this.description, this.when, this.where)
      .then(() => {
        this.viewCtrl.dismiss();
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  };
}
