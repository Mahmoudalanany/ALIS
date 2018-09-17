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
        this.limit = 60;
        this.truncating = true;
        this.Tutors = [];
        this.universities = [];
        this.options = [];
        this.need_tutor = 0;
        this.need_universty = 0;
        this.Token = '';
        this.SU_ques = [];
        this.filling_form = false;
        this.q_num = 1;
        this.end_of_form = false;
        this.Friends = [];
        this.Show_Friends = false;
        this.Select_Friends = false;
        this.Intent_type = 'Welcome';
        this.tutor_Feedback = false;
        this.Alis_first = false;
        this.SignedIn = false;
        this.date = false;
        this.time = false;
        var test = {};
        test["zeft"] = { betnegan: "5araaa" };
        console.log(test);
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
            if (_this.Intent_type == "rating") {
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
                }).once('error', function (error) {
                    console.log(error);
                }).end();
            }
            else if (_this.Intent_type == "Study_group_Reply") {
                _this.answer = "Here are the people in the study group on " + _this.Intent_data["Date"] + " at " + _this.Intent_data["Time"] + " in " + _this.Intent_data["Place"];
                _this.afDatabase.database.ref("users/" + _this.Token + "/Study groups/" + _this.Intent_data["Study_Token"] + "/People").once('value').then(function (snapshot1) {
                    console.log(snapshot1.val());
                });
            }
            else if (_this.Intent_type == "Welcome") {
                _this.afDatabase.database.ref('/users').once('value').then(function (snapshot1) {
                    if (snapshot1.child(_this.Token).exists()) {
                        _this.API_Agent.eventRequest({ name: "Welcome", data: { 'Name': snapshot1.child(_this.Token).child('First_name').val() } }, { sessionId: _this.uuid })
                            .once('response', function (_a) {
                            var speech = _a.result.fulfillment.speech;
                            speech = speech + "😊";
                            _this.answer = speech;
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
        var d = new Date(), time = [(d.getHours() > 12) ? d.getHours() - 12 : (d.getHours() == 0) ? "12" : d.getHours(), d.getMinutes()].join(":"), ampm = (d.getHours() < 12) ? "AM" : "PM";
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
        this.Alis_first = false;
        this.need_tutor = 0;
        this.tutor_Feedback = false;
        this.rated = null;
        this.Friends = [];
        this.Show_Friends = false;
        this.Select_Friends = false;
        this.date = false;
        this.time = false;
        this.content.scrollToBottom();
        this.chat = this.question;
        this.Update_Time();
        this.content.scrollToBottom();
        if (this.filling_form) {
            if (this.end_of_form) {
                console.log("ay hary");
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
                .once('response', function (_a) {
                var result = _a.result;
                console.log(result);
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
                                cost: snapshot2.child('cost').val(),
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
                    console.log(result);
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'get_hobbies' && _this.SignedIn == true) {
                    if (result.parameters.hobbies.length > 0) {
                        var data = { hobbies: result.parameters.hobbies };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                    console.log(result);
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
                    console.log(result);
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
                else if (result.action == "Student_activity_name" && _this.SignedIn == true) {
                    _this.SU_name = result.parameters.Student_Activities;
                    if (!_this.SU_name) {
                        _this.answer = result.fulfillment.speech;
                    }
                    else {
                        _this.get_application_questions('1');
                        _this.applicant_id = _this.afDatabase.database.ref('/' + _this.SU_name + "_applicants").push({
                            token: _this.Token
                        }).key;
                        _this.filling_form = true;
                        _this.end_of_form = false;
                    }
                }
                else if (result.action == "Study_group_Creation" && _this.SignedIn == true) {
                    _this.answer = result.fulfillment.speech;
                    if (result.actionIncomplete == true) {
                        if (result.parameters["place"] !== "" && result.parameters["date"] == "") {
                            _this.date = true;
                        }
                        else if (result.parameters["place"] !== "" && result.parameters["date"] !== "" && result.parameters["time"] == "") {
                            _this.time = true;
                            _this.SyncFriends();
                        }
                    }
                    else {
                        result.parameters["date"] = new Date(result.parameters["date"]).toLocaleDateString();
                        result.parameters["time"] = [(parseInt(_this.Study_time.split(":")["0"]) > 12) ? parseInt(_this.Study_time.split(":")["0"]) - 12 : (parseInt(_this.Study_time.split(":")["0"]) == 0) ? "12" : parseInt(_this.Study_time.split(":")["0"]).toString(), _this.Study_time.split(":")["1"]].join(":") + ((parseInt(_this.Study_time.split(":")["0"]) > 12) ? " PM" : " AM");
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
                    _this.afDatabase.database.ref("users/" + _this.Token + "/Phone").once('value').then(function (MyPhone) {
                        _this.afDatabase.database.ref('users').once('value').then(function (snapshot1) {
                            if (snapshot1.exists()) {
                                snapshot1.forEach(function (snapshot2) {
                                    var PhoneKey = snapshot2.child("Study groups/" + _this.Intent_data["Study_Token"] + "/People/" + MyPhone.val());
                                    if (snapshot2.key !== _this.Token && PhoneKey.exists()) {
                                        PhoneKey.ref.set("Joining");
                                    }
                                });
                            }
                        });
                    });
                    _this.afDatabase.database.ref("users/" + _this.Token).once('value').then(function (snapshot1) {
                        _this.Notification_data = {
                            Title: "Study Group",
                            Body: snapshot1.child('First_name').val() + " " + snapshot1.child('Last_name').val() + " has accepted to join the study group on " + result.parameters["date"] + " at " + result.parameters["time"] + " in " + result.parameters["place"],
                            type: "Study_group_Reply",
                            data: {
                                Date: "" + result.parameters["date"],
                                Time: "" + result.parameters["time"],
                                Place: "" + result.parameters["place"],
                                Study_Token: _this.Intent_data["Study_Token"]
                            }
                        };
                    });
                    _this.sendNotification(_this.Intent_data["Creator"]);
                    _this.Notification_data = {};
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == "Study_group_Invitation-no" && _this.SignedIn == true) {
                    _this.afDatabase.database.ref("users/" + _this.Token + "/Phone").once('value').then(function (MyPhone) {
                        _this.afDatabase.database.ref('users').once('value').then(function (snapshot1) {
                            if (snapshot1.exists()) {
                                snapshot1.forEach(function (snapshot2) {
                                    var PhoneKey = snapshot2.child("Study groups/" + _this.Intent_data["Study_Token"] + "/People/" + MyPhone.val());
                                    if (snapshot2.key !== _this.Token && PhoneKey.exists()) {
                                        PhoneKey.ref.set("Not joining");
                                    }
                                });
                            }
                        });
                    });
                    _this.afDatabase.database.ref("users/" + _this.Token).once('value').then(function (snapshot1) {
                        _this.Notification_data = {
                            Title: "Study Group",
                            Body: snapshot1.child('First_name').val() + " " + snapshot1.child('Last_name').val() + " has refused to join the study group on " + result.parameters["date"] + " at " + result.parameters["time"] + " in " + result.parameters["place"],
                            type: "Study_group_Reply",
                            data: {
                                Date: "" + result.parameters["date"],
                                Time: "" + result.parameters["time"],
                                Place: "" + result.parameters["place"],
                                Study_Token: _this.Intent_data["Study_Token"]
                            }
                        };
                    });
                    _this.sendNotification(_this.Intent_data["Creator"]);
                    _this.Notification_data = {};
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == "showUniversities" && result.parameters.country != '' && _this.SignedIn == true) {
                    _this.afDatabase.database.ref('/universtes').child(result.parameters.country)
                        .once('value').then(function (snapshot1) {
                        snapshot1.forEach(function (snapshot2) {
                            var university = {
                                country: result.parameters.country,
                                location: snapshot2.child('location').val(),
                                image: snapshot2.child('img_url').val(),
                                description: snapshot2.child('description').val(),
                                universtyName: snapshot2.child('name').val()
                            };
                            _this.universities.push(university);
                        });
                        _this.need_universty = 1;
                    });
                }
                else if (result.action !== "input.unknown" && result.action !== "input.welcome" && result.action !== "SignIn" && result.action !== "SignUp" && result.action !== "SignUp-Credentials" && _this.SignedIn == false) {
                    _this.answer = "I think you should sign in!😊";
                }
                else {
                    console.log(result.fulfillment.speech);
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
    HomePage.prototype.get_application_questions = function (Q_num) {
        var _this = this;
        return this.afDatabase.database.ref('/forms').child(this.SU_name).child(Q_num).once('value').then(function (snapshot) {
            if (snapshot.exists()) {
                _this.answer = snapshot.val();
            }
            else {
                console.log("ending");
                _this.end_of_form = true;
            }
        });
    };
    HomePage.prototype.add_form_answers = function (ques_num, answer) {
        return this.afDatabase.database.ref('/' + this.SU_name + "_applicants").child(this.applicant_id).child("" + this.q_num).update({
            answer: answer
        });
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
                var group = {};
                group["Name"] = group_data["Name"];
                group["Date"] = group_data["Date"];
                group["Time"] = group_data["Time"];
                group["Place"] = group_data["Place"];
                group_key = snapshot1.ref.push(group).key;
                snapshot1.child(group_key).ref.update({ People: group_people });
                _this.Notification_data.data["Study_Token"] = group_key;
                _this.Notification_data.data = JSON.stringify(_this.Notification_data.data);
            }).then(function () {
                tempFriends.forEach(function (tempFriendPrimary) {
                    var group_people = {};
                    tempFriends.forEach(function (tempFriendSecondary) {
                        if (tempFriendPrimary.Token !== tempFriendSecondary.Token) {
                            group_people[tempFriendSecondary.Phone] = "Pending";
                        }
                    });
                    _this.afDatabase.database.ref("users/" + _this.Token).child("Phone").once('value').then(function (snapshot2) {
                        group_people[snapshot2.val()] = "Joining";
                    });
                    _this.afDatabase.database.ref("users/" + tempFriendPrimary.Token).child("Study groups").once('value').then(function (snapshot1) {
                        var group = {};
                        group["Name"] = group_data["Name"];
                        group["Date"] = group_data["Date"];
                        group["Time"] = group_data["Time"];
                        group["Place"] = group_data["Place"];
                        snapshot1.child(group_key).ref.update(group);
                        snapshot1.child(group_key).ref.update({ People: group_people });
                    });
                    _this.sendNotification(tempFriendPrimary.Token);
                    _this.Notification_data = {};
                });
            });
            this.answer = "I invited your selected friends to the study group!😊";
        }
        else {
            this.answer = "Please invite at least 1 of your friends";
        }
    };
    HomePage.prototype.Tutor_Select = function (Tutor) {
        this.Current_Tutor = Tutor;
        this.need_tutor = 2;
    };
    HomePage.prototype.Tutor_Reserve = function (i) {
        var data = { subject: this.Current_Tutor.subject, name: this.Current_Tutor.name, phone: this.Current_Tutor.phone, slot: this.Current_Tutor.lessons[i].slot, cost: this.Current_Tutor.lessons[i].cost };
        this.afDatabase.database.ref('users').child(this.Token).child('lessonsRequests').push(data);
        var dt = new Date(this.Current_Tutor.lessons[i].slot);
        this.calendar.createEventWithOptions(this.Current_Tutor.subject + " class", null, null, dt, dt, { 'firstReminderMinutes': 120 });
        this.need_tutor = 0;
        this.Current_Tutor = '';
        this.Tutors = [];
        this.answer = "I reserved your lesson! 😊";
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
        //retreive old data
        this.afDatabase.database.ref("/users").child(this.Token).once("value").then(function (snapshot) {
            console.log("currentuser");
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
            selector: 'page-home',template:/*ion-inline-start:"D:\FF\ALIS\src\pages\home\home.html"*/'<ion-header no-border>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      <!--<ion-icon class = "Lefticon" ios="ios-information-circle" md="md-information-circle"></ion-icon>\n\n      <ion-icon class ="Righticon" ios="ios-help-circle" md="md-help-circle"></ion-icon>-->\n\n      <img class="logo" src="../assets/imgs/Purple-PNG.png">\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-bounce>\n\n  <ion-list>\n\n    <div *ngIf="answer?.length > 0" no-lines>\n\n      <ion-card *ngIf="Alis_first == false" text-wrap class="grey">\n\n        <ion-item text-wrap class="greytext">{{chat}}</ion-item>\n\n        <ion-label class="greyclock">{{CurrentTime}}</ion-label>\n\n      </ion-card>\n\n\n\n      <!-- <ion-card text-wrap class="purple">\n\n        <ion-item-sliding *ngFor="let tutor of Tutors ;let i = index">\n\n          <ion-item *ngIf="need_tutor == 0" text-wrap class="purpletext"> {{answer}}</ion-item>\n\n          <ion-item *ngIf="need_tutor == 1" text-wrap class="purpletext"> {{tutor}} <img src="{{images[i]}}"></ion-item>\n\n          <ion-item-options side="right">\n\n            <button ion-button (click)="Reserve()">Reserve</button>\n\n          </ion-item-options>\n\n        </ion-item-sliding>\n\n        <ion-label class="purpleclock">{{CurrentTime}}</ion-label>\n\n      </ion-card> -->\n\n      <ion-card text-wrap class="purple">\n\n        <ion-item text-wrap class="purpletext">{{answer}}</ion-item>\n\n\n\n        <ion-list *ngIf="need_tutor == 1">\n\n          <ion-item *ngFor="let Tutor of Tutors; let i = index">\n\n            <ion-thumbnail item-start>\n\n              <img src={{Tutor.image}}>\n\n            </ion-thumbnail>\n\n            <h2>{{Tutor.name}}</h2>\n\n            <p>{{Tutor.phone}}</p>\n\n            <ion-icon name="arrow-dropright" (click)="Tutor_Select(Tutor)" item-end></ion-icon>\n\n          </ion-item>\n\n        </ion-list>\n\n\n\n        <ion-list *ngIf="need_tutor == 2">\n\n          <ion-item *ngFor="let lesson of Current_Tutor.lessons; let i = index">\n\n            <h2>{{lesson.slot}}</h2>\n\n            <p>{{lesson.cost}}</p>\n\n            <ion-icon name="arrow-dropright" (click)="Tutor_Reserve(i)" item-end></ion-icon>\n\n          </ion-item>\n\n        </ion-list>\n\n\n\n        <div *ngIf="tutor_Feedback == true">\n\n          <ion-icon class="rating" [color]="rated==1 ||rated==2 ||rated==3 ||rated==4 ||rated==5? \'rate\' : \'light\'"\n\n            name="star" (click)="rating(1)"></ion-icon>\n\n          <ion-icon class="rating" [color]="rated==2 ||rated==3 ||rated==4 ||rated==5? \'rate\' : \'light\'" name="star"\n\n            (click)="rating(2)"></ion-icon>\n\n          <ion-icon class="rating" [color]="rated==3 ||rated==4 ||rated==5? \'rate\' : \'light\'" name="star" (click)="rating(3)"></ion-icon>\n\n          <ion-icon class="rating" [color]="rated==4 ||rated==5? \'rate\' : \'light\'" name="star" (click)="rating(4)"></ion-icon>\n\n          <ion-icon class="rating" [color]="rated==5? \'rate\' : \'light\'" name="star" (click)="rating(5)"></ion-icon>\n\n        </div>\n\n\n\n        <div *ngIf="date == true">\n\n          <ion-item>\n\n            <ion-datetime displayFormat="M/D/YYYY" min="2018" placeholder="M/D/YYYY" [(ngModel)]="Study_date"></ion-datetime>\n\n          </ion-item>\n\n          <button ion-button clear block (click)="question=Study_date;ask()">Choose Time</button>\n\n        </div>\n\n\n\n        <div *ngIf="time == true">\n\n          <ion-item>\n\n            <ion-datetime displayFormat="h:mm A" placeholder="h:mm A" [(ngModel)]="Study_time"></ion-datetime>\n\n          </ion-item>\n\n          <button ion-button clear block (click)="question=Study_time;ask()">Choose friends</button>\n\n        </div>\n\n\n\n        <ion-list *ngIf="Show_Friends == true">\n\n          <ion-item *ngFor="let Friend of Friends">\n\n            <ion-label>\n\n              <h2>{{Friend.Name}}</h2>\n\n              <p>{{Friend.Phone}}</p>\n\n            </ion-label>\n\n            <ion-checkbox *ngIf="Select_Friends == true" [(ngModel)]="Friend.checked"></ion-checkbox>\n\n          </ion-item>\n\n        </ion-list>\n\n        <button ion-button *ngIf="Select_Friends == true" (click)="Invite()">Invite to study group</button>\n\n\n\n        <ion-card *ngIf="need_universty == 1">\n\n          <ion-slides>\n\n            <ion-slide *ngFor="let slide of universities">\n\n              <ion-toolbar>\n\n                <ion-buttons end>\n\n                  <button ion-button color="primary" (click)="nextSlide()">Next</button>\n\n                </ion-buttons>\n\n              </ion-toolbar>\n\n              <img src="{{slide.image}}" class="slide-image" />\n\n              <h1 class="slide-title">{{slide.universtyName}}</h1>\n\n              <h6><b>Location:</b>{{slide.location}}</h6>\n\n\n\n\n\n              <p *ngIf="slide.description.length <= limit">{{slide.description}}</p>\n\n\n\n              <div *ngIf="truncating && slide.description.length > limit" text-wrap>\n\n                {{slide.description | slice:0:100}}\n\n                <button ion-button small (click)="truncating = false">show more</button>\n\n              </div>\n\n              <div *ngIf="!truncating && slide.description.length > limit" text-wrap>\n\n                {{slide.description}}\n\n                <button ion-button small (click)="truncating = true">show less</button>\n\n              </div>\n\n\n\n            </ion-slide>\n\n          </ion-slides>\n\n        </ion-card>\n\n\n\n\n\n        <ion-label class="purpleclock">{{CurrentTime}}</ion-label>\n\n      </ion-card>\n\n      <div class="options">\n\n        <div class="options" no-lines *ngFor="let option of options;" text-center>\n\n          <button class="optionbutton" ion-button round outline (click)="question=option;ask()">{{option}}</button>\n\n        </div>\n\n      </div>\n\n      <br>\n\n\n\n    </div>\n\n  </ion-list>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <div class="flex-items" padding>\n\n    <ion-input [(ngModel)]="question" class="input_message" placeholder="Type a message..."></ion-input>\n\n    <button class="circularbutton" ion-button icon-only (click)="ask()">\n\n      <ion-icon name="send" class="send"></ion-icon>\n\n    </button>\n\n  </div>\n\n</ion-footer>'/*ion-inline-end:"D:\FF\ALIS\src\pages\home\home.html"*/
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