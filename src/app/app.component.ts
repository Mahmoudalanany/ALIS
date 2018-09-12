import { SharingService } from './../services/Sharing-Service/SharingService.service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FCM } from '@ionic-native/fcm';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private fcm: FCM, private Share: SharingService) {
    //Notifications
      fcm.subscribeToTopic('all');
      fcm.getToken().then(token => {
        console.log(token);
        this.Share.setToken(token);
      })
      fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });
      //end notifications.
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

