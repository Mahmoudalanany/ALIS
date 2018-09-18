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
  // limit: number = 60;
  // truncating = true;

  chat; //User Message
  answer; //ALIS Reply
  CurrentTime; //Message's Sent Time
  Tutors = [];
  universities = [];
  options = [];
  need_tutor = 0;
  need_universty = 0;
  Token = '';
  question: string;
  SU_name: string;
  SU_ques = [];
  applicant_id: string;
  filling_form = false;
  q_num = 1;
  end_of_form = false;
  rated;
  API_Agent: APIModule.Application;
  uuid;
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
  date = false
  time = false
  Study_date;
  Study_time;
  Notification_data;
  Study_People = [];
  Show_Study = false
  constructor(public navCtrl: NavController, public platform: Platform, public ngZone: NgZone, private afDatabase: AngularFireDatabase, private Share: SharingService, private contacts: Contacts, private network: Network, private calendar: Calendar, private alertCtrl: AlertController, private fcm: FCM, private http: HttpClient) {
    this.offline_alert = this.alertCtrl.create({
      title: "You're offline",
      subTitle: "Alis can't reach you without internet connection",
      enableBackdropDismiss: false
    });

    if (!navigator.onLine) {
      this.offline_alert.present();
    }

    fcm.onNotification().subscribe(notification => {
      this.SignedIn = true;
      if (notification.wasTapped) {
        console.log("Received in background");
        this.Intent_type = notification.type
        this.Intent_data = JSON.parse(notification.data)
        console.log(this.Intent_type);
        console.log(this.Intent_data);
      } else {
        console.log("Received in foreground");
        console.log(notification);

      };
    })

    platform.ready().then(() => {
      this.API_Agent = APIModule("7327b7cfa4a144a0b3924da4f9b375b9");
      this.uuid = uuidv1()
      this.Token = this.Share.getToken();
      // this.relevantMajors();
      // this.showMajors();

      this.Update_Time()
      this.Alis_first = true
      if (this.Intent_type == "Welcome") {
        this.afDatabase.database.ref('/users').once('value').then((snapshot1) => {
          if (snapshot1.child(this.Token).exists()) {
            this.API_Agent.eventRequest({ name: "Welcome", data: { 'Name': snapshot1.child(this.Token).child('First_name').val() } }, { sessionId: this.uuid })
              .once('response', ({ result: { fulfillment: { speech } } }) => {
                speech = speech + "😊";
                this.answer = speech;
                this.afDatabase.database.ref('options').child("Default Welcome Intent").once('value').then(snapshot1 => { this.options = snapshot1.val() })
                this.SignedIn = true;
              }).once('error', (error) => {
                console.log(error);
              }).end();
          } else {
            this.API_Agent.eventRequest({ name: "Welcome" }, { sessionId: this.uuid })
              .once('response', ({ result: { fulfillment: { speech } } }) => {
                speech = speech + "😊";
                this.answer = speech;
                this.afDatabase.database.ref('options').child("Default Welcome Intent").once('value').then(snapshot1 => { this.options = snapshot1.val() })
              }).once('error', (error) => {
                console.log(error);
              }).end();
          }
        });
      }
      else if (this.Intent_type == "Rating") {
        this.API_Agent.eventRequest({ name: "getFeedback" }, { sessionId: this.uuid })
          .once('response', ({ result: { fulfillment: { speech } } }) => {
            this.answer = speech;
            this.afDatabase.database.ref('options').child("getFeedback").once('value').then(snapshot1 => { this.options = snapshot1.val() })
          }).once('error', (error) => {
            console.log(error);
          }).end();
      }
      else if (this.Intent_type == "Study_group_Invitation") {
        this.API_Agent.eventRequest({ name: "Study_group_Invitation", data: { 'Name': this.Intent_data["Name"], 'Date': this.Intent_data["Date"], 'Time': this.Intent_data["Time"], 'Place': this.Intent_data["Place"] } }, { sessionId: this.uuid })
          .once('response', ({ result: { fulfillment: { speech } } }) => {
            this.answer = speech;
            this.SignedIn = true;
            this.Show_Study = true;
            this.afDatabase.database.ref(`users/${this.Token}/Study groups/${this.Intent_data["Study_Token"]}/People`).once('value').then(snapshot1 => {
              snapshot1.forEach(snapshot2 => {
                let Study_Person = {};
                this.afDatabase.database.ref('users').once('value').then(snapshot3 => {
                  snapshot3.forEach(snapshot4 => {
                    if (snapshot4.child("Phone").val() == snapshot2.key) {
                      Study_Person = {
                        Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                        Status: snapshot2.val()
                      }
                      this.Study_People.push(Study_Person)
                    }
                  })
                })
              })
            })
          }).once('error', (error) => {
            console.log(error);
          }).end();
      }
      else if (this.Intent_type == "Study_group_Reply") {
        this.answer = `Here are the people in the study group on ${this.Intent_data["Date"]} at ${this.Intent_data["Time"]} in ${this.Intent_data["Place"]}`
        this.SignedIn = true;
        this.Show_Study = true;
        this.afDatabase.database.ref(`users/${this.Token}/Study groups/${this.Intent_data["Study_Token"]}/People`).once('value').then(snapshot1 => {
          snapshot1.forEach(snapshot2 => {
            let Study_Person = {};
            this.afDatabase.database.ref('users').once('value').then(snapshot3 => {
              snapshot3.forEach(snapshot4 => {
                if (snapshot4.child("Phone").val() == snapshot2.key) {
                  Study_Person = {
                    Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                    Status: snapshot2.val()
                  }
                  this.Study_People.push(Study_Person)
                }
              })
            })
          })
        })
      }
    })
  }

  ionViewDidEnter() {

    this.connected = this.network.onConnect().subscribe(data => {
      console.log(`You are now ${data.type} via ${this.network.type}`)
      this.offline_alert.dismiss();
      this.offline_alert = this.alertCtrl.create({
        title: "You're offline",
        subTitle: "Alis can't reach you without internet connection",
        enableBackdropDismiss: false
      });
    }, error => console.error(error));

    this.disconnected = this.network.onDisconnect().subscribe(data => {
      console.log(`You are now ${data.type} via ${this.network.type}`)
      this.offline_alert.present();
    }, error => console.error(error));
  }

  ionViewWillLeave() {
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  GetDate_and_Time() {
    var d = new Date(),
      date = [(d.getMonth() + 1), d.getDate(), d.getFullYear()].join("/"),
      time = [(d.getHours() > 12) ? d.getHours() - 12 : (d.getHours() == 0) ? "12" : d.getHours(), (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()].join(":"),
      ampm = (d.getHours() < 12) ? "AM" : "PM"
    return { 'Date': date, 'Time': time, 'AMPM': ampm };
  }

  Update_Time() {
    var d = new Date(),
      time = [(d.getHours() > 12) ? d.getHours() - 12 : (d.getHours() == 0) ? "12" : d.getHours(), (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()].join(":"),
      ampm = (d.getHours() < 12) ? "AM" : "PM"
    this.CurrentTime = time + ' ' + ampm;
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

  ask() {
    if (this.question == undefined || this.question == null || this.question.trim() == '') {
      this.question = null;
      return;
    }
    this.answer = "Alis is typing...";
    this.need_universty = 0;
    this.Alis_first = false
    this.need_tutor = 0;
    this.tutor_Feedback = false
    this.rated = null
    this.Friends = []
    this.Show_Friends = false
    this.Select_Friends = false
    this.date = false
    this.time = false
    this.Study_People = []
    this.Show_Study = false;

    this.content.scrollToBottom();
    this.chat = this.question;
    this.Update_Time()
    this.content.scrollToBottom();

    if (this.filling_form) {
      if (this.end_of_form) {
        this.filling_form = false;
        this.q_num = 1;
        this.answer = "okay now you're done";
      }
      else {
        this.add_form_answers('' + this.q_num, this.question);
        this.q_num++;
        this.get_application_questions("" + this.q_num);
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
                        this.answer = speech;
                        this.SignedIn = true;
                      }).once('error', (error) => {
                        console.log(error);
                      }).end();
                  }
                })
                if (!phonefound) {
                  this.answer = "Sorry, I can't find your number. You can sign up again!😊";
                }
              } else {
                this.answer = "I think you should sign up!😊";
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
                  this.answer = "This number is already used"
                }
                else {
                  let data = { First_name: result.parameters["First-name"], Last_name: result.parameters["Last-name"], Phone: result.parameters["phone-number"] };
                  this.addData('/users', this.Token, null, data).then().catch();
                  this.answer = result.fulfillment.speech;
                  this.SignedIn = true;
                }
              }
            })
          }
          else if (result.action == "Synchronize_Friends" && this.SignedIn == true) {
            this.SyncFriends();
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == "Show_Friends" && this.SignedIn == true) {
            this.answer = result.fulfillment.speech;
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
                        this.Friends.push(Friend)
                      }
                    })
                  })
                })
              }
            })
            this.Show_Friends = true
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
                this.Tutors = tutors;
                this.need_tutor = 1;
              })
          }
          else if (result.action == "study_level" && this.SignedIn == true) {
            if (result.parameters.study_level !== '') {
              let data = { studyLevel: result.parameters.study_level };
              this.addData('/users', this.Token, null, data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'get_hobbies' && this.SignedIn == true) {
            if (result.parameters.hobbies.length > 0) {
              let data = { hobbies: result.parameters.hobbies };
              this.addData('/users', this.Token, null, data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'father_job' && this.SignedIn == true) {
            if (result.parameters.father_job !== '') {
              let data = { fatherJob: result.parameters.fatherJob };
              this.addData('/users', this.Token, null, data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'mother_job' && this.SignedIn == true) {
            if (result.parameters.mother_job !== '') {
              let data = { motherJob: result.parameters.motherJob };
              this.addData('/users', this.Token, null, data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'school_name' && this.SignedIn == true) {
            if (result.parameters.school_name !== '') {
              let data = { schoolName: result.parameters.school_name };
              this.addData('/users', this.Token, null, data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getNational' && this.SignedIn == true) {
            if (result.parameters.highSchoolDegree !== '') {
              let data = { highSchoolDegree: result.parameters.highSchoolDegree };
              this.addData('/users', this.Token, null, data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getSat' && this.SignedIn == true) {
            if (result.parameters.highSchoolDegree !== '') {
              let data = { highSchoolDegree: result.parameters.highSchoolDegree };
              this.addData('/users', this.Token, null, data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getIG' && this.SignedIn == true) {
            if (result.parameters.highSchoolDegree !== '') {
              let data = { highSchoolDegree: result.parameters.highSchoolDegree };
              this.addData('/users', this.Token, null, data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getTanyaThanawyGrade' && this.SignedIn == true) {
            let gradeNum;
            if (result.parameters.tanyaPercentage !== '') {
              let gradePercentage = result.parameters.tanyaPercentage;
              gradeNum = gradePercentage.slice(0, -1);
            } else if (result.parameters.tanyaNum !== '') {
              gradeNum = result.parameters.tanyaNum;
            }
            let data = { tanyaThanwyGrade: gradeNum };
            this.addData('/users', this.Token, 'thanawyGrades', data).then().catch();
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getTaltaThanawyGrade' && this.SignedIn == true) {
            let gradeNum;
            if (result.parameters.taltaPercentage !== '') {
              let gradePercentage = result.parameters.taltaPercentage;
              gradeNum = gradePercentage.slice(0, -1);
            } else if (result.parameters.taltaNum !== '') {
              gradeNum = result.parameters.taltaNum;
            }
            let data = { taltaThanwyGrade: gradeNum };
            this.addData('/users', this.Token, 'thanawyGrades', data).then().catch();
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getSat1' && this.SignedIn == true) {
            let gradeNum;
            if (result.parameters.sat1Percentage !== '') {
              let gradePercentage = result.parameters.sat1Percentage;
              gradeNum = gradePercentage.slice(0, -1);
            }
            else if (result.parameters.sat1Num !== '') {
              gradeNum = result.parameters.sat1Num;
            }
            let data = { sat1Grade: gradeNum };
            this.addData('/users', this.Token, 'satGrades', data).then().catch();
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getSat2' && this.SignedIn == true) {
            let gradeNum;
            if (result.parameters.sat2Percentage !== '') {
              let gradePercentage = result.parameters.sat2Percentage;
              gradeNum = gradePercentage.slice(0, -1);
            }
            else if (result.parameters.sat2Num !== '') {
              gradeNum = result.parameters.sat2Num;
            }
            let data = { sat2Grade: gradeNum };
            this.addData('/users', this.Token, 'satGrades', data).then().catch();
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getIGArabicGrade' && this.SignedIn == true) {
            if (result.parameters.arabicIG_Grade !== '') {
              let data = { arabicGrade: result.parameters.arabicIG_Grade };
              this.addData('/users', this.Token, 'IG_Grades', data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getIGEnglishGrade' && this.SignedIn == true) {
            if (result.parameters.englishIG_Grade !== '') {
              let data = { englishGrade: result.parameters.englishIG_Grade };
              this.addData('/users', this.Token, 'IG_Grades', data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getIGMathGrade' && this.SignedIn == true) {
            if (result.parameters.mathIG_Grade !== '') {
              let data = { mathGrade: result.parameters.mathIG_Grade };
              this.addData('/users', this.Token, 'IG_Grades', data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getIGChemistryGrade' && this.SignedIn == true) {
            if (result.parameters.chemistryIG_Grade !== '') {
              let data = { chemistryGrade: result.parameters.chemistryIG_Grade };
              this.addData('/users', this.Token, 'IG_Grades', data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getIGPhysicsGrade' && this.SignedIn == true) {
            if (result.parameters.physicsIG_Grade !== '') {
              let data = { chemistryGrade: result.parameters.physicsIG_Grade };
              this.addData('/users', this.Token, 'IG_Grades', data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getIGBiologyGrade' && this.SignedIn == true) {
            if (result.parameters.biologyIG_Grade !== '') {
              let data = { chemistryGrade: result.parameters.biologyIG_Grade };
              this.addData('/users', this.Token, 'IG_Grades', data).then().catch();
            }
            this.answer = result.fulfillment.speech;
          }
          else if (result.action == 'getFeedback-yes' && this.SignedIn == true) {
            this.API_Agent.eventRequest({ name: "getFeedback-yes", data: { 'tutorName': this.Intent_data.tutorName, 'subject': this.Intent_data.subject } }, { sessionId: this.uuid })
              .once('response', ({ result: { fulfillment: { speech } } }) => {
                speech = speech + "😊";
                this.answer = speech;
                this.tutor_Feedback = true
              }).once('error', (error) => {
                console.log(error);
              }).end();
          }
          else if (result.action == "Student_activity_name" && this.SignedIn == true) {
            this.SU_name = result.parameters.Student_Activities;
            if (!this.SU_name) {
              this.answer = result.fulfillment.speech;
            }
            else {
              this.get_application_questions('1');
              this.applicant_id = this.afDatabase.database.ref('/' + this.SU_name + "_applicants").push({
                token: this.Token
              }).key;
              this.filling_form = true;
              this.end_of_form = false;
            }
          }
          else if (result.action == "Study_group_Creation" && this.SignedIn == true) {
            this.answer = result.fulfillment.speech;
            if (result.actionIncomplete == true) {
              if (result.parameters["place"] !== "" && result.parameters["date"] == "") {
                this.date = true
              }
              else if (result.parameters["place"] !== "" && result.parameters["date"] !== "" && result.parameters["time"] == "") {
                this.time = true
                this.SyncFriends()
              }
            }
            else {
              result.parameters["date"] = new Date(result.parameters["date"]).toLocaleDateString();
              result.parameters["time"] = [(parseInt(this.Study_time.split(":")["0"]) > 12) ? parseInt(this.Study_time.split(":")["0"]) - 12 : (parseInt(this.Study_time.split(":")["0"]) == 0) ? "12" : parseInt(this.Study_time.split(":")["0"]).toString(), this.Study_time.split(":")["1"]].join(":") + ((parseInt(this.Study_time.split(":")["0"]) > 12) ? " PM" : " AM");
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
                          this.Friends.push(Friend)
                        }
                      })
                    })
                  })
                }
              })
              this.Show_Friends = true
              this.Select_Friends = true
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
          else if (result.action == "Study_group_Invitation-yes" && this.SignedIn == true) {
            this.afDatabase.database.ref(`users/${this.Token}/Phone`).once('value').then(MyPhone => {
              this.afDatabase.database.ref('users').once('value').then(snapshot1 => {
                if (snapshot1.exists()) {
                  snapshot1.forEach(snapshot2 => {
                    let PhoneKey = snapshot2.child(`Study groups/${this.Intent_data["Study_Token"]}/People/${MyPhone.val()}`)
                    if (snapshot2.key !== this.Token && PhoneKey.exists()) {
                      PhoneKey.ref.set("Joining")
                    }
                  })
                }
              })
            })
            this.afDatabase.database.ref(`users/${this.Token}`).once('value').then(snapshot1 => {
              this.Notification_data = {
                Title: "Study Group",
                Body: `${snapshot1.child('First_name').val() + " " + snapshot1.child('Last_name').val()} has accepted to join the study group on ${this.Intent_data["Date"]} at ${this.Intent_data["Time"]} in ${this.Intent_data["Place"]}`,
                type: "Study_group_Reply",
                data: JSON.stringify({
                  Date: this.Intent_data["Date"],
                  Time: this.Intent_data["Time"],
                  Place: this.Intent_data["Place"],
                  Study_Token: this.Intent_data["Study_Token"]
                })
              }
              this.sendNotification(this.Intent_data["Creator"])
              this.answer = result.fulfillment.speech;
            })
          }
          else if (result.action == "Study_group_Invitation-no" && this.SignedIn == true) {
            this.afDatabase.database.ref(`users/${this.Token}/Phone`).once('value').then(MyPhone => {
              this.afDatabase.database.ref('users').once('value').then(snapshot1 => {
                if (snapshot1.exists()) {
                  snapshot1.forEach(snapshot2 => {
                    let PhoneKey = snapshot2.child(`Study groups/${this.Intent_data["Study_Token"]}/People/${MyPhone.val()}`)
                    if (snapshot2.key !== this.Token && PhoneKey.exists()) {
                      PhoneKey.ref.set("Not joining")
                    }
                  })
                }
              })
            })
            this.afDatabase.database.ref(`users/${this.Token}`).once('value').then(snapshot1 => {
              this.Notification_data = {
                Title: "Study Group",
                Body: `${snapshot1.child('First_name').val() + " " + snapshot1.child('Last_name').val()} has refused to join the study group on ${this.Intent_data["Date"]} at ${this.Intent_data["Time"]} in ${this.Intent_data["Place"]}`,
                type: "Study_group_Reply",
                data: JSON.stringify({
                  Date: this.Intent_data["Date"],
                  Time: this.Intent_data["Time"],
                  Place: this.Intent_data["Place"],
                  Study_Token: this.Intent_data["Study_Token"]
                })
              }
              this.sendNotification(this.Intent_data["Creator"])
              this.answer = result.fulfillment.speech;
            })
          }
          else if (result.action == "showUniversities" && result.parameters.country != '' && this.SignedIn == true) {
            this.afDatabase.database.ref('/universtes').child(result.parameters.country)
              .once('value').then(snapshot1 => {
                snapshot1.forEach(snapshot2 => {
                  let university = {
                    country: result.parameters.country,
                    location: snapshot2.child('location').val(),
                    image: snapshot2.child('img_url').val(),
                    description: snapshot2.child('description').val(),
                    universtyName: snapshot2.child('name').val()
                  }
                  this.universities.push(university);
                })
                this.need_universty = 1;
              })
          }
          // else if (result.action == "Interviews_Scheduling" && this.SignedIn == true) {
          //   this.SU_name = result.parameters.Student_activities;
          //   let string_to_split = result.parameters.start_time;
          //   string_to_split.split("/");
          //   let start_time = string_to_split[0];
          //   let end_time = string_to_split[1];
          //   let day = new Date(result.parameters.day).toLocaleDateString();
          //   let duration = result.parameters.duration;
          //   if (result.actionIncomplete == "true") {
          //     console.log('tamam');
          //     this.answer = result.fulfillment.speech;
          //   }

          //   else {
          //     while (start_time < end_time) {
          //       this.add_interview_slots("" + day, "" + start_time);
          //       start_time = this.addTimes('' + start_time, '' + duration);
          //       console.log(start_time);
          //     }
          //     this.answer = result.fulfillment.speech;
          //   }
          // }
          // else if (result.action == "show_applicants" && this.SignedIn == true) {
          //   this.SU_name = result.parameters.su_name;
          //   if (!this.SU_name) {
          //     this.answer=result.fulfillment.speech;
          //   }
          //   else {
          //     let applicants = [];
          //     this.afDatabase.database.ref('/' + this.SU_name + "_applicants").orderByKey()
          //       .once('value', (snapshot) => {
          //         snapshot.forEach((data) => {
          //           applicants.push(data.val());
          //         });
          //         //show applicants to the interviewer 
          //       });
          //   }
          // }
          // //waiting notification containing student activity name
          // else if (result.action == "show_interview_slots" && this.SignedIn == true) {
          //   //you shoud previously have the student activity name 
          //   let slots = [];
          //   this.afDatabase.database.ref('/' + this.SU_name + "_interviews").orderByKey()
          //     .once('value', (snapshot) => {
          //       snapshot.forEach((data) => {
          //         slots.push(data.val());
          //       });
          //       //show the applicant the interview slots
          //     });
          // }
          else if (result.action !== "input.unknown" && result.action !== "input.welcome" && result.action !== "SignIn" && result.action !== "SignUp" && result.action !== "SignUp-Credentials" && this.SignedIn == false) {
            this.answer = "I think you should sign in!😊"
          }
          else {
            this.answer = result.fulfillment.speech;
          }
          this.afDatabase.database.ref('options').child(result.metadata.intentName).once('value').then(snapshot1 => { this.options = snapshot1.val() })
        }).once('error', (error) => {
          console.log(error);
        }).end();
    }
    this.question = null;
  }

  addData(collection, child, nextChild, data) {
    if (nextChild) {
      return this.afDatabase.database.ref(collection).child(child).child(nextChild).update(data);
    }
    return this.afDatabase.database.ref(collection).child(child).update(data);
  }

  get_application_questions(Q_num: string) {
    return this.afDatabase.database.ref('/forms').child(this.SU_name).child(Q_num).once('value').then(snapshot => {
      if (snapshot.exists()) {
        this.answer = snapshot.val();
      }
      else {
        this.end_of_form = true;
      }
    });
  }

  add_form_answers(ques_num: string, answer: string) {
    return this.afDatabase.database.ref('/' + this.SU_name + "_applicants").child(this.applicant_id).child("" + this.q_num).update({
      answer
    });
  }

  rating(x) {
    this.rated = x;
    let data = {}
    data[this.Intent_data.phone] = this.rated
    this.addData('/users', this.Token, 'Ratings', data).then().catch();
    this.answer = "Thanks for your Feedback😊"
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
      this.Show_Friends = false
      this.Select_Friends = false
      var group_key;
      var group_data = this.Notification_data.data;
      this.afDatabase.database.ref(`users/${this.Token}/Study groups`).once('value').then(snapshot1 => {
        let group = {}
        group["Date"] = group_data["Date"]
        group["Time"] = group_data["Time"]
        group["Place"] = group_data["Place"]
        group["Reminder"] = this.Make_Reminder(`${group_data["Date"]}, ${group_data["Time"]}`, 24)
        group_key = snapshot1.ref.push(group).key
        snapshot1.child(group_key).ref.update({ People: group_people })
        this.Notification_data.data["Study_Token"] = group_key
        this.Notification_data.data = JSON.stringify(this.Notification_data.data)
      }).then(() => {
        tempFriends.forEach(tempFriendPrimary => {
          let group_people = {}
          tempFriends.forEach(tempFriendSecondary => {
            if (tempFriendPrimary.Token !== tempFriendSecondary.Token) {
              group_people[tempFriendSecondary.Phone] = "Pending"
            }
          })
          this.afDatabase.database.ref(`users/${this.Token}`).child("Phone").once('value').then(snapshot2 => {
            group_people[snapshot2.val()] = "Joining"
          })
          this.afDatabase.database.ref(`users/${tempFriendPrimary.Token}`).child("Study groups").once('value').then(snapshot1 => {
            let group = {}
            group["Date"] = group_data["Date"]
            group["Time"] = group_data["Time"]
            group["Place"] = group_data["Place"]
            group["Reminder"] = this.Make_Reminder(`${group_data["Date"]}, ${group_data["Time"]}`, 24)
            snapshot1.child(group_key).ref.update(group)
            snapshot1.child(group_key).ref.update({ People: group_people })
          })
          this.sendNotification(tempFriendPrimary.Token)
        })
      })
      this.answer = "I invited your selected friends to the study group!😊"
    }
    else {
      this.answer = "Please invite at least 1 of your friends"
    }
  }

  Tutor_Select(Tutor) {
    this.Current_Tutor = Tutor
    this.need_tutor = 2
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
    this.need_tutor = 0;
    this.Current_Tutor = '';
    this.Tutors = [];
    this.answer = "I reserved your lesson! 😊";
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

  // add_interview_slots(day: string, Time: string) {
  //   this.afDatabase.database.ref('/' + this.SU_name + "_interviews").push({
  //     day,
  //     empty_full: "empty",
  //     time: Time
  //   });
  // }

  // addTimes(startTime, endTime) {
  //   var times = [0, 0, 0]
  //   var max = times.length
  //   var a = (startTime || '').split(':')
  //   var b = (endTime || '').split(':')
  //   // normalize time values
  //   for (var i = 0; i < max; i++) {
  //     a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
  //     b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
  //   }
  //   // store time values
  //   for (var i = 0; i < max; i++) {
  //     times[i] = a[i] + b[i]
  //   }
  //   var hours = times[0]
  //   var minutes = times[1]
  //   var seconds = times[2]
  //   if (seconds >= 60) {
  //     var m = (seconds / 60) << 0
  //     minutes += m
  //     seconds -= 60 * m
  //   }
  //   if (minutes >= 60) {
  //     var h = (minutes / 60) << 0
  //     hours += h
  //     minutes -= 60 * h
  //   }
  //   return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
  // }
}
