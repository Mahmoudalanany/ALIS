import { FCM } from '@ionic-native/fcm';
import { Calendar } from '@ionic-native/calendar';
import { Network } from '@ionic-native/network';
import { SharingService } from './../../services/Sharing-Service/SharingService.service';
import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Platform, Content, AlertController, Alert } from 'ionic-angular';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { Contacts } from '@ionic-native/contacts';
import * as APIModule from 'apiai';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Slides } from 'ionic-angular';
const uuidv1 = require('uuid/v1');


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;

  chat = ''; //User Message
  answer = ''; //ALIS Reply
  CurrentTime = ''; //Message's Sent Time
  Tutors = [];
  universities = [];
  schools = [];
  options = [];
  need_tutor = 0;
  need_universty = 0;
  need_school = 0;
  Token = '';
  question = '';
  SU_name = '';
  rated;
  API_Agent: APIModule.Application;
  uuid;
  session_log = '';
  session_date;
  connected: Subscription;
  disconnected: Subscription;
  offline_alert: Alert;

  Friends = []
  Show_Friends = false
  Select_Friends = false
  Current_Tutor;
  Intent_type = 'Welcome'
  Intent_data;
  tutor_Feedback = false;
  Alis_first = false
  SignedIn = false
  Show_date = false
  Show_time = false
  Show_ChooseTime = false
  Show_ChooseFriends = false
  Notification_data;
  Current_Group = [];
  Study_Groups = [];
  Show_groups = 0;
  Select_Groups = false
  applicants = []
  Show_applicants = false;
  Show_application = false;
  Select_Applicants = false;
  Show_Interview_slots = false
  Interview_slots = []
  allQuestions = [];
  formQuestion = false;
  questionNumber = 0;
  formAnswers = [];
  Show_duration = false
  Show_ChooseDuration = false
  Show_WritePlace = false
  Careers = [];
  Show_Career = false;
  constructor(public navCtrl: NavController, public platform: Platform, public ngZone: NgZone, private afDatabase: AngularFireDatabase, private Share: SharingService, private contacts: Contacts, private network: Network, private calendar: Calendar, private alertCtrl: AlertController, private fcm: FCM, private http: HttpClient) {
    this.ngZone.run(() => {
      this.offline_alert = this.alertCtrl.create({
        title: "You're offline",
        subTitle: "Alis can't reach you without internet connection",
        enableBackdropDismiss: false
      });
    })
    if (!navigator.onLine) {
      this.ngZone.run(() => {
        this.offline_alert.present();
      })
    }

    fcm.onNotification().subscribe(notification => {
      this.ngZone.run(() => {
        this.SignedIn = true;
      })
      if (notification.wasTapped) {
        console.log("Received in background");
        this.ngZone.run(() => {
          this.Intent_type = notification.type
        })
        this.ngZone.run(() => {
          this.Intent_data = JSON.parse(notification.data)
        })
        console.log(this.Intent_type);
        console.log(this.Intent_data);
      } else {
        console.log("Received in foreground");
        console.log(notification);

      };
    })

    platform.ready().then(() => {
      this.ngZone.run(() => {
        this.API_Agent = APIModule("7327b7cfa4a144a0b3924da4f9b375b9");
      })
      this.ngZone.run(() => {
        this.uuid = uuidv1()
      })
      this.ngZone.run(() => {
        this.session_date = new Date().toLocaleDateString()
      })
      this.afDatabase.database.ref(`sessions/${this.uuid}/Date`).set(this.session_date)
      this.ngZone.run(() => {
        this.Token = this.Share.getToken();
      })
      this.Update_Time()
      this.ngZone.run(() => {
        this.Alis_first = true
      })
      if (this.Intent_type == "Welcome") {
        this.afDatabase.database.ref('/users').once('value').then((snapshot1) => {
          if (snapshot1.child(this.Token).exists()) {
            this.API_Agent.eventRequest({ name: "Welcome", data: { 'Name': snapshot1.child(this.Token).child('First_name').val() } }, { sessionId: this.uuid })
              .once('response', ({ result: { fulfillment: { speech } } }) => {
                speech = speech + "😊";
                this.ngZone.run(() => {
                  this.answer = speech;
                })
                this.session_log += 'Alis:' + this.answer + '<*>'
                this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
                this.afDatabase.database.ref('options').child("Default Welcome Intent").once('value').then(snapshot => { this.ngZone.run(() => { this.options = snapshot.val() }) })
                this.ngZone.run(() => {
                  this.SignedIn = true;
                })
              }).once('error', (error) => {
                console.log(error);
              }).end();
          } else {
            this.API_Agent.eventRequest({ name: "SignUp" }, { sessionId: this.uuid })
              .once('response', ({ result: { fulfillment: { speech } } }) => {
                this.ngZone.run(() => {
                  this.answer = "Hello I'm Alis, " + speech;
                })
                this.session_log += 'Alis: ' + this.answer + '<*>'
                this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
                this.afDatabase.database.ref('options').child("Sign In").once('value').then(snapshot => { this.ngZone.run(() => { this.options = snapshot.val() }) })
              }).once('error', (error) => {
                console.log(error);
              }).end();
          }
        });
      }
      else if (this.Intent_type == "Rating") {
        this.API_Agent.eventRequest({ name: "getFeedback" }, { sessionId: this.uuid })
          .once('response', ({ result: { fulfillment: { speech } } }) => {
            this.ngZone.run(() => {
              this.answer = speech;
            })
            this.session_log += 'Alis: ' + this.answer + '<*>'
            this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
            this.afDatabase.database.ref('options').child("getFeedback").once('value').then(snapshot => { this.ngZone.run(() => { this.options = snapshot.val() }) })
          }).once('error', (error) => {
            console.log(error);
          }).end();
      }
      else if (this.Intent_type == "Study_group_Invitation") {
        this.API_Agent.eventRequest({ name: "Study_group_Invitation", data: { 'Name': this.Intent_data["Name"], 'Date': this.Intent_data["Date"], 'Time': this.Intent_data["Time"], 'Place': this.Intent_data["Place"] } }, { sessionId: this.uuid })
          .once('response', ({ result: { fulfillment: { speech } } }) => {
            this.ngZone.run(() => {
              this.answer = speech;
            })
            this.session_log += 'Alis: ' + this.answer + '<*>'
            this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
            this.ngZone.run(() => {
              this.SignedIn = true;
            })
            this.ngZone.run(() => {
              this.Show_groups = 2;
            })
            this.afDatabase.database.ref(`users/${this.Token}/Study groups/${this.Intent_data["Study_Token"]}/People`).once('value').then(snapshot1 => {
              let People = []
              snapshot1.forEach(snapshot2 => {
                let Person = {};
                this.afDatabase.database.ref('users').once('value').then(snapshot3 => {
                  snapshot3.forEach(snapshot4 => {
                    if (snapshot4.child("Phone").val() == snapshot2.key) {
                      Person = {
                        Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                        Status: snapshot2.val()
                      }
                      People.push(Person)
                    }
                    if (snapshot4.key == this.Token && snapshot4.child("Phone").val() == snapshot2.key && snapshot2.val() == "Pending") {
                      this.ngZone.run(() => {
                        this.Select_Groups = true
                      })
                    }
                  })
                })
              })
              this.ngZone.run(() => {
                this.Current_Group["Study_People"] = People
              })
              this.ngZone.run(() => {
                this.Current_Group["Study_Token"] = this.Intent_data["Study_Token"]
              })
            })
          }).once('error', (error) => {
            console.log(error);
          }).end();
      }
      else if (this.Intent_type == "Study_group_Reply") {
        this.ngZone.run(() => {
          this.answer = `Here are the people in the study group on ${this.Intent_data["Date"]} at ${this.Intent_data["Time"]} in ${this.Intent_data["Place"]}`
        })
        this.session_log += 'Alis: ' + this.answer + '<*>'
        this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
        this.ngZone.run(() => {
          this.SignedIn = true;
        })
        this.ngZone.run(() => {
          this.Show_groups = 2;
        })
        this.afDatabase.database.ref(`users/${this.Token}/Study groups/${this.Intent_data["Study_Token"]}/People`).once('value').then(snapshot1 => {
          let People = []
          snapshot1.forEach(snapshot2 => {
            let Person = {};
            this.afDatabase.database.ref('users').once('value').then(snapshot3 => {
              snapshot3.forEach(snapshot4 => {
                if (snapshot4.child("Phone").val() == snapshot2.key) {
                  Person = {
                    Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                    Status: snapshot2.val()
                  }
                  People.push(Person)
                }
              })
            })
          })
          this.ngZone.run(() => {
            this.Current_Group["Study_People"] = People
          })
        })
      }
      else if (this.Intent_type == "Student_activity_Acceptance") {
        this.ngZone.run(() => {
          this.answer = `Please select a slot for ${this.Intent_data["SU_name"]} interview:`
        })
        this.session_log += 'Alis: ' + this.answer + '<*>'
        this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
        this.afDatabase.database.ref(`${this.Intent_data["SU_name"]}/slots`).once('value').then(snapshot1 => {
          snapshot1.forEach(snapshot2 => {
            let slot = {}
            slot["Date"] = snapshot2.child('date').val()
            slot["Start_time"] = snapshot2.child('startTime').val()
            slot["End_time"] = snapshot2.child('endTime').val()
            slot["Place"] = snapshot2.child('place').val()
            this.ngZone.run(() => {
              this.Interview_slots.push(slot)
            })
          })
        })
        this.ngZone.run(() => {
          this.Show_Interview_slots = true
        })
      }
    })
  }

  ask() {
    if (this.question == undefined || this.question == null || this.question.trim() == '') {
      this.ngZone.run(() => {
        this.question = null;
      })
      return;
    }
    this.ngZone.run(() => {
      this.answer = "Alis is typing...";
      this.need_universty = 0;
      this.need_school = 0;
      this.Alis_first = false
      this.need_tutor = 0;
      this.tutor_Feedback = false
      this.rated = null
      this.Friends = []
      this.Show_Friends = false
      this.Select_Friends = false
      this.Show_date = false
      this.Show_time = false
      this.Show_ChooseTime = false
      this.Show_ChooseFriends = false
      this.Current_Group = []
      this.Study_Groups = []
      this.Show_groups = 0
      this.Select_Groups = false
      this.applicants = []
      this.Show_applicants = false
      this.Show_application = false;
      this.Select_Applicants = false
      this.Show_Interview_slots = false
      this.Interview_slots = []
      this.Show_duration = false
      this.Show_ChooseDuration = false
      this.Show_WritePlace = false
      this.Careers = []
      this.Show_Career = false;
    })
    this.content.scrollToBottom();
    this.ngZone.run(() => {
      this.chat = this.question;
    })
    this.session_log += 'User:' + this.question + '<*>'
    this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
    this.Update_Time()
    this.content.scrollToBottom();


    if (this.formQuestion) {
      this.ngZone.run(() => {
        this.formAnswers.push(this.question);
        this.questionNumber += 1;
        this.answer = this.allQuestions[this.questionNumber];
      })
      this.session_log += 'Alis: ' + this.answer + '<*>'
      this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)

      if (this.allQuestions.length == this.questionNumber) {
        this.addFormAnswers(this.formAnswers);
        this.relevantMajors()
        this.afDatabase.database.ref(`users/${this.Token}/PossibleMajors`).once('value').then(snapshot1 => {
          if (snapshot1.exists()) {
            let majors = []
            snapshot1.forEach(snapshot2 => {
              majors.push({ 'Major': snapshot2.key, 'Rank': snapshot2.val() })
            })
            console.log(majors.sort(function (a, b) { return b.Rank - a.Rank }));
            majors.forEach(major => {
              this.ngZone.run(() => {
                this.answer += major['Major'] + '\n'
              })
            })
          }
        })
        this.ngZone.run(() => {
          this.questionNumber = 0;
          this.formQuestion = false;
        })
        this.session_log += 'Alis: ' + this.answer + '<*>'
        this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
      }
    }
    else {
      this.API_Agent.textRequest(this.question, { sessionId: this.uuid })
        .once('response', ({ result }) => {
          if (result.action == "SignIn.SignIn-phone") {
            this.afDatabase.database.ref('/users').once('value').then((snapshot1) => {
              if (snapshot1.exists()) {
                let phonefound = false
                snapshot1.forEach((snapshot2) => {
                  if (snapshot2.child('Phone').val() == result.parameters['phone-number']) {
                    phonefound = true
                    if (snapshot2.child('Phone').ref.parent.key != this.Token) {
                      var child = snapshot2.child('Phone').ref.parent;
                      child.once('value').then((replace) => {
                        child.parent.child(this.Token).set(replace.val());
                        child.remove();
                      });
                    }
                    this.API_Agent.eventRequest({ name: "Welcome", data: { 'Name': snapshot2.child('First_name').val() } }, { sessionId: this.uuid })
                      .once('response', ({ result: { fulfillment: { speech } } }) => {
                        speech = speech + "😊";
                        this.ngZone.run(() => {
                          this.answer = speech;
                        })
                        this.session_log += 'Alis: ' + this.answer + '<*>'
                        this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
                        this.ngZone.run(() => {
                          this.SignedIn = true;
                        })
                      }).once('error', (error) => {
                        console.log(error);
                      }).end();
                  }
                })
                if (!phonefound) {
                  this.ngZone.run(() => {
                    this.answer = "Sorry, I can't find your number. You can sign up again!😊";
                  })
                  this.session_log += 'Alis: ' + this.answer + '<*>'
                  this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
                }
              } else {
                this.ngZone.run(() => {
                  this.answer = "You're my first contact!, sign up please😊";
                })
                this.session_log += 'Alis: ' + this.answer + '<*>'
                this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
              }
            })
          }
          else if (result.action == "SignUp-Credentials" && result.actionIncomplete == false) {
            this.afDatabase.database.ref('/users').once('value').then((snapshot1) => {
              if (snapshot1.exists()) {
                let phonefound = false
                snapshot1.forEach((snapshot2) => {
                  if (snapshot2.child('Phone').val() == result.parameters['phone-number']) {
                    phonefound = true
                    return
                  }
                })
                if (phonefound) {
                  this.ngZone.run(() => {
                    this.answer = "This number is already used"
                  })
                  this.session_log += 'Alis: ' + this.answer + '<*>'
                  this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
                }
                else {
                  let data = { First_name: result.parameters["First-name"], Last_name: result.parameters["Last-name"], Phone: result.parameters["phone-number"] };
                  this.addData('/users', this.Token, null, data).then().catch();
                  this.ngZone.run(() => {
                    this.answer = result.fulfillment.speech;
                  })
                  this.session_log += 'Alis: ' + this.answer + '<*>'
                  this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
                  this.ngZone.run(() => {
                    this.SignedIn = true;
                  })
                }
              }
            })
          }
          else if (result.action == "Synchronize_Friends" && this.SignedIn == true) {
            this.SyncFriends();
            this.ngZone.run(() => {
              this.answer = result.fulfillment.speech;
            })
            this.session_log += 'Alis: ' + this.answer + '<*>'
            this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
          }
          else if (result.action == "Show_Friends" && this.SignedIn == true) {
            this.ngZone.run(() => {
              this.answer = result.fulfillment.speech;
            })
            this.session_log += 'Alis: ' + this.answer + '<*>'
            this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
            this.afDatabase.database.ref(`users/${this.Token}/Friends`).once('value').then(snapshot1 => {
              if (snapshot1.exists()) {
                snapshot1.forEach(snapshot2 => {
                  this.afDatabase.database.ref('users').once('value').then(snapshot2_1 => {
                    snapshot2_1.forEach(snapshot2_2 => {
                      if (snapshot2_2.child('Phone').val() == snapshot2.val()) {
                        let Friend = {
                          Name: snapshot2_2.child('First_name').val() + " " + snapshot2_2.child('Last_name').val(),
                          Phone: snapshot2_2.child('Phone').val(),
                        }
                        this.ngZone.run(() => {
                          this.Friends.push(Friend)
                        })
                      }
                    })
                  })
                })
              }
            })
            this.ngZone.run(() => {
              this.Show_Friends = true
            })
          }
          else if (result.action == "needTutor" && result.parameters.tutorSubject != '' && this.SignedIn == true) {
            this.afDatabase.database.ref('/teachers').child(result.parameters.tutorSubject)
              .once('value').then(snapshot1 => {
                let tutors = []
                snapshot1.forEach(snapshot2 => {
                  let tutor = {
                    subject: result.parameters.tutorSubject,
                    name: snapshot2.child('name').val(),
                    phone: snapshot2.child('phone').val(),
                    image: snapshot2.child('image').val(),
                    lessons: snapshot2.child('lessons').val()
                  }
                  tutors.push(tutor);
                })
                this.ngZone.run(() => {
                  this.Tutors = tutors;
                })
                this.ngZone.run(() => {
                  this.need_tutor = 1;
                })
              })
          }
          else if (result.action == "study_level" || result.action == 'get_hobbies'
            || result.action == 'father_job' || result.action == 'mother_job'
            || result.action == 'school_name' || result.action == 'getNational'
            || result.action == 'getIGArabicGrade' || result.action == 'getIGEnglishGrade'
            || result.action == 'getIGMathGrade' || result.action == 'getIGChemistryGrade'
            || result.action == 'getIGPhysicsGrade' || result.action == 'getIGBiologyGrade'
            || result.action == 'getSat1' || result.action == 'getSat2'
            || result.action == 'getTanyaThanawyGrade' || result.action == 'getTaltaThanawyGrade'
            && this.SignedIn == true) {

            let parameters = result.parameters;
            let key = Object.keys(parameters)[0];
            let value = parameters[key]
            let data = {};
            data[key] = value;

            if (result.action == 'getIGArabicGrade' || result.action == 'getIGEnglishGrade'
              || result.action == 'getIGMathGrade' || result.action == 'getIGChemistryGrade'
              || result.action == 'getIGPhysicsGrade' || result.action == 'getIGBiologyGrade' &&
              value != '') {

              this.addData('/users', this.Token, 'IG_Grades', data).then().catch();
              this.ngZone.run(() => {
                this.answer = result.fulfillment.speech;
              })
              this.session_log += 'Alis: ' + this.answer + '<*>'
              this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
              return;
            }
            else if (result.action == 'getSat1' || result.action == 'getSat2' && value != '') {

              this.addData('/users', this.Token, 'satGrades', data).then().catch();
              this.ngZone.run(() => {
                this.answer = result.fulfillment.speech;
              })
              this.session_log += 'Alis: ' + this.answer + '<*>'
              this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
              return;
            }
            else if (result.action == 'getTanyaThanawyGrade' || result.action == 'getTaltaThanawyGrade' && value != '') {
              this.addData('/users', this.Token, 'thanawyGrades', data).then().catch();
              this.ngZone.run(() => {
                this.answer = result.fulfillment.speech;
              })
              this.session_log += 'Alis: ' + this.answer + '<*>'
              this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
              return;
            }
            if (value != '') {
              this.addData('users', this.Token, null, data).then(() => {
                console.log('Saved');
              }).catch();
            }
            this.ngZone.run(() => {
              this.answer = result.fulfillment.speech;
            })
            this.session_log += 'Alis: ' + this.answer + '<*>'
            this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
          }
          else if (result.action == 'getFeedback-yes' && this.SignedIn == true) {
            this.API_Agent.eventRequest({ name: "getFeedback-yes", data: { 'tutorName': this.Intent_data.tutorName, 'subject': this.Intent_data.subject } }, { sessionId: this.uuid })
              .once('response', ({ result: { fulfillment: { speech } } }) => {
                speech = speech + "😊";
                this.ngZone.run(() => {
                  this.answer = speech;
                })
                this.session_log += 'Alis: ' + this.answer + '<*>'
                this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
                this.ngZone.run(() => {
                  this.tutor_Feedback = true
                })
              }).once('error', (error) => {
                console.log(error);
              }).end();
          }
          else if (result.action == "Study_group_Creation" && this.SignedIn == true) {
            this.ngZone.run(() => {
              this.answer = result.fulfillment.speech;
            })
            this.session_log += 'Alis: ' + this.answer + '<*>'
            this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
            if (result.actionIncomplete == true) {
              if (result.parameters["place"] == "") {

              }
              else if (result.parameters["date"] == "") {
                this.ngZone.run(() => {
                  this.Show_date = true
                })
                this.ngZone.run(() => {
                  this.Show_ChooseTime = true
                })
              }
              else if (result.parameters["time"] == "") {
                this.ngZone.run(() => {
                  this.Show_date = false
                })
                this.ngZone.run(() => {
                  this.Show_time = true
                })
                this.ngZone.run(() => {
                  this.Show_ChooseFriends = true
                })
                this.SyncFriends()
              }
            }
            else {
              this.ngZone.run(() => {
                this.Show_time = false
              })
              this.ngZone.run(() => {
                this.Show_ChooseFriends = false
              })
              result.parameters["date"] = new Date(result.parameters["date"]).toLocaleDateString();
              result.parameters["time"] = [new Date(`${result.parameters["date"]}, ${result.parameters["time"]}`).toLocaleTimeString().split(":")["0"], new Date(`${result.parameters["date"]}, ${result.parameters["time"]}`).toLocaleTimeString().split(":")["1"]].join(":") + new Date(`${result.parameters["date"]}, ${result.parameters["time"]}`).toLocaleTimeString().slice(-3);
              this.afDatabase.database.ref(`users/${this.Token}/Friends`).once('value').then(snapshot1 => {
                if (snapshot1.exists()) {
                  snapshot1.forEach(snapshot2 => {
                    this.afDatabase.database.ref('users').once('value').then(snapshot2_1 => {
                      snapshot2_1.forEach(snapshot2_2 => {
                        if (snapshot2_2.child('Phone').val() == snapshot2.val()) {
                          let Friend = {
                            Token: snapshot2_2.key,
                            Name: snapshot2_2.child('First_name').val() + " " + snapshot2_2.child('Last_name').val(),
                            Phone: snapshot2_2.child('Phone').val(),
                            checked: false
                          }
                          this.ngZone.run(() => {
                            this.Friends.push(Friend)
                          })
                        }
                      })
                    })
                  })
                }
              })
              this.ngZone.run(() => {
                this.Show_Friends = true
              })
              this.ngZone.run(() => {
                this.Select_Friends = true
              })
              this.afDatabase.database.ref("users").child(this.Token).once('value').then(snapshot1 => {
                if (snapshot1.exists()) {
                  this.Notification_data = {
                    Title: "Study Group",
                    Body: `${snapshot1.child('First_name').val() + " " + snapshot1.child('Last_name').val()} is inviting you to a study group on ${result.parameters["date"]} at ${result.parameters["time"]} in ${result.parameters["place"]}`,
                    type: "Study_group_Invitation",
                    data: {
                      Name: `${snapshot1.child('First_name').val() + " " + snapshot1.child('Last_name').val()}`,
                      Date: `${result.parameters["date"]}`,
                      Time: `${result.parameters["time"]}`,
                      Place: `${result.parameters["place"]}`,
                      Creator: this.Token
                    }
                  }
                }
              })
            }
          }
          else if (result.action == "Manage_study_groups" && this.SignedIn == true) {
            this.ngZone.run(() => {
              this.answer = result.fulfillment.speech;
            })
            this.session_log += 'Alis: ' + this.answer + '<*>'
            this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
            this.afDatabase.database.ref(`users/${this.Token}/Study groups`).once('value').then(snapshot1 => {
              if (snapshot1.exists()) {
                this.ngZone.run(() => {
                  this.Show_groups = 1
                })
                let study_group = {};
                snapshot1.forEach(snapshot2 => {
                  study_group = {
                    Date: snapshot2.child("Date").val(),
                    Time: snapshot2.child("Time").val(),
                    Place: snapshot2.child("Place").val(),
                    Study_Token: snapshot2.key
                  }
                })
                this.ngZone.run(() => {
                  this.Study_Groups.push(study_group)
                })
              }
            })
          }
          else if (result.action == "showUniversities" && result.parameters.country != '' && this.SignedIn == true) {
            this.afDatabase.database.ref('/universtes').child(result.parameters.country).once('value').then(snapshot1 => {
              snapshot1.forEach(snapshot2 => {
                let university = snapshot2.val();
                university['country'] = result.parameters.country,
                  this.ngZone.run(() => {
                    this.universities.push(university);
                  })
              })
              this.ngZone.run(() => {
                this.need_universty = 1;
              })
              this.ngZone.run(() => {
                this.answer = 'There are some universities!';
              })
              this.session_log += 'Alis: ' + this.answer + '<*>'
              this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
            })
          }
          else if (result.action == "Schools" && result.actionIncomplete == false && this.SignedIn == true) {
            this.afDatabase.database.ref('/Schools').child(result.parameters.location).once('value').then(snapshot1 => {
              snapshot1.forEach(snapshot2 => {
                let school = snapshot2.val();
                school['Region'] = result.parameters.location,
                  this.ngZone.run(() => {
                    this.schools.push(school);
                  })
              })
              this.ngZone.run(() => {
                this.need_school = 1;
              })
              this.ngZone.run(() => {
                this.answer = result.fulfillment.speech;
              })
              this.session_log += 'Alis: ' + this.answer + '<*>'
              this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
            })
          }
          else if (result.action == "applyToStudentActivity" && result.parameters.studentActivityName != '' && this.SignedIn == true) {
            this.ngZone.run(() => {
              this.SU_name = result.parameters.studentActivityName;
            })
            this.afDatabase.database.ref(this.SU_name).child('questions').once('value')
              .then(snapshot1 => {
                snapshot1.forEach(snapshot2 => {
                  this.ngZone.run(() => {
                    this.allQuestions.push(snapshot2.val());
                  })
                })
                this.ngZone.run(() => {
                  this.answer = this.allQuestions[this.questionNumber];
                })
                this.session_log += 'Alis: ' + this.answer + '<*>'
                this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
                this.ngZone.run(() => {
                  this.formQuestion = true;
                })
              });
          }
          else if (result.action == "Interviews_Scheduling" && this.SignedIn == true) {
            this.ngZone.run(() => {
              this.answer = result.fulfillment.speech;
            })
            this.session_log += 'Alis: ' + this.answer + '<*>'
            this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
            if (result.actionIncomplete == true) {
              if (result.parameters["studentActivity"] == "") { }
              else if (result.parameters["day"] == "") {
                this.ngZone.run(() => {
                  this.Show_date = true
                })
                this.ngZone.run(() => {
                  this.Show_ChooseTime = true
                })
              }
              else if (result.parameters["startTime"] == "") {
                this.ngZone.run(() => {
                  this.Show_date = false
                })
                this.ngZone.run(() => {
                  this.Show_time = true
                })
                this.ngZone.run(() => {
                  this.Show_ChooseTime = true
                })
              }
              else if (result.parameters["endTime"] == "") {
                this.ngZone.run(() => {
                  this.Show_time = true
                })
                this.ngZone.run(() => {
                  this.Show_ChooseDuration = true
                })
              }
              else if (result.parameters["duration"] == "") {
                this.ngZone.run(() => {
                  this.Show_time = false
                })
                this.ngZone.run(() => {
                  this.Show_ChooseDuration = false
                })
                this.ngZone.run(() => {
                  this.Show_duration = true
                })
                this.ngZone.run(() => {
                  this.Show_WritePlace = true
                })
              }
              else if (result.parameters["place"] == "") {
                this.ngZone.run(() => {
                  this.Show_duration = false
                })
                this.ngZone.run(() => {
                  this.Show_WritePlace = false
                })
              }
            }
            else {
              let studentActivity = result.parameters.studentActivity;
              let dayOfInterview = result.parameters.day;
              let startTime = result.parameters.startTime;
              let endTime = result.parameters.endTime;
              let duration = result.parameters.duration;
              let place = result.parameters.place;
              let day = dayOfInterview.slice(8, 10);
              let month = dayOfInterview.slice(5, 7);
              let year = dayOfInterview.slice(0, 4);
              let daySlot = `${month}/${day}/${year}`;
              this.AddDuration(daySlot, startTime, endTime, parseInt(duration), studentActivity, place)
            }
          }
          else if (result.action == "showApplicants" && result.actionIncomplete == false && this.SignedIn == true) {
            this.ngZone.run(() => {
              this.SU_name = result.parameters.studentActivity;
            })
            this.afDatabase.database.ref(`${this.SU_name}/applicants`).once('value').then(snapshot1 => {
              snapshot1.forEach(snapshot2 => {
                let applicant = {}
                this.afDatabase.database.ref(`users/${snapshot2.key}`).once('value').then(snapshot3 => {
                  applicant["Applicant_Token"] = snapshot2.key
                  applicant["Name"] = snapshot3.child("First_name").val() + " " + snapshot3.child("Last_name").val()
                  applicant["Status"] = snapshot2.child("status").val()
                  snapshot1.ref.parent.child('questions').once('value').then(questions => applicant["Questions"] = questions.val())
                  applicant["Responses"] = snapshot2.child("responses").val()
                  applicant["IsViewed"] = false
                })
                this.ngZone.run(() => {
                  this.applicants.push(applicant)
                })
              });
            });
            this.ngZone.run(() => {
              this.Show_applicants = true;
            })
            this.ngZone.run(() => {
              this.Show_application = true
            })
            this.ngZone.run(() => {
              this.Select_Applicants = true
            })
          }
          else if (result.action == "ShowMajors" && this.SignedIn == true) {

          }
          else if (result.action == "Career_Info" && result.actionIncomplete == false && this.SignedIn == true) {
            this.afDatabase.database.ref(`Careers/${result.parameters.career}`).once('value').then(snapshot => {
              if (snapshot.exists()) {
                let career = snapshot.val()
                career["Career"] = result.parameters.career
                this.Careers.push(career)
                this.Show_Career = true
              }
            })
          }
          else if (result.action !== "input.unknown" && result.action !== "input.welcome" && result.action !== "SignIn" && result.action !== "SignUp" && result.action !== "SignUp-Credentials" && this.SignedIn == false) {
            this.ngZone.run(() => {
              this.answer = "I think you should sign in!😊"
            })
            this.session_log += 'Alis: ' + this.answer + '<*>'
            this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
          }
          else {
            this.ngZone.run(() => {
              this.answer = result.fulfillment.speech;
            })
            this.session_log += 'Alis: ' + this.answer + '<*>'
            this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
          }
          for (let index = 0; index < result.contexts.length; index++) {
            if (result.contexts[index]["name"].includes("dialog_params_")) {
              let parameter = result.contexts[index]["name"].substring(result.contexts[index]["name"].indexOf("dialog_params_") + "dialog_params_".length);
              this.afDatabase.database.ref('options').child(`${result.metadata.intentName} - ${parameter}`).once('value').then(snapshot => { this.ngZone.run(() => { this.options = snapshot.val() }) })
              break;
            }
            else if (index == result.contexts.length - 1) {
              this.afDatabase.database.ref('options').child(result.metadata.intentName).once('value').then(snapshot => { this.ngZone.run(() => { this.options = snapshot.val() }) })
            }
          }

        }).once('error', (error) => {
          console.log(error);
        }).end();
    }
    this.ngZone.run(() => {
      this.question = null;
    })
  }

  Update_Time() {
    var d = new Date(),
      time = [(d.getHours() > 12) ? d.getHours() - 12 : (d.getHours() == 0) ? "12" : d.getHours(), (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()].join(":"),
      ampm = (d.getHours() < 12) ? "AM" : "PM"
    this.ngZone.run(() => {
      this.CurrentTime = time + ' ' + ampm;
    })
  }

  addData(collection, child, nextChild, data) {
    if (nextChild) {
      return this.afDatabase.database.ref(collection).child(child).child(nextChild).update(data);
    }
    return this.afDatabase.database.ref(collection).child(child).update(data);
  }

  SyncFriends() {
    this.contacts.find(['*'])
      .then(contactslist => {
        var numbers = []
        contactslist.forEach(data => {
          if (data.name) {
            if (data.name.formatted == undefined) {
              return
            }
          }
          else {
            return
          }
          if (data.phoneNumbers) {
            let phones = new Set<string>()
            var phone_as_name = false;
            data.phoneNumbers.some(phonenumber => {
              phonenumber.value = phonenumber.value.replace(/ +/g, "");
              if (data.name.formatted.trim() != phonenumber.value) {
                phones.add(phonenumber.value)
              }
              else {
                phone_as_name = true
                return true
              }
            })
            if (phone_as_name) {
              return
            }
            phones.forEach(phone => { numbers.push({ Phone: phone, Found: false }) })
          }
        })
        var friends = []
        this.afDatabase.database.ref('/users').once('value').then((snapshot1) => {
          if (snapshot1.exists()) {
            snapshot1.forEach((snapshot2) => {
              for (let index = 0; index < numbers.length; index++) {
                if (snapshot2.child('Phone').val() !== snapshot1.child(this.Token).child('Phone').val() && snapshot2.child('Phone').val() == numbers[index].Phone && numbers[index].Found == false) {
                  numbers[index].Found = true
                  friends.push(numbers[index].Phone)
                  let data = { Friends: friends };
                  this.addData('/users', this.Token, null, data).then().catch();
                  break
                }
              }
            })
          }
        });
      });
  }

  rating(x) {
    this.ngZone.run(() => {
      this.rated = x;
    })
    let data = {}
    data[this.Intent_data.phone] = this.rated
    this.addData('/users', this.Token, 'Ratings', data).then().catch();
    this.ngZone.run(() => {
      this.answer = "Thanks for your Feedback😊"
    })
    this.session_log += 'Alis: ' + this.answer + '<*>'
    this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
  }

  Invite() {
    let group_people = {}
    let tempFriends = []
    this.Friends.forEach(Friend => {
      if (Friend.checked == true) {
        tempFriends.push(Friend)
        group_people[Friend.Phone] = "Pending"
      }
    })
    if (tempFriends !== []) {
      this.ngZone.run(() => {
        this.Show_Friends = false
      })
      this.ngZone.run(() => {
        this.Select_Friends = false
      })
      var group_key;
      var group_data = this.Notification_data.data;
      this.afDatabase.database.ref(`users/${this.Token}/Study groups`).once('value').then(snapshot1 => {
        snapshot1.ref.parent.child('Phone').once('value').then(snapshot2 => {
          group_people[snapshot2.val()] = "Joining"
          let group = {}
          group["Date"] = group_data["Date"]
          group["Time"] = group_data["Time"]
          group["Place"] = group_data["Place"]
          group["Reminder"] = this.Make_Reminder(`${group_data["Date"]}, ${group_data["Time"]}`, 24)

          group_key = snapshot1.ref.push(group).key
          snapshot1.child(group_key).ref.update({ People: group_people })
          this.Notification_data.data["Study_Token"] = group_key
          this.Notification_data.data = JSON.stringify(this.Notification_data.data)
          tempFriends.forEach(tempFriendPrimary => {
            let group_people = {}
            tempFriends.forEach(tempFriendSecondary => {
              group_people[tempFriendSecondary.Phone] = "Pending"
            })
            this.afDatabase.database.ref(`users/${tempFriendPrimary.Token}`).child("Study groups").once('value').then(snapshot1 => {
              this.afDatabase.database.ref(`users/${this.Token}`).child("Phone").once('value').then(snapshot2 => {
                group_people[snapshot2.val()] = "Joining"
                let group = {}
                group["Date"] = group_data["Date"]
                group["Time"] = group_data["Time"]
                group["Place"] = group_data["Place"]
                group["Reminder"] = this.Make_Reminder(`${group_data["Date"]}, ${group_data["Time"]}`, 24)
                snapshot1.child(group_key).ref.update(group)
                snapshot1.child(group_key).ref.update({ People: group_people })
              })
            })
            this.sendNotification(tempFriendPrimary.Token)
          })
          this.ngZone.run(() => {
            this.answer = "I invited your selected friends to the study group!😊"
          })
          this.session_log += 'Alis: ' + this.answer + '<*>'
          this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
        })
      })
    }
    else {
      this.ngZone.run(() => {
        this.answer = "Please invite at least 1 of your friends"
      })
      this.session_log += 'Alis: ' + this.answer + '<*>'
      this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
    }
  }

  Group_Select(Group) {
    this.ngZone.run(() => {
      this.answer = `Here are the people in the study group on ${Group["Date"]} at ${Group["Time"]} in ${Group["Place"]}`
    })
    this.session_log += 'Alis: ' + this.answer + '<*>'
    this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
    this.afDatabase.database.ref(`users/${this.Token}/Study groups/${Group["Study_Token"]}/People`).once('value').then(snapshot1 => {
      let People = [];
      snapshot1.forEach(snapshot2 => {
        let Person = {};
        this.afDatabase.database.ref('users').once('value').then(snapshot3 => {
          snapshot3.forEach(snapshot4 => {
            if (snapshot4.child("Phone").val() == snapshot2.key) {
              Person = {
                Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                Status: snapshot2.val()
              }
              People.push(Person)
              if (snapshot4.key == this.Token && snapshot4.child("Phone").val() == snapshot2.key && snapshot2.val() == "Pending") {
                this.ngZone.run(() => {
                  this.Select_Groups = true
                })
              }
            }
          })
        })
      })
      this.ngZone.run(() => {
        this.Current_Group["Study_People"] = People
      })
      this.ngZone.run(() => {
        this.Current_Group["Study_Token"] = Group["Study_Token"]
      })
    })
    this.ngZone.run(() => {
      this.Show_groups = 2
    })
  }

  Group_Reply(event) {
    let Study_Token = this.Current_Group["Study_Token"]
    if (event.toElement.innerHTML == "Accept") {
      this.ngZone.run(() => {
        this.answer = "You have accepted to join that study group"
      })
      this.session_log += 'Alis: ' + this.answer + '<*>'
      this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
      this.afDatabase.database.ref(`users/${this.Token}/Phone`).once('value').then(MyPhone => {
        this.afDatabase.database.ref('users').once('value').then(snapshot1 => {
          if (snapshot1.exists()) {
            snapshot1.forEach(snapshot2 => {
              let PhoneKey = snapshot2.child(`Study groups/${Study_Token}/People/${MyPhone.val()}`)
              if (PhoneKey.exists()) {
                PhoneKey.ref.set("Joining")
              }
            })
            this.afDatabase.database.ref(`users/${this.Token}/Study groups/${Study_Token}/People`).once('value').then(snapshot1 => {
              let People = [];
              snapshot1.forEach(snapshot2 => {
                let Person = {};
                this.afDatabase.database.ref('users').once('value').then(snapshot3 => {
                  snapshot3.forEach(snapshot4 => {
                    if (snapshot4.child("Phone").val() == snapshot2.key) {
                      Person = {
                        Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                        Status: snapshot2.val()
                      }
                      People.push(Person)
                    }
                  })
                })
              })
              this.ngZone.run(() => {
                this.Current_Group["Study_People"] = People
              })
            })
          }
        })
        if (this.Intent_data["Creator"] !== undefined) {
          this.afDatabase.database.ref(`users/${this.Token}`).once('value').then(snapshot => {
            this.Notification_data = {
              Title: 'Study group aceptance!',
              Body: `${snapshot.child("First_name").val() + " " + snapshot.child("Last_name").val()} has accepted to join the  study group on ${this.Intent_data["Date"]} at ${this.Intent_data["Time"]} in ${this.Intent_data["Place"]}`,
              type: 'Study_group_Reply',
              data: JSON.stringify({
                Date: `${this.Intent_data["Date"]}`,
                Time: `${this.Intent_data["Time"]}`,
                Place: `${this.Intent_data["Place"]}`,
                Study_Token: `${this.Intent_data["Study_Token"]}`
              })
            }
            this.sendNotification(this.Intent_data["Creator"])
          })
        }
      })
    }
    else if (event.toElement.innerHTML == "Refuse") {
      this.ngZone.run(() => {
        this.answer = "You have refused to join that study group"
      })
      this.session_log += 'Alis: ' + this.answer + '<*>'
      this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
      this.afDatabase.database.ref(`users/${this.Token}/Phone`).once('value').then(MyPhone => {
        this.afDatabase.database.ref('users').once('value').then(snapshot1 => {
          if (snapshot1.exists()) {
            snapshot1.forEach(snapshot2 => {
              let PhoneKey = snapshot2.child(`Study groups/${Study_Token}/People/${MyPhone.val()}`)
              if (PhoneKey.exists()) {
                PhoneKey.ref.set("Not joining")
              }
            })
            this.afDatabase.database.ref(`users/${this.Token}/Study groups/${Study_Token}/People`).once('value').then(snapshot1 => {
              let People = [];
              snapshot1.forEach(snapshot2 => {
                let Person = {};
                this.afDatabase.database.ref('users').once('value').then(snapshot3 => {
                  snapshot3.forEach(snapshot4 => {
                    if (snapshot4.child("Phone").val() == snapshot2.key) {
                      Person = {
                        Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                        Status: snapshot2.val()
                      }
                      People.push(Person)
                    }
                  })
                })
              })
              this.ngZone.run(() => {
                this.Current_Group["Study_People"] = People
              })
            })
          }
        })
        if (this.Intent_data["Creator"] !== undefined) {
          this.afDatabase.database.ref(`users/${this.Token}`).once('value').then(snapshot => {
            this.Notification_data = {
              Title: 'Study group refusal!',
              Body: `${snapshot.child("First_name").val() + " " + snapshot.child("Last_name").val()} has refused to join the  study group on ${this.Intent_data["Date"]} at ${this.Intent_data["Time"]} in ${this.Intent_data["Place"]}`,
              type: 'Study_group_Reply',
              data: JSON.stringify({
                Date: `${this.Intent_data["Date"]}`,
                Time: `${this.Intent_data["Time"]}`,
                Place: `${this.Intent_data["Place"]}`,
                Study_Token: `${this.Intent_data["Study_Token"]}`
              })
            }
            this.sendNotification(this.Intent_data["Creator"])
          })
        }
      })
    }
    this.ngZone.run(() => {
      this.Select_Groups = false
    })
    this.ngZone.run(() => {
      this.Study_Groups = []
    })
    this.ngZone.run(() => {
      this.Current_Group = []
    })
  }

  Tutor_Select(Tutor) {
    this.ngZone.run(() => {
      this.Current_Tutor = Tutor
    })
    this.ngZone.run(() => {
      this.need_tutor = 2
    })
  }

  Tutor_Reserve(i) {
    let data = {
      subject: this.Current_Tutor.subject,
      name: this.Current_Tutor.name,
      phone: this.Current_Tutor.phone,
      slot: {
        date: this.Current_Tutor.lessons[i].slot.date,
        start_time: this.Current_Tutor.lessons[i].slot.start_time,
        end_time: this.Current_Tutor.lessons[i].slot.end_time,
        reminder: this.Make_Reminder(`${this.Current_Tutor.lessons[i].slot.date}, ${this.Current_Tutor.lessons[i].slot.start_time}`, 24)
      },
      place: this.Current_Tutor.lessons[i].place,
      cost: this.Current_Tutor.lessons[i].cost
    };
    this.afDatabase.database.ref('users').child(this.Token).child('lessonsRequests').push(data);
    var dt = new Date(this.Make_Reminder(`${this.Current_Tutor.lessons[i].slot.date}, ${this.Current_Tutor.lessons[i].slot.start_time}`, 24))
    this.calendar.createEventWithOptions(`${this.Current_Tutor.subject} class`, null, null, dt, dt, { 'firstReminderMinutes': 0 })
    this.ngZone.run(() => {
      this.need_tutor = 0;
    })
    this.ngZone.run(() => {
      this.Current_Tutor = '';
    })
    this.ngZone.run(() => {
      this.Tutors = [];
    })
    this.ngZone.run(() => {
      this.answer = "I reserved your lesson! 😊";
    })
    this.session_log += 'Alis: ' + this.answer + '<*>'
    this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
  }

  Make_Reminder(datetime, hours) {
    let reminder = new Date(datetime)
    reminder.setHours(reminder.getHours() - hours)
    let date = reminder.toLocaleDateString()
    let time = [(reminder.getHours() > 12) ? reminder.getHours() - 12 : (reminder.getHours() == 0) ? "12" : reminder.getHours(), (reminder.getMinutes() < 10) ? '0' + reminder.getMinutes() : reminder.getMinutes()].join(":")
    let ampm = (reminder.getHours() < 12) ? "AM" : "PM"
    return `${date}, ${time} ${ampm}`
  }

  sendNotification(Token) {
    let payload = {
      "notification": {
        "title": this.Notification_data.Title,
        "body": this.Notification_data.Body,
        "sound": "enabled",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "drawable-hdpi-icon"
      },
      "data": {
        "type": this.Notification_data.type,
        "data": this.Notification_data.data
      },
      "to": Token,
    }
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post("https://fcm.googleapis.com/fcm/send", payload, {
      headers: options.set('Authorization', 'key=AAAAKAxjJwY:APA91bEfWiPXewKlIjvQy1kU5jEqZtBZWw6rWRQOBIesv3bmDzzExIQmOJhyZ_jgubS9T90k-XA7wTt-v8KxZwsRXf8MXCwO-oUPdJ3L7-XabAK3xsPAm8klUSRrBXnXF89fCl4t2_AXxFiLwkQahoeju1GWCYglYQ'),
    }).subscribe();
  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
  }

  selectUniversity(i) {
    let universityID = this.universities[i].university_id;
    this.afDatabase.database.ref('users').child(this.Token).child('universityInterests').push(universityID).then(() => {
      this.ngZone.run(() => {
        this.answer = "Nice, Reserved";
      })
      this.session_log += 'Alis: ' + this.answer + '<*>'
      this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
      return;
    });
  }

  AddDuration(dayOfInterview, startTime, endTime, duration, studentActivity, place) {
    startTime = [startTime.split(":")["0"], startTime.split(":")["1"]].join(":")
    endTime = [endTime.split(":")["0"], endTime.split(":")["1"]].join(":")
    let startdateTime = new Date(`${dayOfInterview}, ${startTime}`)
    let enddateTime = new Date(`${dayOfInterview}, ${endTime}`)
    let slots = []
    while (startdateTime.toLocaleString() !== enddateTime.toLocaleString()) {
      let slot = {}
      slot['startTime'] = [startdateTime.toLocaleTimeString().split(":")["0"], startdateTime.toLocaleTimeString().split(":")["1"]].join(":") + startdateTime.toLocaleTimeString().slice(-3);
      startdateTime.setMinutes(startdateTime.getMinutes() + duration)
      slot['endTime'] = [startdateTime.toLocaleTimeString().split(":")["0"], startdateTime.toLocaleTimeString().split(":")["1"]].join(":") + startdateTime.toLocaleTimeString().slice(-3);
      slot['date'] = startdateTime.toLocaleDateString();
      slot['place'] = place
      slots.push(slot);
    }
    this.afDatabase.database.ref(`${studentActivity}/slots`).set(slots);
  }

  addFormAnswers(answer) {
    this.addData(this.SU_name, `applicants/${this.Token}/responses`, null, answer);
    this.addData(this.SU_name, `applicants/${this.Token}`, null, { status: "Pending" });
  }

  Show_Applicant(applicant, i) {
    applicant["IsViewed"] = true
    this.ngZone.run(() => {
      this.applicants[i]["IsViewed"] = true
    })
  }

  Hide_Applicant(i) {
    this.ngZone.run(() => {
      this.applicants[i]["IsViewed"] = false
    })
  }

  Action_on_Applicant(event, i) {
    if (event.toElement.innerHTML == "Accept") {
      this.ngZone.run(() => {
        this.applicants[i]["Status"] = "Accepted"
      })
      this.afDatabase.database.ref(`${this.SU_name}/applicants/${this.applicants[i]["Applicant_Token"]}/status`).set("Accepted")
      this.Notification_data = {
        Title: `${this.SU_name} Application Request`,
        Body: `You have been chosen by ${this.SU_name} to be interviewed😊`,
        type: "Student_activity_Acceptance",
        data: JSON.stringify({
          SU_name: this.SU_name
        })
      }
    }
    else if (event.toElement.innerHTML == "Refuse") {
      this.ngZone.run(() => {
        this.applicants[i]["Status"] = "Refused"
      })
      this.afDatabase.database.ref(`${this.SU_name}/applicants/${this.applicants[i]["Applicant_Token"]}/status`).set("Refused")
      this.Notification_data = {
        Title: `${this.SU_name} Application Request`,
        Body: `We're sorry to tell you that you won't be able to join ${this.SU_name} for this season. Don't worry, you can still apply to other student activites😊`,
        type: "Welcome",
        data: JSON.stringify({})
      }
    }
    this.sendNotification(this.applicants[i]["Applicant_Token"])
  }

  Choose_Interview_slot(slot) {
    this.ngZone.run(() => {
      this.answer = `Thanks for your time. ${this.Intent_data["SU_name"]} is waiting to see you on ${slot.Date} at ${slot.Start_time} in ${slot.Place}`
    })
    this.session_log += 'Alis: ' + this.answer + '<*>'
    this.afDatabase.database.ref(`sessions/${this.uuid}/Text`).set(this.session_log)
    this.afDatabase.database.ref(`${this.Intent_data["SU_name"]}/applicants/${this.Token}/slot`).update({
      Date: slot.Date,
      Start_time: slot.Start_time,
      End_time: slot.End_time,
      Place: slot.Place,
      Reminder: this.Make_Reminder(`${slot.Date}, ${slot.Start_time}`, 24)
    })
    this.ngZone.run(() => {
      this.Show_Interview_slots = false
    })
    this.ngZone.run(() => {
      this.Interview_slots = []
    })
  }

  editDistance(s1, s2) {
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  similarnumber(a, b) {
    let z;
    if (a < b) {
      z = a;
      a = b;
      b = z;
    }
    var diff = a - b;
    if (diff == 0) { return 1; }
    else if (diff > 0 && diff <= 0.2) { return 0.8; }
    else if (diff > 0.2 && diff <= 0.5) { return 0.5; }
    else if (diff > 0.5 && diff <= 0.7) { return 0.3; }
    else if (diff > 0.7 && diff <= 1) { return 0.1; }
    else { return 0; }
  }

  relevantMajors() {
    let userschool;
    let usergrade;
    this.afDatabase.database.ref("/users").child(this.Token).once("value").then(snapshot => {
      userschool = snapshot.child("School").val();
      usergrade = snapshot.child("Grade").val();
      this.afDatabase.database.ref("/Old Users").once("value").then(snapshot1 => {
        snapshot1.forEach(snapshot2 => {
          let schoolname = snapshot2.child("SchoolName").val();
          let schoolgrade = snapshot2.child("Grade").val();
          let Major = snapshot2.child("Major").val();
          let MatchedCases = 0;
          let schoolSimilarity = this.similarity(userschool, schoolname) * 100;
          if (schoolSimilarity > 0) { MatchedCases++; }
          let gradeSimilarity = this.similarnumber(usergrade, schoolgrade) * 100;
          if (gradeSimilarity > 0) { MatchedCases++; }
          let totalPercent = schoolSimilarity + gradeSimilarity;
          let rank = MatchedCases * totalPercent;
          console.log("This users matched cases = " + MatchedCases + " with percentage " + totalPercent + " and rank " + rank);
          if (rank > 0) {
            let data = {};
            data[Major] = rank;
            this.addData('/users', this.Token, 'PossibleMajors', data).then().catch();
          }
        })
      })
    })
  }

  showMajors() {
    console.log("Prinitng the Majors");
    this.afDatabase.database.ref("/users").child(this.Token).child("PossibleMajors").once("value").then(snapshot1 => {
      snapshot1.forEach(snapshot2 => {
        console.log("Major = " + snapshot2.key + " of rank " + snapshot2.val());
      })
    })
  }

  ionViewDidEnter() {
    this.ngZone.run(() => {
      this.connected = this.network.onConnect().subscribe(data => {
        console.log(`You are now ${data.type} via ${this.network.type}`)
        this.ngZone.run(() => {
          this.offline_alert.dismiss();
        })
        this.ngZone.run(() => {
          this.offline_alert = this.alertCtrl.create({
            title: "You're offline",
            subTitle: "Alis can't reach you without internet connection",
            enableBackdropDismiss: false
          });
        })
      }, error => console.error(error));
    })
    this.ngZone.run(() => {
      this.disconnected = this.network.onDisconnect().subscribe(data => {
        console.log(`You are now ${data.type} via ${this.network.type}`)
        this.ngZone.run(() => {
          this.offline_alert.present();
        })
      }, error => console.error(error));
    })
  }

  ionViewWillLeave() {
    this.ngZone.run(() => {
      this.connected.unsubscribe();
    })
    this.ngZone.run(() => {
      this.disconnected.unsubscribe();
    })
  }

}