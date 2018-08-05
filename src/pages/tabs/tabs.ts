import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GroupsPage } from '../groups/groups';
import { EventsPage } from '../events/events';
import { GroupService } from '../../providers/groups.service';
import { WhenWhereService } from '../../providers/whenwhere.service';
import { EventService } from '../../providers/events.service';
import { AuthService } from '../../providers/auth.service';
import { UserMetaPage } from '../user-meta/user-meta';
import { UserMetaService } from '../../providers/user-meta.service';
import { ProfilePage } from '../profile/profile';
import { AngularFire } from 'angularfire2';

@Component({
  templateUrl: 'tabs.html',
  providers: [GroupService, EventService, WhenWhereService, AuthService, UserMetaService]
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = GroupsPage;
  tab2Root: any = EventsPage;
  tab3Root: any = ProfilePage;

  constructor(navCont: NavController, public af: AngularFire, public userMetaService: UserMetaService) { 
    userMetaService.getUserMeta().subscribe(meta => {
      if(!this.userMetaService.isUserMetaSet(meta)) {
        navCont.push(UserMetaPage);
      }
    });
  }
}
