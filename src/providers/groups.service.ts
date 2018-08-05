/**
 * Service that manages groups.
 *
 * Created by vbudhram on 3/19/17.
 */
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { EventService } from './events.service';
import { AuthService } from './auth.service';

@Injectable()
export class GroupService {

  GROUPS_URL = '/groups';
  groups: FirebaseListObservable<any>;

  constructor(private af: AngularFire,
    private eventService: EventService,
    private authService: AuthService) {
    this.groups = this.af.database.list(this.GROUPS_URL);
  };

  generateInviteCode(): string {
    const codeLength = 6;
    let inviteCode = '';

    // Removed lowercase, I,L,O to decrease confusion with the codes
    const possible = "ABCDEFGHJKMNPQRSTUVWXYZ0123456789";

    for (var i = 0; i < codeLength; i++) {
      inviteCode += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return inviteCode;
  }

  getGroups() {
    // TODO This needs to be filtered on a user
    return Promise.resolve(this.groups);
  };

  createGroup(name: string, description: string) {
    const inviteCode = this.generateInviteCode();
    const userId = this.authService.getCurrentUserId();
    return Promise.resolve()
      .then(() => {
        this.groups.push({
          inviteCode: inviteCode,
          name: name,
          description: description,
          createdBy: userId
        });
      });
  };

  deleteGroup(key: string) {
    return Promise.resolve()
      .then(() => {
        // Remove all associated events
        return this.eventService.deleteEventsFromGroupId(key);
      })
      .then(() => {
        return this.groups.remove(key);
      });
  };

  editGroup(group: any, name: string, description: string) {    
    const updatedGroup = this.af.database.object(this.GROUPS_URL + '/' + group.$key);
    return updatedGroup.update({ name: name, description: description });
  };
}