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

/***/ 240:
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
webpackEmptyAsyncContext.id = 240;

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_calendar__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_Sharing_Service_SharingService_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_angularfire2_database__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_contacts__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_apiai__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_apiai___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_apiai__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, platform, ngZone, afDatabase, Share, contacts, network, calendar, alertCtrl) {
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
        this.showImage = []; //array indicating there is a message or no
        this.DisplayImage = []; //array containing the images
        this.Tutors = [];
        this.items = [];
        this.need_tutor = 0;
        this.Token = '';
        this.SU_ques = [];
        this.filling_form = false;
        this.q_num = 1;
        this.end_of_form = false;
        this.Friends = [];
        // console.log(this.GetDate_and_Time());
        if (!navigator.onLine) {
            this.offline_alert = this.alertCtrl.create({
                title: "You're offline",
                subTitle: "Alis can't reach you without internet connection",
                enableBackdropDismiss: false
            });
            this.offline_alert.present();
        }
        platform.ready().then(function () {
            _this.API_Agent = __WEBPACK_IMPORTED_MODULE_7_apiai__("7327b7cfa4a144a0b3924da4f9b375b9");
            _this.Token = _this.Share.getToken();
            console.log("Initializing...");
            //sign in by token
            _this.Update_Time();
            _this.afDatabase.database.ref('/users').once('value').then(function (snapshot1) {
                if (snapshot1.child(_this.Token).exists()) {
                    _this.API_Agent.eventRequest({ name: "Welcome", data: { 'Name': snapshot1.child(_this.Token).child('First_name').val() } }, { sessionId: '0123456789' })
                        .once('response', function (_a) {
                        var speech = _a.result.fulfillment.speech;
                        speech = speech + "😊";
                        _this.answer = speech;
                    }).once('error', function (error) {
                        console.log(error);
                    }).end();
                }
                else {
                    _this.API_Agent.eventRequest({ name: "Welcome" }, { sessionId: '0123456789' })
                        .once('response', function (_a) {
                        var speech = _a.result.fulfillment.speech;
                        speech = speech + "😊";
                        _this.answer = speech;
                    }).once('error', function (error) {
                        console.log(error);
                    }).end();
                }
            });
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
        var d = new Date(), date = [(d.getMonth() + 1), d.getDate(), d.getFullYear()].join("/"), time = [(d.getHours() > 12) ? d.getHours() - 12 : (d.getHours() == 0) ? "12" : d.getHours(), d.getMinutes()].join(":"), ampm = (d.getHours() < 12) ? "AM" : "PM";
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
                            if (snapshot2.child('Phone').val() == numbers[index].Phone && numbers[index].Found == false) {
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
        if (this.question == null) {
            return;
        }
        this.items = ["hi", " hello", "try again", "exit", "close"];
        this.need_tutor = 0;
        this.Friends = [];
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
            this.API_Agent.textRequest(this.question, { sessionId: '0123456789' })
                .once('response', function (_a) {
                var result = _a.result;
                if (result.action == "SignIn.SignIn-custom") {
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
                                    _this.API_Agent.eventRequest({ name: "Welcome", data: { 'Name': snapshot2.child('First_name').val() } }, { sessionId: '0123456789' })
                                        .once('response', function (_a) {
                                        var speech = _a.result.fulfillment.speech;
                                        speech = speech + "😊";
                                        _this.answer = speech;
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
                else if (result.action == "SignUp-Name-Phone" && result.actionIncomplete == false) {
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
                                var data = { First_name: result.contexts[0].parameters["First-name"], Last_name: result.contexts[0].parameters["Last-name"], Phone: result.parameters["phone-number"] };
                                _this.addData('/users', _this.Token, null, data).then().catch();
                                _this.answer = result.fulfillment.speech;
                            }
                        }
                    });
                }
                else if (result.action == "Synchronize_Friends") {
                    _this.SyncFriends();
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == "Show_Friends") {
                    _this.answer = result.fulfillment.speech;
                    _this.afDatabase.database.ref("users/" + _this.Token + "/Friends").once('value').then(function (snapshot1) {
                        if (snapshot1.exists()) {
                            snapshot1.forEach(function (snapshot2) {
                                _this.afDatabase.database.ref('users').once('value').then(function (snapshot2_1) {
                                    snapshot2_1.forEach(function (snapshot2_2) {
                                        if (snapshot2_2.child('Phone').val() == snapshot2.val()) {
                                            var Friend = {
                                                Name: snapshot2_2.child('First_name').val() + " " + snapshot2_2.child('Last_name').val(),
                                                Phone: snapshot2.val(),
                                                checked: false
                                            };
                                            _this.Friends.push(Friend);
                                        }
                                    });
                                });
                            });
                        }
                    });
                }
                else if (result.action == "needTutor") {
                    _this.afDatabase.database.ref('/teachers').child(result.parameters.tutorSubject)
                        .once('value').then(function (snapshot1) {
                        snapshot1.forEach(function (snapshot2) {
                            var tutor = {
                                subject: result.parameters.tutorSubject,
                                name: snapshot2.child('name').val(),
                                cost: snapshot2.child('cost').val(),
                                image: snapshot2.child('image').val(),
                                lessons: snapshot2.child('lessons').val()
                            };
                            _this.Tutors.push(tutor);
                        });
                        _this.need_tutor = 1;
                    });
                }
                else if (result.action == "study_level") {
                    if (result.parameters.study_level !== '') {
                        var data = { studyLevel: result.parameters.study_level };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    console.log(result);
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'get_hobbies') {
                    if (result.parameters.hobbies.length > 0) {
                        var data = { hobbies: result.parameters.hobbies };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                    console.log(result);
                }
                else if (result.action == 'father_job') {
                    if (result.parameters.father_job !== '') {
                        var data = { fatherJob: result.parameters.fatherJob };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'mother_job') {
                    if (result.parameters.mother_job !== '') {
                        var data = { motherJob: result.parameters.motherJob };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'school_name') {
                    if (result.parameters.school_name !== '') {
                        var data = { schoolName: result.parameters.school_name };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getNational') {
                    if (result.parameters.highSchoolDegree !== '') {
                        var data = { highSchoolDegree: result.parameters.highSchoolDegree };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getSat') {
                    if (result.parameters.highSchoolDegree !== '') {
                        var data = { highSchoolDegree: result.parameters.highSchoolDegree };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIG') {
                    if (result.parameters.highSchoolDegree !== '') {
                        var data = { highSchoolDegree: result.parameters.highSchoolDegree };
                        _this.addData('/users', _this.Token, null, data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getTanyaThanawyGrade') {
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
                else if (result.action == 'getTaltaThanawyGrade') {
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
                else if (result.action == 'getSat1') {
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
                else if (result.action == 'getSat2') {
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
                else if (result.action == 'getIGArabicGrade') {
                    if (result.parameters.arabicIG_Grade !== '') {
                        var data = { arabicGrade: result.parameters.arabicIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGEnglishGrade') {
                    console.log(result);
                    if (result.parameters.englishIG_Grade !== '') {
                        var data = { englishGrade: result.parameters.englishIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGMathGrade') {
                    if (result.parameters.mathIG_Grade !== '') {
                        var data = { mathGrade: result.parameters.mathIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGChemistryGrade') {
                    if (result.parameters.chemistryIG_Grade !== '') {
                        var data = { chemistryGrade: result.parameters.chemistryIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGPhysicsGrade') {
                    if (result.parameters.physicsIG_Grade !== '') {
                        var data = { chemistryGrade: result.parameters.physicsIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getIGBiologyGrade') {
                    if (result.parameters.biologyIG_Grade !== '') {
                        var data = { chemistryGrade: result.parameters.biologyIG_Grade };
                        _this.addData('/users', _this.Token, 'IG_Grades', data).then().catch();
                    }
                    _this.answer = result.fulfillment.speech;
                }
                else if (result.action == 'getRatingNum') {
                    var rate = result.parameters.rate;
                    _this.afDatabase.database.ref('users').child('lessonsRequests');
                    if (rate <= 5 && rate >= 1) {
                        var tutorRating = { tutorName: 'DummyValue', rating: rate };
                        var data = { tutorRating: tutorRating };
                        _this.afDatabase.database.ref('users').child(_this.Token).child('Rates').push(data);
                        _this.answer = result.fulfillment.speech;
                    }
                    else {
                        _this.answer = 'Please insert a valid rating';
                    }
                }
                else if (result.action == "Student_activity_name") {
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
                else {
                    console.log(result.fulfillment.speech);
                    _this.answer = result.fulfillment.speech;
                }
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
        console.log(x);
        this.rated = x;
    };
    // Invite(){
    //   for (let index = 0; index < this.Friends.length; index++) {
    //     console.log(this.Friends[index]);
    //   }
    // }
    HomePage.prototype.Tutor_Select = function (Tutor) {
        this.Current_Tutor = Tutor;
        this.need_tutor = 2;
    };
    HomePage.prototype.Tutor_Reserve = function (i) {
        var data = { subject: this.Current_Tutor.subject, name: this.Current_Tutor.name, slot: this.Current_Tutor.lessons[i].slot, cost: this.Current_Tutor.lessons[i].cost };
        this.afDatabase.database.ref('users').child(this.Token).child('lessonsRequests').push(data);
        var dt = new Date(this.Current_Tutor.lessons[i].slot);
        this.calendar.createEventWithOptions(this.Current_Tutor.subject + " class", null, null, dt, dt, { 'firstReminderMinutes': 120 });
        this.need_tutor = 0;
        this.Current_Tutor = '';
        this.Tutors = [];
        this.answer = "I reserved you lesson! 😊";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* Content */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* Content */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* Content */]) === "function" && _a || Object)
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\FF\ALIS\src\pages\home\home.html"*/'<ion-header no-border>\n\n  <ion-navbar color="red">\n\n    <ion-title>\n\n      <!--<ion-icon class = "Lefticon" ios="ios-information-circle" md="md-information-circle"></ion-icon>\n\n      <ion-icon class ="Righticon" ios="ios-help-circle" md="md-help-circle"></ion-icon>-->\n\n      <img class="logo" src="../assets/imgs/Purple-PNG.png">\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content no-bounce>\n\n  <ion-list>\n\n    <div *ngIf="answer?.length > 0" no-lines>\n\n      <!-- <ion-card text-wrap class="purple">\n\n        <ion-item-sliding *ngFor="let tutor of Tutors ;let i = index">\n\n          <ion-item *ngIf="need_tutor===0" text-wrap class="purpletext"> {{answer}}</ion-item>\n\n          <ion-item *ngIf="need_tutor===1" text-wrap class="purpletext"> {{tutor}} <img src="{{images[i]}}"></ion-item>\n\n          <ion-item-options side="right">\n\n            <button ion-button (click)="Reserve()">Reserve</button>\n\n          </ion-item-options>\n\n        </ion-item-sliding>\n\n        <ion-label class="purpleclock">{{CurrentTime}}</ion-label>\n\n      </ion-card> -->\n\n      <ion-card text-wrap class="purple">\n\n        <ion-item text-wrap class="purpletext">{{answer}}</ion-item>\n\n        <ion-list *ngIf="need_tutor===1">\n\n          <ion-item *ngFor="let Tutor of Tutors; let i = index">\n\n            <ion-thumbnail item-start>\n\n              <img src={{Tutor.image}}>\n\n            </ion-thumbnail>\n\n            <h2>{{Tutor.name}}</h2>\n\n            <ion-icon name="arrow-dropright" (click)="Tutor_Select(Tutor)" item-end></ion-icon>\n\n          </ion-item>\n\n        </ion-list>\n\n\n\n        <ion-list *ngIf="need_tutor===2">\n\n          <ion-item *ngFor="let lesson of Current_Tutor.lessons; let i = index">\n\n            <h2>{{lesson.slot}}</h2>\n\n            <p>{{lesson.cost}}</p>\n\n            <ion-icon name="arrow-dropright" (click)="Tutor_Reserve(i)" item-end></ion-icon>\n\n          </ion-item>\n\n        </ion-list>\n\n        <ion-label class="purpleclock">{{CurrentTime}}</ion-label>\n\n      </ion-card>\n\n\n\n      <ion-card text-wrap class="grey">\n\n        <ion-item text-wrap class="greytext">{{chat}}</ion-item>\n\n        <ion-label class="greyclock">{{CurrentTime}}</ion-label>\n\n      </ion-card>\n\n    </div>\n\n    <div class="options" no-lines *ngFor="let item of items;">\n\n      <button ion-button round (click)="question=item;ask()">{{item}}</button>\n\n    </div>\n\n  </ion-list>\n\n\n\n\n\n  <!-- <ion-icon class="rating" [color]="rated==1 ||rated==2 ||rated==3 ||rated==4 ||rated==5? \'rate\' : \'light\'" name="star"\n\n    (click)="rating(1)"></ion-icon>\n\n  <ion-icon class="rating" [color]="rated==2 ||rated==3 ||rated==4 ||rated==5? \'rate\' : \'light\'" name="star" (click)="rating(2)"></ion-icon>\n\n  <ion-icon class="rating" [color]="rated==3 ||rated==4 ||rated==5? \'rate\' : \'light\'" name="star" (click)="rating(3)"></ion-icon>\n\n  <ion-icon class="rating" [color]="rated==4 ||rated==5? \'rate\' : \'light\'" name="star" (click)="rating(4)"></ion-icon>\n\n  <ion-icon class="rating" [color]="rated==5? \'rate\' : \'light\'" name="star" (click)="rating(5)"></ion-icon> -->\n\n\n\n\n\n  <!-- <ion-list>\n\n    <ion-item *ngFor="let Friend of Friends">\n\n      <ion-label>\n\n        <h2>{{Friend.Name}}</h2>\n\n        <ion-note>{{Friend.Phone}}</ion-note>\n\n      </ion-label>\n\n      <ion-checkbox [(ngModel)]="Friend.checked"></ion-checkbox>\n\n    </ion-item>\n\n  </ion-list>\n\n  <p *ngFor="let Friend of Friends">{{Friend.checked}}</p>\n\n  <button ion-button (click)="Invite()">Invite</button> -->\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <div class="flex-items" padding>\n\n    <ion-input [(ngModel)]="question" name="question" class="input_message" placeholder="Type A Message">\n\n      <button type="submit" class="button" ng-click="ask()"></button>\n\n    </ion-input>\n\n    <ion-icon (click)="ask()" class="send" name="send"></ion-icon>\n\n  </div>\n\n</ion-footer>'/*ion-inline-end:"D:\FF\ALIS\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* Platform */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_core__["M" /* NgZone */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__node_modules_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__node_modules_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__services_Sharing_Service_SharingService_service__["a" /* SharingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_Sharing_Service_SharingService_service__["a" /* SharingService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_contacts__["a" /* Contacts */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_contacts__["a" /* Contacts */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__ionic_native_calendar__["a" /* Calendar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__ionic_native_calendar__["a" /* Calendar */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */]) === "function" && _k || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(430);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firebase_credentials__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng_typing__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_fcm__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_contacts__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_Sharing_Service_SharingService_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_calendar__ = __webpack_require__(283);
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
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["b" /* AngularFireDatabaseModule */]
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

/***/ 438:
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

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_Sharing_Service_SharingService_service__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(282);
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
        fcm.onNotification().subscribe(function (data) {
            if (data.wasTapped) {
                console.log("Received in background");
            }
            else {
                console.log("Received in foreground");
            }
            ;
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
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_fcm__["a" /* FCM */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_fcm__["a" /* FCM */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__services_Sharing_Service_SharingService_service__["a" /* SharingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_Sharing_Service_SharingService_service__["a" /* SharingService */]) === "function" && _e || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 504:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 506:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[308]);
//# sourceMappingURL=main.js.map