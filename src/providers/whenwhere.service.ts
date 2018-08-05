/**
 * Service that manages whenwhere.
 *
 * Created by vbudhram on 3/19/17.
 */
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { AuthService } from '../providers/auth.service';

@Injectable()
export class WhenWhereService {

  WHENWHERE_URL = '/whenwhere';

  constructor(private af: AngularFire,
    public authService: AuthService) { };

  createWhenWhere(eventId: string, when: string, where: string) {
    return Promise.resolve()
      .then(() => {
        const userId = this.authService.getCurrentUserId();
        return this.af.database.list(this.WHENWHERE_URL).push({
          when: when,
          where: where,
          eventId: eventId,
          createdBy: userId
        });
      });
  };

  getWhenWheres(eventId: string) {
    return Promise.resolve()
      .then(() => {
        return this.af.database.list(this.WHENWHERE_URL, {
          query: {
            orderByChild: 'eventId',
            equalTo: eventId
          }
        });
      });
  };

  voteForWhenWhere(whenwhereId: string, voteType: string) {
    return Promise.resolve()
      .then(() => {
        return this.af.database.list(this.WHENWHERE_URL + '/' + whenwhereId + '/votes').update(
          this.authService.getCurrentUserId(),
          { voteType: voteType });
      });
  }
};