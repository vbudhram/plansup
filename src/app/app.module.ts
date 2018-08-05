import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { CoreApp } from './app.component';

// Page definitions
import { EventPage } from '../pages/event/event';
import { EventsPage } from '../pages/events/events';
import { AddEventPage } from '../pages/add-event/add-event';

import { ProfilePage } from '../pages/profile/profile';

import { GroupsPage } from '../pages/groups/groups';
import { AddGroupPage } from '../pages/add-group/add-group';

import { GroupPage } from '../pages/group/group';
import { AddWWPage } from '../pages/add-ww/add-ww';

import { LoginPage } from '../pages/login/login';

import { UserMetaPage } from '../pages/user-meta/user-meta';

import { TabsPage } from '../pages/tabs/tabs';

import { GroupPopoverMenu } from '../pages/groups/popover-menu';
import { EventPopoverMenu } from '../pages/group/popover-menu';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// Dynamically generated app config
import { AppConfig } from '../providers/config/config';

// AF2 Settings
export const firebaseConfig = AppConfig.FIREBASE;

const declarations = [
    CoreApp,
    
    // Groups Page defintions
    GroupsPage,
    GroupPopoverMenu,
    AddGroupPage,

    // Group Page defintions
    GroupPage,    
    EventPopoverMenu,
    AddWWPage,

    //Events Page definitions
    EventsPage,
    
    // Event Page defintions
    EventPage,
    AddEventPage,

    // Login Page defintions
    LoginPage,

    // User Meta definitions
    UserMetaPage,

    // Profile Page defintions
    ProfilePage,

    TabsPage
  ];

@NgModule({
  declarations: declarations,
  imports: [
    IonicModule.forRoot(CoreApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: declarations,
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule { }
