webpackJsonp([0],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SharingService = /** @class */ (function () {
    function SharingService() {
        this.Token = '';
    }
    SharingService.prototype.getToken = function () {
        return this.Token;
    };
    SharingService.prototype.setToken = function (token) {
        this.Token = token;
    };
    SharingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], SharingService);
    return SharingService;
}());

//# sourceMappingURL=SharingService.service.js.map

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 197;

/***/ }),

/***/ 241:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 241;

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_fcm__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_calendar__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_Sharing_Service_SharingService_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_angularfire2_database__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_contacts__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_apiai__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_apiai___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_apiai__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_common_http__ = __webpack_require__(309);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var uuidv1 = __webpack_require__(535);
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, platform, ngZone, afDatabase, Share, contacts, network, calendar, alertCtrl, fcm, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.ngZone = ngZone;
        this.afDatabase = afDatabase;
        this.Share = Share;
        this.contacts = contacts;
        this.network = network;
        this.calendar = calendar;
        this.alertCtrl = alertCtrl;
        this.fcm = fcm;
        this.http = http;
        this.Tutors = [];
        this.universities = [];
        this.options = [];
        this.need_tutor = 0;
        this.need_universty = 0;
        this.Token = '';
        this.Friends = [];
        this.Show_Friends = false;
        this.Select_Friends = false;
        this.Intent_type = 'Welcome';
        this.tutor_Feedback = false;
        this.Alis_first = false;
        this.SignedIn = false;
        this.Show_date = false;
        this.Show_time = false;
        this.Show_ChooseTime = false;
        this.Show_ChooseFriends = false;
        this.Current_Group = [];
        this.Study_Groups = [];
        this.Show_groups = 0;
        this.Select_Groups = false;
        this.Current_Applicant = [];
        this.applicants = [];
        this.Show_applicants = false;
        this.Hide_applicant = false;
        this.Show_application = false;
        this.Select_Applicants = false;
        this.allQuestions = [];
        this.formQuestion = false;
        this.questionNumber = 0;
        this.formAnswers = [];
        this.Show_duration = false;
        this.Show_ChooseDuration = false;
        this.Show_WritePlace = false;
        this.offline_alert = this.alertCtrl.create({
            title: "You're offline",
            subTitle: "Alis can't reach you without internet connection",
            enableBackdropDismiss: false
        });
        if (!navigator.onLine) {
            this.offline_alert.present();
        }
        fcm.onNotification().subscribe(function (notification) {
            _this.SignedIn = true;
            if (notification.wasTapped) {
                console.log("Received in background");
                _this.Intent_type = notification.type;
                _this.Intent_data = JSON.parse(notification.data);
                console.log(_this.Intent_type);
                console.log(_this.Intent_data);
            }
            else {
                console.log("Received in foreground");
                console.log(notification);
            }
            ;
        });
        platform.ready().then(function () {
            _this.API_Agent = __WEBPACK_IMPORTED_MODULE_8_apiai__("7327b7cfa4a144a0b3924da4f9b375b9");
            _this.uuid = uuidv1();
            _this.Token = _this.Share.getToken();
            // this.relevantMajors();
            // this.showMajors();
            _this.Update_Time();
            _this.Alis_first = true;
            if (_this.Intent_type == "Welcome") {
                _this.afDatabase.database.ref('/users').once('value').then(function (snapshot1) {
                    if (snapshot1.child(_this.Token).exists()) {
                        _this.API_Agent.eventRequest({ name: "Welcome", data: { 'Name': snapshot1.child(_this.Token).child('First_name').val() } }, { sessionId: _this.uuid })
                            .once('response', function (_a) {
                            var speech = _a.result.fulfillment.speech;
                            speech = speech + "😊";
                            _this.answer = speech;
                            _this.afDatabase.database.ref('options').child("Default Welcome Intent").once('value').then(function (snapshot1) { _this.options = snapshot1.val(); });
                            _this.SignedIn = true;
                        }).once('error', function (error) {
                            console.log(error);
                        }).end();
                    }
                    else {
                        _this.API_Agent.eventRequest({ name: "Welcome" }, { sessionId: _this.uuid })
                            .once('response', function (_a) {
                            var speech = _a.result.fulfillment.speech;
                            speech = speech + "😊";
                            _this.answer = speech;
                            _this.afDatabase.database.ref('options').child("Default Welcome Intent").once('value').then(function (snapshot1) { _this.options = snapshot1.val(); });
                        }).once('error', function (error) {
                            console.log(error);
                        }).end();
                    }
                });
            }
            else if (_this.Intent_type == "Rating") {
                _this.API_Agent.eventRequest({ name: "getFeedback" }, { sessionId: _this.uuid })
                    .once('response', function (_a) {
                    var speech = _a.result.fulfillment.speech;
                    _this.answer = speech;
                    _this.afDatabase.database.ref('options').child("getFeedback").once('value').then(function (snapshot1) { _this.options = snapshot1.val(); });
                }).once('error', function (error) {
                    console.log(error);
                }).end();
            }
            else if (_this.Intent_type == "Study_group_Invitation") {
                _this.API_Agent.eventRequest({ name: "Study_group_Invitation", data: { 'Name': _this.Intent_data["Name"], 'Date': _this.Intent_data["Date"], 'Time': _this.Intent_data["Time"], 'Place': _this.Intent_data["Place"] } }, { sessionId: _this.uuid })
                    .once('response', function (_a) {
                    var speech = _a.result.fulfillment.speech;
                    _this.answer = speech;
                    _this.SignedIn = true;
                    _this.Show_groups = 2;
                    _this.afDatabase.database.ref("users/" + _this.Token + "/Study groups/" + _this.Intent_data["Study_Token"] + "/People").once('value').then(function (snapshot1) {
                        snapshot1.forEach(function (snapshot2) {
                            var Study_Person = {};
                            _this.afDatabase.database.ref('users').once('value').then(function (snapshot3) {
                                snapshot3.forEach(function (snapshot4) {
                                    if (snapshot4.child("Phone").val() == snapshot2.key) {
                                        Study_Person = {
                                            Person: {
                                                Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                                                Status: snapshot2.val()
                                            },
                                            Study_Token: _this.Intent_data["Study_Token"]
                                        };
                                        _this.Current_Group.push(Study_Person);
                                    }
                                });
                            });
                        });
                    });
                }).once('error', function (error) {
                    console.log(error);
                }).end();
            }
            else if (_this.Intent_type == "Study_group_Reply") {
                _this.answer = "Here are the people in the study group on " + _this.Intent_data["Date"] + " at " + _this.Intent_data["Time"] + " in " + _this.Intent_data["Place"];
                _this.SignedIn = true;
                _this.Show_groups = 2;
                _this.afDatabase.database.ref("users/" + _this.Token + "/Study groups/" + _this.Intent_data["Study_Token"] + "/People").once('value').then(function (snapshot1) {
                    snapshot1.forEach(function (snapshot2) {
                        var Study_Person = {};
                        _this.afDatabase.database.ref('users').once('value').then(function (snapshot3) {
                            snapshot3.forEach(function (snapshot4) {
                                if (snapshot4.child("Phone").val() == snapshot2.key) {
                                    Study_Person = {
                                        Person: {
                                            Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                                            Status: snapshot2.val()
                                        },
                                        Study_Token: _this.Intent_data["Study_Token"]
                                    };
                                    _this.Current_Group.push(Study_Person);
                                }
                            });
                        });
                    });
                });
            }
        });
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.connected = this.network.onConnect().subscribe(function (data) {
            console.log("You are now " + data.type + " via " + _this.network.type);
            _this.offline_alert.dismiss();
            _this.offline_alert = _this.alertCtrl.create({
                title: "You're offline",
                subTitle: "Alis can't reach you without internet connection",
                enableBackdropDismiss: false
            });
        }, function (error) { return console.error(error); });
        this.disconnected = this.network.onDisconnect().subscribe(function (data) {
            console.log("You are now " + data.type + " via " + _this.network.type);
            _this.offline_alert.present();
        }, function (error) { return console.error(error); });
    };
    HomePage.prototype.ionViewWillLeave = function () {
        this.connected.unsubscribe();
        this.disconnected.unsubscribe();
    };
    HomePage.prototype.GetDate_and_Time = function () {
        var d = new Date(), date = [(d.getMonth() + 1), d.getDate(), d.getFullYear()].join("/"), time = [(d.getHours() > 12) ? d.getHours() - 12 : (d.getHours() == 0) ? "12" : d.getHours(), (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()].join(":"), ampm = (d.getHours() < 12) ? "AM" : "PM";
        return { 'Date': date, 'Time': time, 'AMPM': ampm };
    };
    HomePage.prototype.Update_Time = function () {
        var d = new Date(), time = [(d.getHours() > 12) ? d.getHours() - 12 : (d.getHours() == 0) ? "12" : d.getHours(), (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()].join(":"), ampm = (d.getHours() < 12) ? "AM" : "PM";
        this.CurrentTime = time + ' ' + ampm;
    };
    HomePage.prototype.SyncFriends = function () {
        var _this = this;
        this.contacts.find(['*'])
            .then(function (contactslist) {
            var numbers = [];
            contactslist.forEach(function (data) {
                if (data.name) {
                    if (data.name.formatted == undefined) {
                        return;
                    }
                }
                else {
                    return;
                }
                if (data.phoneNumbers) {
                    var phones_1 = new Set();
                    var phone_as_name = false;
                    data.phoneNumbers.some(function (phonenumber) {
                        phonenumber.value = phonenumber.value.replace(/ +/g, "");
                        if (data.name.formatted.trim() != phonenumber.value) {
                            phones_1.add(phonenumber.value);
                        }
                        else {
                            phone_as_name = true;
                            return true;
                        }
                    });
                    if (phone_as_name) {
                        return;
                    }
                    phones_1.forEach(function (phone) { numbers.push({ Phone: phone, Found: false }); });
                }
            });
            var friends = [];
            _this.afDatabase.database.ref('/users').once('value').then(function (snapshot1) {
                if (snapshot1.exists()) {
                    snapshot1.forEach(function (snapshot2) {
                        for (var index = 0; index < numbers.length; index++) {
                            if (snapshot2.child('Phone').val() !== snapshot1.child(_this.Token).child('Phone').val() && snapshot2.child('Phone').val() == numbers[index].Phone && numbers[index].Found == false) {
                                numbers[index].Found = true;
                                friends.push(numbers[index].Phone);
                                var data = { Friends: friends };
                                _this.addData('/users', _this.Token, null, data).then().catch();
                                break;
                            }
                        }
                    });
                }
            });
        });
    };
    HomePage.prototype.ask = function () {
        var _this = this;
        if (this.question == undefined || this.question == null || this.question.trim() == '') {
            this.question = null;
            return;
        }
        this.answer = "Alis is typing...";
        this.need_universty = 0;
        this.Alis_first = false;
        this.need_tutor = 0;
        this.tutor_Feedback = false;
        this.rated = null;
        this.Friends = [];
        this.Show_Friends = false;
        this.Select_Friends = false;
        this.Show_date = false;
        this.Show_time = false;
        this.Show_ChooseTime = false;
        this.Show_ChooseFriends = false;
        this.Current_Group = [];
        this.Study_Groups = [];
        this.Show_groups = 0;
        this.Select_Groups = false;
        this.Current_Applicant = [];
        this.applicants = [];
        this.Show_applicants = false;
        this.Hide_applicant = false;
        this.Show_application = false;
        this.Select_Applicants = false;
        this.Show_duration = false;
        this.Show_ChooseDuration = false;
        this.Show_WritePlace = false;
        // this.date = false
        // this.time = false
        // this.duration = false
        this.content.scrollToBottom();
        this.chat = this.question;
        this.Update_Time();
        this.content.scrollToBottom();
        if (this.formQuestion) {
            this.formAnswers.push(this.question);
            this.questionNumber += 1;
            this.answer = this.allQuestions[this.questionNumber];
            if (this.allQuestions.length == this.questionNumber) {
                this.addFormAnswers(this.formAnswers);
                this.answer = "okay now you're done";
                this.questionNumber = 0;
                this.formQuestion = false;
            }
        }
        else {
            this.API_Agent.textRequest(this.question, { sessionId: this.uuid })
                .once('response', function (_a) {
                var result = _a.result;
                if (result.action == "SignIn.SignIn-phone") {
                    _this.afDatabase.database.ref('/users').once('value').then(function (snapshot1) {
                        if (snapshot1.exists()) {
                            var phonefound_1 = false;
                            snapshot1.forEach(function (snapshot2) {
                                if (snapshot2.child('Phone').val() == result.parameters['phone-number']) {
                                    phonefound_1 = true;
                                    if (snapshot2.child('Phone').ref.parent.key != _this.Token) {
                                        var child = snapshot2.child('Phone').ref.parent;
                                        child.once('value').then(function (replace) {
                                            child.parent.child(_this.Token).set(replace.val());
                                            child.remove();
                                        });
                                    }
                                    _this.API_Agent.eventRequest({ name: "Welcome", data: { 'Name': snapshot2.child('First_name').val() } }, { sessionId: _this.uuid })
                                        .once('response', function (_a) {
                                        var speech = _a.result.fulfillment.speech;
                                        speech = speech + "😊";
                                        _this.answer = speech;
                                        _this.SignedIn = true;
                                    }).once('error', function (error) {
                                        console.log(error);
                                    }).end();
                                }
                            });
                            if (!phonefound_1) {
                                _this.answer = "Sorry, I can't find your number. You can sign up again!😊";
                            }
                        }
                        else {
                            _this.answer = "I think you should sign up!😊";
                        }
                    });
                }
                else if (result.action == "SignUp-Credentials" && result.actionIncomplete == false) {
                    _this.afDatabase.database.ref('/users').once('value').then(function (snapshot1) {
                        if (snapshot1.exists()) {
                            var phonefound_2 = false;
                            snapshot1.forEach(function (snapshot2) {
                                if (snapshot2.child('Phone').val() == result.parameters['phone-number']) {
                                    phonefound_2 = true;
                                    return;
                                }
                            });
                            if (phonefound_2) {
                                _this.answer = "This number is already used";
                            }
                            else {
                                var data = { First_name: result.parameters["First-name"], Last_name: result.parameters["Last-name"], Phone: result.parameters["phone-number"] };
                                _this.addData('/users', _this.Token, null, data).then().catch();
                                _this.answer = result.fulfillment.speech;
                                _this.SignedIn = true;
                            }
                        }
                    });
                }
                else if (result.action == "Synchronize_Friends" && _this.SignedIn == true) {
                    _this.SyncFriends();
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == "Show_Friends" && _this.SignedIn == true) {
                    _this.answer = result.fulfillment.speech;
                    _this.afDatabase.database.ref("users/" + _this.Token + "/Friends").once('value').then(function (snapshot1) {
                        if (snapshot1.exists()) {
                            snapshot1.forEach(function (snapshot2) {
                                _this.afDatabase.database.ref('users').once('value').then(function (snapshot2_1) {
                                    snapshot2_1.forEach(function (snapshot2_2) {
                                        if (snapshot2_2.child('Phone').val() == snapshot2.val()) {
                                            var Friend = {
                                                Name: snapshot2_2.child('First_name').val() + " " + snapshot2_2.child('Last_name').val(),
                                                Phone: snapshot2_2.child('Phone').val(),
                                            };
                                            _this.Friends.push(Friend);
                                        }
                                    });
                                });
                            });
                        }
                    });
                    _this.Show_Friends = true;
                }
                else if (result.action == "needTutor" && result.parameters.tutorSubject != '' && _this.SignedIn == true) {
                    _this.afDatabase.database.ref('/teachers').child(result.parameters.tutorSubject)
                        .once('value').then(function (snapshot1) {
                        var tutors = [];
                        snapshot1.forEach(function (snapshot2) {
                            var tutor = {
                                subject: result.parameters.tutorSubject,
                                name: snapshot2.child('name').val(),
                                phone: snapshot2.child('phone').val(),
                                image: snapshot2.child('image').val(),
                                lessons: snapshot2.child('lessons').val()
                            };
                            tutors.push(tutor);
                        });
                        _this.Tutors = tutors;
                        _this.need_tutor = 1;
                    });
                }
                else if (result.action == "study_level" && _this.SignedIn == true) {
                    if (result.parameters.study_level !== '') {
                        var data = { studyLevel: result.parameters.study_level };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'get_hobbies' && _this.SignedIn == true) {
                    if (result.parameters.hobbies.length > 0) {
                        var data = { hobbies: result.parameters.hobbies };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'father_job' && _this.SignedIn == true) {
                    if (result.parameters.father_job !== '') {
                        var data = { fatherJob: result.parameters.fatherJob };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'mother_job' && _this.SignedIn == true) {
                    if (result.parameters.mother_job !== '') {
                        var data = { motherJob: result.parameters.motherJob };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'school_name' && _this.SignedIn == true) {
                    if (result.parameters.school_name !== '') {
                        var data = { schoolName: result.parameters.school_name };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getNational' && _this.SignedIn == true) {
                    if (result.parameters.highSchoolDegree !== '') {
                        var data = { highSchoolDegree: result.parameters.highSchoolDegree };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getSat' && _this.SignedIn == true) {
                    if (result.parameters.highSchoolDegree !== '') {
                        var data = { highSchoolDegree: result.parameters.highSchoolDegree };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIG' && _this.SignedIn == true) {
                    if (result.parameters.highSchoolDegree !== '') {
                        var data = { highSchoolDegree: result.parameters.highSchoolDegree };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getTanyaThanawyGrade' && _this.SignedIn == true) {
                    var gradeNum = void 0;
                    if (result.parameters.tanyaPercentage !== '') {
                        var gradePercentage = result.parameters.tanyaPercentage;
                        gradeNum = gradePercentage.slice(0, -1);
                    }
                    else if (result.parameters.tanyaNum !== '') {
                        gradeNum = result.parameters.tanyaNum;
                    }
                    var data = { tanyaThanwyGrade: gradeNum };
                    _this.addData('/users', _this.Token, 'thanawyGrades', data).then().catch();
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getTaltaThanawyGrade' && _this.SignedIn == true) {
                    var gradeNum = void 0;
                    if (result.parameters.taltaPercentage !== '') {
                        var gradePercentage = result.parameters.taltaPercentage;
                        gradeNum = gradePercentage.slice(0, -1);
                    }
                    else if (result.parameters.taltaNum !== '') {
                        gradeNum = result.parameters.taltaNum;
                    }
                    var data = { taltaThanwyGrade: gradeNum };
                    _this.addData('/users', _this.Token, 'thanawyGrades', data).then().catch();
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getSat1' && _this.SignedIn == true) {
                    var gradeNum = void 0;
                    if (result.parameters.sat1Percentage !== '') {
                        var gradePercentage = result.parameters.sat1Percentage;
                        gradeNum = gradePercentage.slice(0, -1);
                    }
                    else if (result.parameters.sat1Num !== '') {
                        gradeNum = result.parameters.sat1Num;
                    }
                    var data = { sat1Grade: gradeNum };
                    _this.addData('/users', _this.Token, 'satGrades', data).then().catch();
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getSat2' && _this.SignedIn == true) {
                    var gradeNum = void 0;
                    if (result.parameters.sat2Percentage !== '') {
                        var gradePercentage = result.parameters.sat2Percentage;
                        gradeNum = gradePercentage.slice(0, -1);
                    }
                    else if (result.parameters.sat2Num !== '') {
                        gradeNum = result.parameters.sat2Num;
                    }
                    var data = { sat2Grade: gradeNum };
                    _this.addData('/users', _this.Token, 'satGrades', data).then().catch();
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGArabicGrade' && _this.SignedIn == true) {
                    if (result.parameters.arabicIG_Grade !== '') {
                        var data = { arabicGrade: result.parameters.arabicIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGEnglishGrade' && _this.SignedIn == true) {
                    if (result.parameters.englishIG_Grade !== '') {
                        var data = { englishGrade: result.parameters.englishIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGMathGrade' && _this.SignedIn == true) {
                    if (result.parameters.mathIG_Grade !== '') {
                        var data = { mathGrade: result.parameters.mathIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGChemistryGrade' && _this.SignedIn == true) {
                    if (result.parameters.chemistryIG_Grade !== '') {
                        var data = { chemistryGrade: result.parameters.chemistryIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGPhysicsGrade' && _this.SignedIn == true) {
                    if (result.parameters.physicsIG_Grade !== '') {
                        var data = { chemistryGrade: result.parameters.physicsIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGBiologyGrade' && _this.SignedIn == true) {
                    if (result.parameters.biologyIG_Grade !== '') {
                        var data = { chemistryGrade: result.parameters.biologyIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getFeedback-yes' && _this.SignedIn == true) {
                    _this.API_Agent.eventRequest({ name: "getFeedback-yes", data: { 'tutorName': _this.Intent_data.tutorName, 'subject': _this.Intent_data.subject } }, { sessionId: _this.uuid })
                        .once('response', function (_a) {
                        var speech = _a.result.fulfillment.speech;
                        speech = speech + "😊";
                        _this.answer = speech;
                        _this.tutor_Feedback = true;
                    }).once('error', function (error) {
                        console.log(error);
                    }).end();
                }
                else if (result.action == "Study_group_Creation" && _this.SignedIn == true) {
                    _this.answer = result.fulfillment.speech;
                    if (result.actionIncomplete == true) {
                        if (result.parameters["place"] == "") {
                        }
                        else if (result.parameters["date"] == "") {
                            _this.Show_date = true;
                            _this.Show_ChooseTime = true;
                        }
                        else if (result.parameters["time"] == "") {
                            _this.Show_date = false;
                            _this.Show_time = true;
                            _this.Show_ChooseFriends = true;
                            _this.SyncFriends();
                        }
                    }
                    else {
                        _this.Show_time = false;
                        _this.Show_ChooseFriends = false;
                        result.parameters["date"] = new Date(result.parameters["date"]).toLocaleDateString();
                        result.parameters["time"] = [new Date(result.parameters["date"] + ", " + result.parameters["time"]).toLocaleTimeString().split(":")["0"], new Date(result.parameters["date"] + ", " + result.parameters["time"]).toLocaleTimeString().split(":")["1"]].join(":") + new Date(result.parameters["date"] + ", " + result.parameters["time"]).toLocaleTimeString().slice(-3);
                        _this.afDatabase.database.ref("users/" + _this.Token + "/Friends").once('value').then(function (snapshot1) {
                            if (snapshot1.exists()) {
                                snapshot1.forEach(function (snapshot2) {
                                    _this.afDatabase.database.ref('users').once('value').then(function (snapshot2_1) {
                                        snapshot2_1.forEach(function (snapshot2_2) {
                                            if (snapshot2_2.child('Phone').val() == snapshot2.val()) {
                                                var Friend = {
                                                    Token: snapshot2_2.key,
                                                    Name: snapshot2_2.child('First_name').val() + " " + snapshot2_2.child('Last_name').val(),
                                                    Phone: snapshot2_2.child('Phone').val(),
                                                    checked: false
                                                };
                                                _this.Friends.push(Friend);
                                            }
                                        });
                                    });
                                });
                            }
                        });
                        _this.Show_Friends = true;
                        _this.Select_Friends = true;
                        _this.afDatabase.database.ref("users").child(_this.Token).once('value').then(function (snapshot1) {
                            if (snapshot1.exists()) {
                                _this.Notification_data = {
                                    Title: "Study Group",
                                    Body: snapshot1.child('First_name').val() + " " + snapshot1.child('Last_name').val() + " is inviting you to a study group on " + result.parameters["date"] + " at " + result.parameters["time"] + " in " + result.parameters["place"],
                                    type: "Study_group_Invitation",
                                    data: {
                                        Name: "" + (snapshot1.child('First_name').val() + " " + snapshot1.child('Last_name').val()),
                                        Date: "" + result.parameters["date"],
                                        Time: "" + result.parameters["time"],
                                        Place: "" + result.parameters["place"],
                                        Creator: _this.Token
                                    }
                                };
                            }
                        });
                    }
                }
                else if (result.action == "Study_group_Invitation-yes" && _this.SignedIn == true) {
                    var Study_Token_1 = _this.Intent_data["Study_Token"];
                    _this.afDatabase.database.ref("users/" + _this.Token + "/Phone").once('value').then(function (MyPhone) {
                        _this.afDatabase.database.ref('users').once('value').then(function (snapshot1) {
                            if (snapshot1.exists()) {
                                snapshot1.forEach(function (snapshot2) {
                                    var PhoneKey = snapshot2.child("Study groups/" + Study_Token_1 + "/People/" + MyPhone.val());
                                    if (PhoneKey.exists()) {
                                        PhoneKey.ref.set("Joining");
                                    }
                                });
                            }
                        });
                    });
                    _this.afDatabase.database.ref("users/" + _this.Token).once('value').then(function (snapshot1) {
                        _this.Notification_data = {
                            Title: "Study Group",
                            Body: snapshot1.child('First_name').val() + " " + snapshot1.child('Last_name').val() + " has accepted to join the study group on " + _this.Intent_data["Date"] + " at " + _this.Intent_data["Time"] + " in " + _this.Intent_data["Place"],
                            type: "Study_group_Reply",
                            data: JSON.stringify({
                                Date: _this.Intent_data["Date"],
                                Time: _this.Intent_data["Time"],
                                Place: _this.Intent_data["Place"],
                                Study_Token: _this.Intent_data["Study_Token"]
                            })
                        };
                        _this.sendNotification(_this.Intent_data["Creator"]);
                        _this.answer = result.fulfillment.speech;
                    });
                }
                else if (result.action == "Study_group_Invitation-no" && _this.SignedIn == true) {
                    var Study_Token_2 = _this.Intent_data["Study_Token"];
                    _this.afDatabase.database.ref("users/" + _this.Token + "/Phone").once('value').then(function (MyPhone) {
                        _this.afDatabase.database.ref('users').once('value').then(function (snapshot1) {
                            if (snapshot1.exists()) {
                                snapshot1.forEach(function (snapshot2) {
                                    var PhoneKey = snapshot2.child("Study groups/" + Study_Token_2 + "/People/" + MyPhone.val());
                                    if (PhoneKey.exists()) {
                                        PhoneKey.ref.set("Not joining");
                                    }
                                });
                            }
                        });
                    });
                    _this.afDatabase.database.ref("users/" + _this.Token).once('value').then(function (snapshot1) {
                        _this.Notification_data = {
                            Title: "Study Group",
                            Body: snapshot1.child('First_name').val() + " " + snapshot1.child('Last_name').val() + " has refused to join the study group on " + _this.Intent_data["Date"] + " at " + _this.Intent_data["Time"] + " in " + _this.Intent_data["Place"],
                            type: "Study_group_Reply",
                            data: JSON.stringify({
                                Date: _this.Intent_data["Date"],
                                Time: _this.Intent_data["Time"],
                                Place: _this.Intent_data["Place"],
                                Study_Token: _this.Intent_data["Study_Token"]
                            })
                        };
                        _this.sendNotification(_this.Intent_data["Creator"]);
                        _this.answer = result.fulfillment.speech;
                    });
                }
                else if (result.action == "Manage_study_groups" && _this.SignedIn == true) {
                    _this.answer = result.fulfillment.speech;
                    _this.afDatabase.database.ref("users/" + _this.Token + "/Study groups").once('value').then(function (snapshot1) {
                        var study_group = {};
                        snapshot1.forEach(function (snapshot2) {
                            study_group = {
                                Date: snapshot2.child("Date").val(),
                                Time: snapshot2.child("Time").val(),
                                Place: snapshot2.child("Place").val(),
                                Study_Token: snapshot2.key
                            };
                        });
                        _this.Study_Groups.push(study_group);
                    });
                    _this.Show_groups = 1;
                }
                else if (result.action == "showUniversities" && result.parameters.country != '' && _this.SignedIn == true) {
                    _this.afDatabase.database.ref('/universtes').child(result.parameters.country)
                        .once('value').then(function (snapshot1) {
                        snapshot1.forEach(function (snapshot2) {
                            var university = snapshot2.val();
                            university['country'] = result.parameters.country,
                                _this.universities.push(university);
                        });
                        _this.need_universty = 1;
                        _this.answer = 'There are some universities!';
                    });
                }
                else if (result.action == "applyToStudentActivity" && result.parameters.studentActivityName != '' && _this.SignedIn == true) {
                    _this.SU_name = result.parameters.studentActivityName;
                    _this.afDatabase.database.ref(_this.SU_name).child('questions').once('value')
                        .then(function (snapshot1) {
                        snapshot1.forEach(function (snapshot2) {
                            _this.allQuestions.push(snapshot2.val());
                        });
                        _this.answer = _this.allQuestions[_this.questionNumber];
                        _this.formQuestion = true;
                    });
                }
                else if (result.action == "Interviews_Scheduling" && _this.SignedIn == true) {
                    _this.answer = result.fulfillment.speech;
                    if (result.actionIncomplete == true) {
                        if (result.parameters["studentActivity"] == "") {
                        }
                        else if (result.parameters["day"] == "") {
                            _this.Show_date = true;
                            _this.Show_ChooseTime = true;
                        }
                        else if (result.parameters["startTime"] == "") {
                            _this.Show_date = false;
                            _this.Show_time = true;
                            _this.Show_ChooseTime = true;
                        }
                        else if (result.parameters["endTime"] == "") {
                            _this.Show_time = true;
                            _this.Show_ChooseDuration = true;
                        }
                        else if (result.parameters["duration"] == "") {
                            _this.Show_time = false;
                            _this.Show_ChooseDuration = false;
                            _this.Show_duration = true;
                            _this.Show_WritePlace = true;
                            console.log("in duration");
                        }
                        else if (result.parameters["place"] == "") {
                            console.log("in place");
                            _this.Show_duration = false;
                            _this.Show_WritePlace = false;
                        }
                    }
                    else {
                        var studentActivity = result.parameters.studentActivity;
                        var dayOfInterview = result.parameters.day;
                        var startTime = result.parameters.startTime;
                        var endTime = result.parameters.endTime;
                        var duration = result.parameters.duration;
                        var place = result.parameters.place;
                        var day = dayOfInterview.slice(8, 10);
                        var month = dayOfInterview.slice(5, 7);
                        var year = dayOfInterview.slice(0, 4);
                        var daySlot = month + "/" + day + "/" + year;
                        _this.AddDuration(daySlot, startTime, endTime, parseInt(duration), studentActivity, place);
                    }
                }
                else if (result.action == "showApplicants" && result.actionIncomplete == false && _this.SignedIn == true) {
                    _this.SU_name = result.parameters.studentActivity;
                    _this.afDatabase.database.ref(_this.SU_name + "/applicants").once('value').then(function (snapshot1) {
                        snapshot1.forEach(function (snapshot2) {
                            var applicant = {};
                            _this.afDatabase.database.ref("users/" + snapshot2.key).once('value').then(function (snapshot3) {
                                applicant["Applicant_Token"] = snapshot2.key;
                                applicant["Name"] = snapshot3.child("First_name").val() + " " + snapshot3.child("Last_name").val();
                                applicant["Status"] = snapshot2.child("status").val();
                                applicant["Responses"] = snapshot2.child("responses").val();
                            });
                            _this.applicants.push(applicant);
                        });
                    });
                    _this.Show_applicants = true;
                }
                else if (result.action !== "input.unknown" && result.action !== "input.welcome" && result.action !== "SignIn" && result.action !== "SignUp" && result.action !== "SignUp-Credentials" && _this.SignedIn == false) {
                    _this.answer = "I think you should sign in!😊";
                }
                else {
                    _this.answer = result.fulfillment.speech;
                }
                _this.afDatabase.database.ref('options').child(result.metadata.intentName).once('value').then(function (snapshot1) { _this.options = snapshot1.val(); });
            }).once('error', function (error) {
                console.log(error);
            }).end();
        }
        this.question = null;
    };
    HomePage.prototype.addData = function (collection, child, nextChild, data) {
        if (nextChild) {
            return this.afDatabase.database.ref(collection).child(child).child(nextChild).update(data);
        }
        return this.afDatabase.database.ref(collection).child(child).update(data);
    };
    HomePage.prototype.rating = function (x) {
        this.rated = x;
        var data = {};
        data[this.Intent_data.phone] = this.rated;
        this.addData('/users', this.Token, 'Ratings', data).then().catch();
        this.answer = "Thanks for your Feedback😊";
    };
    HomePage.prototype.Invite = function () {
        var _this = this;
        var group_people = {};
        var tempFriends = [];
        this.Friends.forEach(function (Friend) {
            if (Friend.checked == true) {
                tempFriends.push(Friend);
                group_people[Friend.Phone] = "Pending";
            }
        });
        if (tempFriends !== []) {
            this.Show_Friends = false;
            this.Select_Friends = false;
            var group_key;
            var group_data = this.Notification_data.data;
            this.afDatabase.database.ref("users/" + this.Token + "/Study groups").once('value').then(function (snapshot1) {
                snapshot1.ref.parent.child('Phone').once('value').then(function (snapshot2) {
                    group_people[snapshot2.val()] = "Joining";
                    var group = {};
                    group["Date"] = group_data["Date"];
                    group["Time"] = group_data["Time"];
                    group["Place"] = group_data["Place"];
                    group["Reminder"] = _this.Make_Reminder(group_data["Date"] + ", " + group_data["Time"], 24);
                    group_key = snapshot1.ref.push(group).key;
                    snapshot1.child(group_key).ref.update({ People: group_people });
                    _this.Notification_data.data["Study_Token"] = group_key;
                    _this.Notification_data.data = JSON.stringify(_this.Notification_data.data);
                });
            }).then(function () {
                tempFriends.forEach(function (tempFriendPrimary) {
                    var group_people = {};
                    tempFriends.forEach(function (tempFriendSecondary) {
                        group_people[tempFriendSecondary.Phone] = "Pending";
                    });
                    _this.afDatabase.database.ref("users/" + tempFriendPrimary.Token).child("Study groups").once('value').then(function (snapshot1) {
                        _this.afDatabase.database.ref("users/" + _this.Token).child("Phone").once('value').then(function (snapshot2) {
                            group_people[snapshot2.val()] = "Joining";
                            var group = {};
                            group["Date"] = group_data["Date"];
                            group["Time"] = group_data["Time"];
                            group["Place"] = group_data["Place"];
                            group["Reminder"] = _this.Make_Reminder(group_data["Date"] + ", " + group_data["Time"], 24);
                            snapshot1.child(group_key).ref.update(group);
                            snapshot1.child(group_key).ref.update({ People: group_people });
                        });
                    });
                    _this.sendNotification(tempFriendPrimary.Token);
                });
            });
            this.answer = "I invited your selected friends to the study group!😊";
        }
        else {
            this.answer = "Please invite at least 1 of your friends";
        }
    };
    HomePage.prototype.Group_Select = function (Group) {
        var _this = this;
        this.answer = "Here are the people in the study group on " + Group["Date"] + " at " + Group["Time"] + " in " + Group["Place"];
        this.afDatabase.database.ref("users/" + this.Token + "/Study groups/" + Group["Study_Token"] + "/People").once('value').then(function (snapshot1) {
            var Study_People = [];
            snapshot1.forEach(function (snapshot2) {
                var Study_Person = {};
                _this.afDatabase.database.ref('users').once('value').then(function (snapshot3) {
                    snapshot3.forEach(function (snapshot4) {
                        if (snapshot4.child("Phone").val() == snapshot2.key) {
                            Study_Person = {
                                Person: {
                                    Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                                    Status: snapshot2.val()
                                }
                            };
                            Study_People.push(Study_Person);
                        }
                        if (snapshot4.key == _this.Token && snapshot4.child("Phone").val() == snapshot2.key && snapshot2.val() == "Pending") {
                            _this.Select_Groups = true;
                        }
                    });
                });
            });
            _this.Current_Group["Study_People"] = Study_People;
            _this.Current_Group["Study_Token"] = Group["Study_Token"];
        });
        this.Show_groups = 2;
    };
    HomePage.prototype.Group_Reply = function (event) {
        var _this = this;
        var Study_Token = this.Current_Group["Study_Token"];
        if (event.toElement.innerHTML == "Accept") {
            this.answer = "You have accepted to join that study group";
            this.afDatabase.database.ref("users/" + this.Token + "/Phone").once('value').then(function (MyPhone) {
                _this.afDatabase.database.ref('users').once('value').then(function (snapshot1) {
                    if (snapshot1.exists()) {
                        snapshot1.forEach(function (snapshot2) {
                            var PhoneKey = snapshot2.child("Study groups/" + Study_Token + "/People/" + MyPhone.val());
                            if (PhoneKey.exists()) {
                                PhoneKey.ref.set("Joining");
                            }
                        });
                        _this.afDatabase.database.ref("users/" + _this.Token + "/Study groups/" + Study_Token + "/People").once('value').then(function (snapshot1) {
                            var Study_People = [];
                            snapshot1.forEach(function (snapshot2) {
                                var Study_Person = {};
                                _this.afDatabase.database.ref('users').once('value').then(function (snapshot3) {
                                    snapshot3.forEach(function (snapshot4) {
                                        if (snapshot4.child("Phone").val() == snapshot2.key) {
                                            Study_Person = {
                                                Person: {
                                                    Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                                                    Status: snapshot2.val()
                                                }
                                            };
                                            Study_People.push(Study_Person);
                                        }
                                    });
                                });
                            });
                            _this.Current_Group["Study_People"] = Study_People;
                        });
                    }
                });
            });
        }
        else if (event.toElement.innerHTML == "Refuse") {
            this.answer = "You have refused to join that study group";
            this.afDatabase.database.ref("users/" + this.Token + "/Phone").once('value').then(function (MyPhone) {
                _this.afDatabase.database.ref('users').once('value').then(function (snapshot1) {
                    if (snapshot1.exists()) {
                        snapshot1.forEach(function (snapshot2) {
                            var PhoneKey = snapshot2.child("Study groups/" + Study_Token + "/People/" + MyPhone.val());
                            if (PhoneKey.exists()) {
                                PhoneKey.ref.set("Not joining");
                            }
                        });
                        _this.afDatabase.database.ref("users/" + _this.Token + "/Study groups/" + Study_Token + "/People").once('value').then(function (snapshot1) {
                            var Study_People = [];
                            snapshot1.forEach(function (snapshot2) {
                                var Study_Person = {};
                                _this.afDatabase.database.ref('users').once('value').then(function (snapshot3) {
                                    snapshot3.forEach(function (snapshot4) {
                                        if (snapshot4.child("Phone").val() == snapshot2.key) {
                                            Study_Person = {
                                                Person: {
                                                    Name: snapshot4.child('First_name').val() + " " + snapshot4.child('Last_name').val(),
                                                    Status: snapshot2.val()
                                                }
                                            };
                                            Study_People.push(Study_Person);
                                        }
                                    });
                                });
                            });
                            _this.Current_Group["Study_People"] = Study_People;
                        });
                    }
                });
            });
        }
        this.Select_Groups = false;
        this.Study_Groups = [];
    };
    HomePage.prototype.Show_Applicant = function (applicant) {
        this.Current_Applicant = applicant;
        this.Show_application = true;
        this.Hide_applicant = true;
        this.Select_Applicants = true;
    };
    HomePage.prototype.Tutor_Select = function (Tutor) {
        this.Current_Tutor = Tutor;
        this.need_tutor = 2;
    };
    HomePage.prototype.Tutor_Reserve = function (i) {
        var data = {
            subject: this.Current_Tutor.subject,
            name: this.Current_Tutor.name,
            phone: this.Current_Tutor.phone,
            slot: {
                date: this.Current_Tutor.lessons[i].slot.date,
                start_time: this.Current_Tutor.lessons[i].slot.start_time,
                end_time: this.Current_Tutor.lessons[i].slot.end_time,
                reminder: this.Make_Reminder(this.Current_Tutor.lessons[i].slot.date + ", " + this.Current_Tutor.lessons[i].slot.start_time, 24)
            },
            place: this.Current_Tutor.lessons[i].place,
            cost: this.Current_Tutor.lessons[i].cost
        };
        this.afDatabase.database.ref('users').child(this.Token).child('lessonsRequests').push(data);
        var dt = new Date(this.Make_Reminder(this.Current_Tutor.lessons[i].slot.date + ", " + this.Current_Tutor.lessons[i].slot.start_time, 24));
        this.calendar.createEventWithOptions(this.Current_Tutor.subject + " class", null, null, dt, dt, { 'firstReminderMinutes': 0 });
        this.need_tutor = 0;
        this.Current_Tutor = '';
        this.Tutors = [];
        this.answer = "I reserved your lesson! 😊";
    };
    HomePage.prototype.Make_Reminder = function (datetime, hours) {
        var reminder = new Date(datetime);
        reminder.setHours(reminder.getHours() - hours);
        var date = reminder.toLocaleDateString();
        var time = [(reminder.getHours() > 12) ? reminder.getHours() - 12 : (reminder.getHours() == 0) ? "12" : reminder.getHours(), (reminder.getMinutes() < 10) ? '0' + reminder.getMinutes() : reminder.getMinutes()].join(":");
        var ampm = (reminder.getHours() < 12) ? "AM" : "PM";
        return date + ", " + time + " " + ampm;
    };
    HomePage.prototype.sendNotification = function (Token) {
        var payload = {
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
        };
        var options = new __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        this.http.post("https://fcm.googleapis.com/fcm/send", payload, {
            headers: options.set('Authorization', 'key=AAAAKAxjJwY:APA91bEfWiPXewKlIjvQy1kU5jEqZtBZWw6rWRQOBIesv3bmDzzExIQmOJhyZ_jgubS9T90k-XA7wTt-v8KxZwsRXf8MXCwO-oUPdJ3L7-XabAK3xsPAm8klUSRrBXnXF89fCl4t2_AXxFiLwkQahoeju1GWCYglYQ'),
        }).subscribe();
    };
    HomePage.prototype.nextSlide = function () {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
    };
    HomePage.prototype.selectUniversity = function (i) {
        var _this = this;
        var universityID = this.universities[i].university_id;
        this.afDatabase.database.ref('users').child(this.Token).child('universityInterests').push(universityID)
            .then(function () {
            _this.answer = "Nice, Reserved";
            return;
        });
    };
    HomePage.prototype.AddDuration = function (dayOfInterview, startTime, endTime, duration, studentActivity, place) {
        startTime = [startTime.split(":")["0"], startTime.split(":")["1"]].join(":");
        endTime = [endTime.split(":")["0"], endTime.split(":")["1"]].join(":");
        var startdateTime = new Date(dayOfInterview + ", " + startTime);
        var enddateTime = new Date(dayOfInterview + ", " + endTime);
        var slots = [];
        while (startdateTime.toLocaleString() !== enddateTime.toLocaleString()) {
            var slot = {};
            slot['startTime'] = [startdateTime.toLocaleTimeString().split(":")["0"], startdateTime.toLocaleTimeString().split(":")["1"]].join(":");
            startdateTime.setMinutes(startdateTime.getMinutes() + duration);
            slot['endTime'] = [startdateTime.toLocaleTimeString().split(":")["0"], startdateTime.toLocaleTimeString().split(":")["1"]].join(":");
            slot['date'] = startdateTime.toLocaleDateString();
            slot['place'] = place;
            slots.push(slot);
        }
        this.afDatabase.database.ref(studentActivity + "/slots").set(slots);
    };
    HomePage.prototype.addFormAnswers = function (answer) {
        this.addData(this.SU_name, "applicants/" + this.Token + "/responses", null, answer);
        this.addData(this.SU_name, "applicants/" + this.Token, null, { status: "Pending" });
    };
    HomePage.prototype.editDistance = function (s1, s2) {
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
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    };
    HomePage.prototype.similarity = function (s1, s2) {
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
    };
    HomePage.prototype.similarnumber = function (a, b) {
        var z;
        if (a < b) {
            z = a;
            a = b;
            b = z;
        }
        var diff = a - b;
        if (diff == 0) {
            return 1;
        }
        else if (diff > 0 && diff <= 0.2) {
            return 0.8;
        }
        else if (diff > 0.2 && diff <= 0.5) {
            return 0.5;
        }
        else if (diff > 0.5 && diff <= 0.7) {
            return 0.3;
        }
        else if (diff > 0.7 && diff <= 1) {
            return 0.1;
        }
        else {
            return 0;
        }
    };
    HomePage.prototype.relevantMajors = function () {
        var _this = this;
        var userschool;
        var usergrade;
        this.afDatabase.database.ref("/users").child(this.Token).once("value").then(function (snapshot) {
            userschool = snapshot.child("School").val();
            usergrade = snapshot.child("Grade").val();
            _this.afDatabase.database.ref("/Old Users").once("value").then(function (snapshot1) {
                snapshot1.forEach(function (snapshot2) {
                    var schoolname = snapshot2.child("SchoolName").val();
                    var schoolgrade = snapshot2.child("Grade").val();
                    var Major = snapshot2.child("Major").val();
                    var MatchedCases = 0;
                    var schoolSimilarity = _this.similarity(userschool, schoolname) * 100;
                    if (schoolSimilarity > 0) {
                        MatchedCases++;
                    }
                    var gradeSimilarity = _this.similarnumber(usergrade, schoolgrade) * 100;
                    if (gradeSimilarity > 0) {
                        MatchedCases++;
                    }
                    var totalPercent = schoolSimilarity + gradeSimilarity;
                    var rank = MatchedCases * totalPercent;
                    console.log("This users matched cases = " + MatchedCases + " with percentage " + totalPercent + " and rank " + rank);
                    if (rank > 0) {
                        var data = {};
                        data[Major] = rank;
                        _this.addData('/users', _this.Token, 'PossibleMajors', data).then().catch();
                    }
                });
            });
        });
    };
    HomePage.prototype.showMajors = function () {
        console.log("Prinitng the Majors");
        this.afDatabase.database.ref("/users").child(this.Token).child("PossibleMajors").once("value").then(function (snapshot1) {
            snapshot1.forEach(function (snapshot2) {
                console.log("Major = " + snapshot2.key + " of rank " + snapshot2.val());
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* Content */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* Content */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* Content */]) === "function" && _a || Object)
    ], HomePage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* Slides */]),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* Slides */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* Slides */]) === "function" && _b || Object)
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\FF\ALIS\src\pages\home\home.html"*/'<ion-header no-border>\n    <ion-navbar>\n        <ion-title>\n            <!--<ion-icon class = "Lefticon" ios="ios-information-circle" md="md-information-circle"></ion-icon>\n        <ion-icon class ="Righticon" ios="ios-help-circle" md="md-help-circle"></ion-icon>-->\n            <img class="logo" src="../assets/imgs/Purple-PNG.png">\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content no-bounce>\n    <ion-list>\n        <div *ngIf="answer?.length > 0" no-lines>\n            <ion-card *ngIf="Alis_first == false" text-wrap class="grey">\n                <ion-item text-wrap class="greytext">{{chat}}</ion-item>\n                <ion-label class="greyclock">{{CurrentTime}}</ion-label>\n            </ion-card>\n\n\n            <ion-card text-wrap class="purple">\n                <ion-item text-wrap class="purpletext">{{answer}}</ion-item>\n\n                <ion-card *ngIf="need_tutor == 1">\n                    <ion-slides class="slider-slide">\n                        <ion-slide class="slider-slide" *ngFor="let Tutor of Tutors">\n                            <ion-toolbar>\n                                <ion-buttons end>\n                                    <button ion-button class="nextbutton" color="primary" (click)="nextSlide()">Next</button>\n                                </ion-buttons>\n                            </ion-toolbar>\n                            <img src="{{Tutor.image}}" class="slide-image" />\n                            <h1 class="description" style="font-size: 15px;">{{Tutor.name}}</h1>\n                            <h1 class="description" style="font-size: 15px;">{{Tutor.phone}}</h1>\n                            <button ion-button color="primary" class="joinbutton" (click)="Tutor_Select(Tutor)" round>\n                                Join Tutor\n                            </button>\n                        </ion-slide>\n                    </ion-slides>\n                </ion-card>\n\n                <ion-list *ngIf="need_tutor == 2">\n                    <ion-item *ngFor="let lesson of Current_Tutor.lessons; let i = index" style="border-bottom: 1px solid purple;">\n                        <h2><i>Slot</i></h2>\n                        <p>{{lesson.slot.date}}, {{lesson.slot.start_time}} -> {{lesson.slot.end_time}}</p>\n                        <h2><i>Place</i></h2>\n                        <p>{{lesson.place}}</p>\n                        <h2><i>Cost</i></h2>\n                        <p>{{lesson.cost}}</p>\n                        <ion-icon name="arrow-dropright-circle" class="select_icon" (click)="Tutor_Reserve(i)" item-end></ion-icon>\n                    </ion-item>\n                </ion-list>\n\n\n                <ion-list *ngIf="Show_applicants == true">\n                    <ion-item *ngFor="let applicant of applicants" style="border-bottom: 1px solid purple;">\n                        <h2><i>{{applicant.Name}}</i></h2>\n                        <p>{{applicant.Status}}</p>\n                        <ion-icon *ngIf="Hide_applicant == false" name="arrow-dropdown-circle" class="select_icon"\n                            (click)="Show_Applicant(applicant)" item-end></ion-icon>\n                        <ion-icon *ngIf="Hide_applicant == true" name="arrow-dropup-circle" class="select_icon" (click)="Hide_Applicant(applicant)"\n                            item-end></ion-icon>\n                        <ion-list *ngIf="Show_application == true">\n                            <ion-item *ngFor="let Response of Current_Applicant.Responses" style="border-bottom: 1px solid purple;">\n                                <h2><i>Responses</i></h2>\n                                <p>{{Response}}</p>\n                            </ion-item>\n                        </ion-list>\n                        <button ion-button block *ngIf="Select_Applicants == true" (click)="Applicant_Reply($event)">Accept</button>\n                        <button ion-button block *ngIf="Select_Applicants == true" (click)="Applicant_Reply($event)">Refuse</button>\n                    </ion-item>\n                </ion-list>\n\n\n\n\n\n\n\n\n\n\n\n\n                <div *ngIf="tutor_Feedback == true">\n                    <ion-icon class="rating" [color]="rated==1 ||rated==2 ||rated==3 ||rated==4 ||rated==5? \'rate\' : \'light\'"\n                        name="star" (click)="rating(1)"></ion-icon>\n                    <ion-icon class="rating" [color]="rated==2 ||rated==3 ||rated==4 ||rated==5? \'rate\' : \'light\'" name="star"\n                        (click)="rating(2)"></ion-icon>\n                    <ion-icon class="rating" [color]="rated==3 ||rated==4 ||rated==5? \'rate\' : \'light\'" name="star"\n                        (click)="rating(3)"></ion-icon>\n                    <ion-icon class="rating" [color]="rated==4 ||rated==5? \'rate\' : \'light\'" name="star" (click)="rating(4)"></ion-icon>\n                    <ion-icon class="rating" [color]="rated==5? \'rate\' : \'light\'" name="star" (click)="rating(5)"></ion-icon>\n                </div>\n\n                <div *ngIf="Show_date == true">\n                    <ion-item>\n                        <ion-datetime displayFormat="M/D/YYYY" min="2018" placeholder="M/D/YYYY" [(ngModel)]="date"></ion-datetime>\n                    </ion-item>\n                    <button ion-button clear block *ngIf="Show_ChooseTime == true" (click)="question=date;ask()">Choose\n                        Time</button>\n                </div>\n\n                <div *ngIf="Show_time == true">\n                    <ion-item>\n                        <ion-datetime displayFormat="h:mm A" placeholder="h:mm A" [(ngModel)]="time"></ion-datetime>\n                    </ion-item>\n                    <button ion-button clear block *ngIf="Show_ChooseFriends == true" (click)="question=time;ask()">Choose\n                        friends</button>\n                    <button ion-button clear block *ngIf="Show_ChooseTime == true" (click)="question=time;ask()">Choose\n                        Time</button>\n                    <button ion-button clear block *ngIf="Show_ChooseDuration == true" (click)="question=time;ask()">Choose\n                        Duration</button>\n                </div>\n\n                <div *ngIf="Show_duration == true">\n                    <ion-item>\n                        <ion-label>Duration</ion-label>\n                        <ion-select [(ngModel)]="duration">\n                            <div *ngFor="let number of \' \'.repeat(60).split(\'\'), let i = index">\n                                <ion-option value="{{i}}">{{i}}</ion-option>\n                            </div>\n                        </ion-select>\n                    </ion-item>\n                    <button ion-button clear block *ngIf="Show_WritePlace == true" (click)="question=duration;ask()">Write\n                        Place</button>\n                </div>\n\n                <ion-list *ngIf="Show_groups == 1">\n                    <ion-item *ngFor="let Group of Study_Groups" style="border-bottom: 1px solid purple;">\n                        <h2><i>{{Group.Place}}</i></h2>\n                        <p>{{Group.Date}}, {{Group.Time}}</p>\n                        <ion-icon name="arrow-dropright-circle" class="select_icon" (click)="Group_Select(Group)"\n                            item-end></ion-icon>\n                    </ion-item>\n                </ion-list>\n\n                <ion-list *ngIf="Show_groups == 2">\n                    <ion-item *ngFor="let Study_Person of Current_Group.Study_People" style="border-bottom: 1px solid purple;">\n                        <h2><i>{{Study_Person.Person.Name}}:</i></h2>\n                        <p item-end>{{Study_Person.Person.Status}}</p>\n                    </ion-item>\n                </ion-list>\n                <button ion-button block *ngIf="Select_Groups == true" (click)="Group_Reply($event)">Accept</button>\n                <button ion-button block *ngIf="Select_Groups == true" (click)="Group_Reply($event)">Refuse</button>\n\n                <ion-list *ngIf="Show_Friends == true">\n                    <ion-item *ngFor="let Friend of Friends" style="border-bottom: 1px solid purple;">\n                        <ion-label>\n                            <h2><i>{{Friend.Name}}:</i></h2>\n                        </ion-label>\n                        <p item-end>{{Friend.Phone}}</p>\n                        <ion-checkbox *ngIf="Select_Friends == true" [(ngModel)]="Friend.checked"></ion-checkbox>\n                    </ion-item>\n                </ion-list>\n                <button ion-button block *ngIf="Select_Friends == true" (click)="Invite()">Invite</button>\n\n                <ion-card *ngIf="need_universty == 1">\n                    <ion-slides class="slider-slide">\n                        <ion-slide class="slider-slide" *ngFor="let slide of universities; let i = index">\n                            <ion-toolbar>\n                                <ion-buttons end>\n                                    <button ion-button class="nextbutton" color="primary" (click)="nextSlide()">Next</button>\n                                </ion-buttons>\n                            </ion-toolbar>\n                            <img src="{{slide.img_url}}" class="slide-image" />\n                            <h1 class="description" style="font-size: 15px;">{{slide.universtyName}}</h1>\n                            <h6 class="description" style="font-size : 12px;"><b>Location:</b>{{slide.location}}</h6>\n                            <p class="descriptioncard">{{slide.description}}</p>\n\n                            <button ion-button large clear icon-end color="primary" (click)="selectUniversity(i)"\n                                disabled={{interestedButton}}>\n                                Interested\n                                <ion-icon name="ios-flash-outline"></ion-icon>\n                            </button>\n\n                        </ion-slide>\n                    </ion-slides>\n                </ion-card>\n\n\n                <ion-label class="purpleclock">{{CurrentTime}}</ion-label>\n            </ion-card>\n            <br>\n        </div>\n    </ion-list>\n    <div style=" padding-top:1px; position: absolute; bottom: 5px;width: 100%">\n        <div style="text-align: center" class="options">\n            <div class="options" no-lines *ngFor="let option of options;" text-center>\n                <button class="optionbutton" ion-button round outline (click)="question=option;ask()">{{option}}</button>\n            </div>\n\n        </div>\n    </div>\n</ion-content>\n\n<ion-footer style="background-color:#ffffff">\n    <div style="background-color:#ffffff;margin-top:15px;text-align: center" class="options">\n        <div class="options" no-lines *ngFor="let option of options;" text-center>\n            <button class="optionbutton" ion-button round outline (click)="question=option;ask()">{{option}}</button>\n        </div>\n    </div>\n    <div class="flex-items" padding>\n        <ion-input [(ngModel)]="question" class="input_message" placeholder="Type a message..."></ion-input>\n        <button class="circularbutton" ion-button icon-only (click)="ask()">\n            <ion-icon name="send" class="send"></ion-icon>\n        </button>\n    </div>\n</ion-footer>'/*ion-inline-end:"D:\FF\ALIS\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* NavController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* Platform */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_core__["M" /* NgZone */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__node_modules_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__node_modules_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__services_Sharing_Service_SharingService_service__["a" /* SharingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_Sharing_Service_SharingService_service__["a" /* SharingService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_native_contacts__["a" /* Contacts */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_native_contacts__["a" /* Contacts */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_network__["a" /* Network */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_native_calendar__["a" /* Calendar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_native_calendar__["a" /* Calendar */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_0__ionic_native_fcm__["a" /* FCM */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__ionic_native_fcm__["a" /* FCM */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__node_modules_angular_common_http__["a" /* HttpClient */]) === "function" && _o || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(432);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firebase_credentials__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_typing__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_fcm__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_contacts__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_Sharing_Service_SharingService_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_calendar__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_common_http__ = __webpack_require__(309);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7_ng_typing__["a" /* TypingModule */],
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_1__firebase_credentials__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_16__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_contacts__["a" /* Contacts */],
                __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_14__services_Sharing_Service_SharingService_service__["a" /* SharingService */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_calendar__["a" /* Calendar */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyB2okykOVc15jxtjAL_jArbP9JwE963ejU",
    authDomain: "alis-ac07d.firebaseapp.com",
    databaseURL: "https://alis-ac07d.firebaseio.com",
    projectId: "alis-ac07d",
    storageBucket: "alis-ac07d.appspot.com",
    messagingSenderId: "172006516486"
};
//# sourceMappingURL=firebase.credentials.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_Sharing_Service_SharingService_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_fcm__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, fcm, Share) {
        var _this = this;
        this.fcm = fcm;
        this.Share = Share;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        //Notifications
        fcm.subscribeToTopic('all');
        fcm.getToken().then(function (token) {
            console.log(token);
            _this.Share.setToken(token);
        });
        fcm.onTokenRefresh().subscribe(function (token) {
            console.log(token);
        });
        //end notifications.
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\FF\ALIS\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"D:\FF\ALIS\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_fcm__["a" /* FCM */], __WEBPACK_IMPORTED_MODULE_0__services_Sharing_Service_SharingService_service__["a" /* SharingService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 505:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 507:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[310]);
//# sourceMappingURL=main.js.map