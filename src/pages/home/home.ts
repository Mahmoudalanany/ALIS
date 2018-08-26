import { SharingService } from './../../services/Sharing-Service/SharingService.service';
import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Platform, Content } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import * as APIModule from 'apiai';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  chats = []; //User Message
  answers = []; //ALIS Reply
  CurrentTime = []; //Message's Sent Time
  showImage = []; //array indicating there is a message or no
  DisplayImage = []; //array containing the images
  tutorsData = [];
  Tutors = [];
  Token = '';
  question: string;
  API_Agent: APIModule.Application;


  ionViewDidLoad() {
    console.log("Welcome To ALIS's Log !");
  }

  display(){
    document.getElementById("sending").innerText = "hi";
  }

  constructor(public navCtrl: NavController, public platform: Platform, public ngZone: NgZone, private afDatabase: AngularFireDatabase, private Share: SharingService) {

    platform.ready().then(() => {
      this.API_Agent = APIModule("7327b7cfa4a144a0b3924da4f9b375b9");
      this.Token = this.Share.getToken();
      console.log("Initializing...");
      //sign in by token
      this.afDatabase.database.ref('/users').once('value').then((snapshot1) => {
        if (snapshot1.child(this.Token).exists()) {
          this.API_Agent.eventRequest({ name: "Welcome", data: { 'Name': snapshot1.child(this.Token).child('Name').val() } }, { sessionId: '0123456789' })
            .once('response', ({ result: { fulfillment: { speech } } }) => {
              console.log(speech + "😊");
              this.answers.push(speech);
            }).once('error', (error) => {
              console.log(error);
            }).end();
        } else {
          this.API_Agent.eventRequest({ name: "Welcome" }, { sessionId: '0123456789' })
            .once('response', ({ result: { fulfillment: { speech } } }) => {
              console.log(speech + "😊");
              this.answers.push(speech);
            }).once('error', (error) => {
              console.log(error);
            }).end();
        }
      });
    })
  }

  ask(question) {
    this.chats.push(this.question);
    this.content.scrollToBottom();
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var minutesupdated = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutesupdated + ' ' + ampm;
    this.CurrentTime.push(strTime);
    var output = 'Message Recieved';

    this.API_Agent.textRequest(this.question, { sessionId: '0123456789' })
      .once('response', ({ result }) => {
        if (result.action == "SignIn.SignIn-custom") {
          this.afDatabase.database.ref('/users').once('value').then((snapshot1) => {
            if (snapshot1.exists()) {
              snapshot1.forEach((snapshot2) => {
                if (snapshot2.child('Phone').val() == result.parameters['phone-number']) {
                  if (snapshot2.child('Phone').ref.parent.key != this.Token) {
                    var child = snapshot2.child('Phone').ref.parent;
                    child.once('value').then((replace) => {
                      child.parent.child(this.Token).set(replace.val());
                      child.remove();
                    });
                  }
                  this.API_Agent.eventRequest({ name: "Welcome", data: { 'Name': snapshot2.child('Name').val() } }, { sessionId: '0123456789' })
                    .once('response', ({ result: { fulfillment: { speech } } }) => {
                      console.log(speech + "😊");
                      this.chats.push(this.question);
                      this.answers.push(speech);
                    }).once('error', (error) => {
                      console.log(error);
                    }).end();
                  return true;
                } else {
                  console.log("Sorry, I can't find your number. You can sign up again!😊");
                  this.answers.push("Sorry, I can't find your number. You can sign up again!😊");
                }
              })
            } else {
              console.log("I think you should sign up!😊");
              this.answers.push("I think you should sign up!😊");
            }
          })
        } else if (result.action == "SignUp-Name-Phone") {
          this.ADD_User_Name_and_Phone(result.parameters["phone-number"], result.contexts[0].parameters["Name"]).then().catch();
          console.log(result.fulfillment.speech);
          this.answers.push(result.fulfillment.speech);
        }
        else if (result.action == "needTutor") {

          var teachers = [];
          var teacherDocsValues = ``;

          var paramSubject = result.parameters.tutorSubject;
          this.afDatabase.database.ref('/tutors').orderByChild('subject').equalTo(`${paramSubject.toLowerCase()}`)
            .on('value', (snapshot) => {

              snapshot.forEach((data) => {
                teachers.push(data.val());
              });

              this.tutorsData = teachers;
              console.log('teachers -->', this.tutorsData);

              var i = 0;
              var tutorsinfo = '';
              for (i = 0 ; i < this.tutorsData.length ; i++)
              {
                console.log(this.tutorsData[i].image);
                console.log(this.tutorsData[i].name);
                console.log(this.tutorsData[i].salary);
                console.log(this.tutorsData[i].subject);

                this.Tutors.push(this.tutorsData[i].name); //for tutors drop down options

                tutorsinfo += "Tutor Number " + i+1 + " Name is" + this.tutorsData[i].name + " of subject " + this.tutorsData[i].subject + " for " + this.tutorsData[i].salary + " L.E and image = "+ this.tutorsData[i].image + "\n \n";
              }
              this.answers.push(tutorsinfo);
            })
        }
         else {
          console.log(result.fulfillment.speech);
          this.answers.push(result.fulfillment.speech);
        }
      }).once('error', (error) => {
        console.log(error);
      }).end();

      this.question = null;
    }

  ADD_User_Name_and_Phone(Phone: string, Name: string) {
    return this.afDatabase.database.ref('/users').child(this.Token).update({
      Name: Name,
      Phone: Phone
    });
  };
}
