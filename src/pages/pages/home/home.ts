import { FIREBASE_CONFIG } from './../../app/firebase.credentials';
import { User } from './../../models/user/user.model';
import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams, Content } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/functions';
firebase.initializeApp(FIREBASE_CONFIG);

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

  constructor(public navCtrl: NavController, public platform: Platform, public ngZone: NgZone) {
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
        clientAccessToken: "e1fa9f39f9b344088ebb4636c307da50"
      }).then(result => console.log(result));
    }).catch(e => { console.log(e); });
  }

  ionViewDidLoad() {
    console.log("I'm alive!");
  }

  ask(question) {
    this.answers.pop();
    if (this.step < 99) {
      this.SignUp(question);
    }
    else {
      console.log("Signed up completely");
      ApiAIPromises.requestText({
        query: question
      })
        .then(({ result: { fulfillment: { speech } } }) => {
          console.log(JSON.parse(speech));
          //console.log(JSON.parse(speech).data[0]["name"]);

          this.ngZone.run(() => {
            this.answers.push(speech);
          });
        }).catch(e => {
          console.log(e);
        })
    }
    this.GreyText = question;
    this.chats.pop();
    this.chats.push(question);
  }



  SignUp(reply: string) {
    console.log("The current step is " + this.step);
    if (this.step == 0) {
      this.answers.push("Welcome to Alis , Please Enter your number");
      this.step = 1;
    }
    else if (this.step == 1) {
      //check phone 
      this.userPhone = reply;
      if (this.userPhone) // check number and database
      {
        //1)check valid number

        //2)check in database
        firebase.functions().httpsCallable('checkPhoneNumber')(this.userPhone).then((result) => {
          if (result.data) {
            console.log("exists");
            firebase.functions().httpsCallable('RetrievePhoneNumber')(this.userPhone).then((result) => {
              //feh number we name bas mafish ay hagah b2yaa
              console.log(result.data);

              if (result.data.Name == undefined) {
                this.step = 2;
                this.answers.push("What is your Name ?");
                return;
              }
              else {
                this.user.Name = result.data.Name;
              }

              if (result.data.Age == undefined) {
                this.step = 3;
                this.answers.push(`How Old Are You , ${this.user.Name} ?`);
              }
              else if (result.data.Gender == undefined) {
                this.step = 4;
                this.answers.push(`Male or Female , ${this.user.Name} ?`);
              }
              else if (result.data.Grade == undefined) {
                this.step = 5;
                this.answers.push(`What is your School Grade , ${this.user.Name} ?`);
              }
              else if (result.data.High_School_Name == undefined) {
                this.step = 6;
                this.answers.push(`Which school do you attend , ${this.user.Name} ?`);
              }
              else if (result.data.High_School_Degree == undefined) {
                this.step = 7;
                this.answers.push(`IG , SAT or National , ${this.user.Name} ?`);
              }
              else {
                this.step = 1000;
                this.answers.push(`Welcome ${this.user.Name}, How can I help you ?`);
              }
            });
          }

          else {
            console.log("Doesn't exist");
            this.step = 2;
            this.answers.push("What is your Name ?");
          }
        })
      }
    }
    else if (this.step == 2) {
      this.user.Name = reply;
      //insert database *Phone as Key, Name as value*
      firebase.functions().httpsCallable('ADD_User_Name')({ Phone: this.userPhone, data: this.user.Name });
      this.step = 3;
      this.answers.push(`How Old Are You , ${this.user.Name} ?`);
    }
    else if (this.step == 3) {
      this.user.Age = parseInt(reply);
      //insert database
      firebase.functions().httpsCallable('ADD_User_Age')({ Phone: this.userPhone, data: this.user.Age });
      this.step = 4;
      this.answers.push(`Male or Female , ${this.user.Name} ?`);
    }

    else if (this.step == 4) {
      this.user.Gender = reply;
      //insert database
      firebase.functions().httpsCallable('ADD_User_Gender')({ Phone: this.userPhone, data: this.user.Gender });
      this.step = 5;
      this.answers.push(`What is your School Grade , ${this.user.Name} ?`);
    }

    else if (this.step == 5) {
      this.user.Grade = reply;
      //insert database
      firebase.functions().httpsCallable('ADD_User_Grade')({ Phone: this.userPhone, data: this.user.Grade });
      this.step = 6;
      this.answers.push(`Which school do you attend , ${this.user.Name} ?`);
    }
    else if (this.step == 6) {
      this.user.High_School_Name = reply;
      //insert database
      firebase.functions().httpsCallable('ADD_User_High_School_Name')({ Phone: this.userPhone, data: this.user.High_School_Name });
      this.step = 7;
      this.answers.push(`IG , SAT or National , ${this.user.Name} ?`);
    }
    else if (this.step == 7) {
      this.user.High_School_Degree = reply;
      //insert database
      firebase.functions().httpsCallable('ADD_User_High_School_Degree')({ Phone: this.userPhone, data: this.user.High_School_Degree });
      this.step = 1000;
      this.answers.push(`Welcome ${this.user.Name}, How can I help you ?`);
    }
  }
}