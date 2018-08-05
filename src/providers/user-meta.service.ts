import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { AuthService } from './auth.service';

/*
  Generated class for the UserMeta provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserMetaService {

  USER_META_URL = '/usermeta';
  private userMeta: FirebaseObjectObservable<UserMeta>;

  constructor(private af: AngularFire, private authService: AuthService) {
    console.log('Hello UserMeta Provider');
    authService.onUserChange().subscribe(user => {
      if(user) {
        this.userMeta = this.af.database.object(this.USER_META_URL + '/' + user.uid);
      }
      else {
        this.userMeta = null;
      }
    });
  }

  createUserMeta(userMeta: UserMeta): firebase.Promise<void> {
    return this.userMeta.set(userMeta);
  }

  getUserMeta(): FirebaseObjectObservable<UserMeta> {
    return this.userMeta;
  }

  updateUserMeta(userMeta: UserMeta): firebase.Promise<void> {
    return this.userMeta.update(userMeta);
  }

  isUserMetaSet(userMeta: UserMeta): boolean {
    if(userMeta && userMeta.firstName && userMeta.lastName) {
      return true;
    }
    else {
      return false;
    }
  }
}

export interface UserMeta {
  // userId?: string;
  firstName: string;
  lastName: string;
  phoneNumber?: number;
}