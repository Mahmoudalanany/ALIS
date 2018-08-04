import { Component , NgZone , ViewChild } from '@angular/core';
import { NavController , Platform , NavParams , Content} from 'ionic-angular';

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

  ionViewDidLoad() {
    console.log("I'm alive!");
  }
  
  ask(question) {
      ApiAIPromises.requestText({
      query: question
    })
      .then(({ result: { fulfillment: { speech } } }) => {
        this.ngZone.run(() => {
          this.answers.pop();
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
