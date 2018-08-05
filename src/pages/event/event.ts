import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/index';

import { AddWWPage } from '../add-ww/add-ww';

import { WhenWhereService } from '../../providers/whenwhere.service';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
  providers: [WhenWhereService]
})
export class EventPage {

  event: any;
  whenwheres: any[];

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public whenwhereService: WhenWhereService) {
    this.event = this.navParams.get('event');
    this.whenwheres = [];
  };

  ngOnInit(): void {
    this.whenwhereService.getWhenWheres(this.event.$key)
      .then((whenwheres) => {
        whenwheres.subscribe((wwList) => {
          let currWhenWheres = [];
          wwList.forEach((ww) => {
            this.updateWhenWhere(ww);
            this.setVoteCounts(ww);
            currWhenWheres.push(ww);
          });
          this.whenwheres = currWhenWheres;
        });
      });
  };

  private updateWhenWhere(newWhenWhere) {
    // Set any flags on the old whenwhere object to the new whenwhere object
    this.whenwheres.some((oldWhenWhere) => {
      if (newWhenWhere.$key === oldWhenWhere.$key) {
        newWhenWhere.showDetails = oldWhenWhere.showDetails;
        return true;
      }
    });
  };

  private setVoteCounts(whenwhere) {
    // Total up all the counts for each whenwhere
    whenwhere.yes = [];
    whenwhere.maybe = [];
    whenwhere.no = [];

    if (!whenwhere.votes) {
      return;
    }

    const voteKeys = Object.keys(whenwhere.votes);
    voteKeys.forEach((voteKey) => {
      const vote = whenwhere.votes[voteKey];
      switch (vote.voteType) {
        case 'yes':
          whenwhere.yes.push(voteKey);
          break;
        case 'maybe':
          whenwhere.maybe.push(voteKey);
          break;
        case 'no':
          whenwhere.no.push(voteKey);
          break;
        default:
      };
    });
  };

  toggleDetails(whenwhere: any) {
    whenwhere.showDetails = !whenwhere.showDetails;
  };

  voteForWhenWhere(whenwhere: any, voteType: string) {
    return this.whenwhereService.voteForWhenWhere(whenwhere.$key, voteType);
  };

  presentAddWWModal(): void {
    let addWWModal = this.modalCtrl.create(AddWWPage, { event: this.event });
    addWWModal.present();
  };
}