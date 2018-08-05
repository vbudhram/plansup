import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, PopoverController } from 'ionic-angular';

import { GroupService } from '../../providers/groups.service';
import { AuthService } from '../../providers/auth.service';
import { UserMetaService } from '../../providers/user-meta.service';

//import { GroupPage } from '../group/group';
import { AddEventPage } from '../add-event/add-event';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private groupService: GroupService,
    private authService: AuthService,
    private userMeta: UserMetaService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  };

  presentAddNewEventModal() {
    let addEventModal = this.modalCtrl.create(AddEventPage, { group: undefined });
    addEventModal.present();
    console.log("Add new events");
  };

}
