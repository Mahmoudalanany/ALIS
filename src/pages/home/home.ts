import { Component , NgZone } from '@angular/core';
import { NavController , Platform } from 'ionic-angular';

declare var ApiAIPromises: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  answers = [];
  CurrentTime;
  GreyText;
  PurpleText;

  constructor(public navCtrl: NavController, public platform: Platform, public ngZone: NgZone) {
    var hours = new Date().getHours()
    var minutes = new Date().getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var minutesupdated = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutesupdated + ' ' + ampm;
    this.CurrentTime = strTime;

    platform.ready().then(() => {
      ApiAIPromises.init({
        clientAccessToken: "294dbb12e7f242119a3501a34da745ef"
      }).then(result => console.log(result));
    }).catch(e => {console.log(e);});
  }

  ask(question) {
      ApiAIPromises.requestText({
      query: question
    })
      .then(({ result: { fulfillment: { speech } } }) => {
        this.ngZone.run(() => {
          this.GreyText = question;
          this.answers.pop();
          this.answers.push(speech);
        });
      }).catch(e => {
        console.log(e);
      }) 
  }

}
