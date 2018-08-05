/**
 * Service that manages events.
 *
 * Created by vbudhram on 3/19/17.
 */
import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { WhenWhereService } from './whenwhere.service';
import { AuthService } from './auth.service';

@Injectable()
export class EventService {

  EVENTS_URL = '/events';

  constructor(private af: AngularFire,
    private whenwhereService: WhenWhereService,
    private authService: AuthService
  ) { };

  createEvent(groupId: string, name: string, description: string, when: string, where: string) {
    return Promise.resolve()
      .then(() => {
        const userId = this.authService.getCurrentUserId();
        return this.af.database.list(this.EVENTS_URL).push({
          name: name,
          description: description || "",
          groupId: groupId,
          createdBy: userId
        })
          .then((item) => {
            const eventId = item.key;
            return this.whenwhereService.createWhenWhere(eventId, when, where);
          });
      });
  };

  getEvents(groupId: string) {
    return Promise.resolve()
      .then(() => {
        const events = this.af.database.list(this.EVENTS_URL, {
          query: {
            orderByChild: 'groupId',
            equalTo: groupId
          }
        });
        return events;
      });
  };

  deleteEvent(eventId: string) {
    return Promise.resolve()
      .then(() => {
        return this.af.database.list(this.EVENTS_URL).remove(eventId)
          .then(() => {
            // TODO Ensure that all references to this event are deleted
            // from all objects
          });
      });
  };

  editEvent(eventId: string, name: string, description: string) {
    return Promise.resolve()
      .then(() => {
        const event = this.af.database.object(this.EVENTS_URL + '/' + eventId);
        event.update({ name: name, description: description });
      });
  };

  deleteEventsFromGroupId(groupId: string) {
    return Promise.resolve()
      .then(() => {
        return this.getEvents(groupId);
      })
      .then((events) => {
        // TODO This is super brittle, there has to be a way to batch
        // delete in Firebase...we can possibly perfrom this action as
        // a cloud function.
        events.forEach((data) => {
          data.forEach((event) => {
            this.af.database.list(this.EVENTS_URL).remove(event.$key);
          });
        });
      });
  };

  proposeWhenWhere(eventId: string, time: string, location: string) {
    return Promise.resolve()
      .then(() => {
        return this.af.database.list(this.EVENTS_URL, {
          query: {
            orderByChild: 'eventId',
            equalTo: eventId
          }
        });
      });
  };
}
