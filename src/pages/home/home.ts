import { MyApp } from './../../app/app.component';
import { User } from './../../models/user/user.model';
import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

declare var ApiAIPromises: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  showImage = true;
  answers = [];
  CurrentTime;
  GreyText;
  PurpleText;
  chats = [];

  step = 0;
  userPhone = '';
  user: User = {
    Name: '',
    Age: undefined,
    Gender: '',
    Grade: '',
    High_School_Name: '',
    High_School_Degree: ''
  };

  constructor(public navCtrl: NavController, public platform: Platform, public ngZone: NgZone, private afDatabase: AngularFireDatabase) {
    var hours = new Date().getHours()
    var minutes = new Date().getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var minutesupdated = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutesupdated + ' ' + ampm;
    this.CurrentTime = strTime;

    platform.ready().then(() => {
      ApiAIPromises.init({
        clientAccessToken: "7327b7cfa4a144a0b3924da4f9b375b9"
      })
    })
  }

  // ionViewWillLoad() {
  //   var user_found = false;
  //   console.log("Initializing...");
  //   this.afDatabase.database.ref('/users').child(this.app.Token).once('value').then((snapshot) => {
  //     if (snapshot.exists()) {
  //       //sign in using app Token
  //       user_found = true;
  //       console.log(snapshot.val());
  //     }
  //   });
  //   //   else if () {
  //   //   //sign in using phone

  //   // }
  //   // else {
  //   //   //sign up & put new token
  //   // }
  // }

  ionViewDidLoad() {
    console.log("I'm alive!");
  }

  ask(question) {
    this.answers.pop();
    ApiAIPromises.requestText({ query: question})
      .then(({ result: { fulfillment: { speech } } }) => {
        this.ngZone.run(() => {
          this.answers.push(speech);
        });
      }).catch(e => {
        console.log(e);
      })
    this.GreyText = question;
    this.chats.pop();
    this.chats.push(question);
  }
}