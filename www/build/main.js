webpackJsonp([0],{

/***/ 179:
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
webpackEmptyAsyncContext.id = 179;

/***/ }),

/***/ 220:
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
webpackEmptyAsyncContext.id = 220;

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_firebase_credentials__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(442);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_functions__ = __webpack_require__(449);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





__WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.initializeApp(__WEBPACK_IMPORTED_MODULE_0__app_firebase_credentials__["a" /* FIREBASE_CONFIG */]);
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, platform, ngZone) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.ngZone = ngZone;
        this.showImage = true;
        this.answers = [];
        this.chats = [];
        this.step = 0;
        this.userPhone = '';
        this.user = {
            Name: '',
            Age: undefined,
            Gender: '',
            Grade: '',
            High_School_Name: '',
            High_School_Degree: ''
        };
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        var minutesupdated = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutesupdated + ' ' + ampm;
        this.CurrentTime = strTime;
        platform.ready().then(function () {
            ApiAIPromises.init({
                clientAccessToken: "e1fa9f39f9b344088ebb4636c307da50"
            }).then(function (result) { return console.log(result); });
        }).catch(function (e) { console.log(e); });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log("I'm alive!");
    };
    HomePage.prototype.ask = function (question) {
        var _this = this;
        this.answers.pop();
        if (this.step < 99) {
            this.SignUp(question);
        }
        else {
            console.log("Signed up completely");
            ApiAIPromises.requestText({
                query: question
            })
                .then(function (_a) {
                var speech = _a.result.fulfillment.speech;
                console.log(JSON.parse(speech));
                //console.log(JSON.parse(speech).data[0]["name"]);
                _this.ngZone.run(function () {
                    _this.answers.push(speech);
                });
            }).catch(function (e) {
                console.log(e);
            });
        }
        this.GreyText = question;
        this.chats.pop();
        this.chats.push(question);
    };
    HomePage.prototype.SignUp = function (reply) {
        var _this = this;
        console.log("The current step is " + this.step);
        if (this.step == 0) {
            this.answers.push("Welcome to Alis , Please Enter your number");
            this.step = 1;
        }
        else if (this.step == 1) {
            //check phone 
            this.userPhone = reply;
            if (this.userPhone) {
                //1)check valid number
                //2)check in database
                __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.functions().httpsCallable('checkPhoneNumber')(this.userPhone).then(function (result) {
                    if (result.data) {
                        console.log("exists");
                        __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.functions().httpsCallable('RetrievePhoneNumber')(_this.userPhone).then(function (result) {
                            //feh number we name bas mafish ay hagah b2yaa
                            console.log(result.data);
                            if (result.data.Name == undefined) {
                                _this.step = 2;
                                _this.answers.push("What is your Name ?");
                                return;
                            }
                            else {
                                _this.user.Name = result.data.Name;
                            }
                            if (result.data.Age == undefined) {
                                _this.step = 3;
                                _this.answers.push("How Old Are You , " + _this.user.Name + " ?");
                            }
                            else if (result.data.Gender == undefined) {
                                _this.step = 4;
                                _this.answers.push("Male or Female , " + _this.user.Name + " ?");
                            }
                            else if (result.data.Grade == undefined) {
                                _this.step = 5;
                                _this.answers.push("What is your School Grade , " + _this.user.Name + " ?");
                            }
                            else if (result.data.High_School_Name == undefined) {
                                _this.step = 6;
                                _this.answers.push("Which school do you attend , " + _this.user.Name + " ?");
                            }
                            else if (result.data.High_School_Degree == undefined) {
                                _this.step = 7;
                                _this.answers.push("IG , SAT or National , " + _this.user.Name + " ?");
                            }
                            else {
                                _this.step = 1000;
                                _this.answers.push("Welcome " + _this.user.Name + ", How can I help you ?");
                            }
                        });
                    }
                    else {
                        console.log("Doesn't exist");
                        _this.step = 2;
                        _this.answers.push("What is your Name ?");
                    }
                });
            }
        }
        else if (this.step == 2) {
            this.user.Name = reply;
            //insert database *Phone as Key, Name as value*
            __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.functions().httpsCallable('ADD_User_Name')({ Phone: this.userPhone, data: this.user.Name });
            this.step = 3;
            this.answers.push("How Old Are You , " + this.user.Name + " ?");
        }
        else if (this.step == 3) {
            this.user.Age = parseInt(reply);
            //insert database
            __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.functions().httpsCallable('ADD_User_Age')({ Phone: this.userPhone, data: this.user.Age });
            this.step = 4;
            this.answers.push("Male or Female , " + this.user.Name + " ?");
        }
        else if (this.step == 4) {
            this.user.Gender = reply;
            //insert database
            __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.functions().httpsCallable('ADD_User_Gender')({ Phone: this.userPhone, data: this.user.Gender });
            this.step = 5;
            this.answers.push("What is your School Grade , " + this.user.Name + " ?");
        }
        else if (this.step == 5) {
            this.user.Grade = reply;
            //insert database
            __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.functions().httpsCallable('ADD_User_Grade')({ Phone: this.userPhone, data: this.user.Grade });
            this.step = 6;
            this.answers.push("Which school do you attend , " + this.user.Name + " ?");
        }
        else if (this.step == 6) {
            this.user.High_School_Name = reply;
            //insert database
            __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.functions().httpsCallable('ADD_User_High_School_Name')({ Phone: this.userPhone, data: this.user.High_School_Name });
            this.step = 7;
            this.answers.push("IG , SAT or National , " + this.user.Name + " ?");
        }
        else if (this.step == 7) {
            this.user.High_School_Degree = reply;
            //insert database
            __WEBPACK_IMPORTED_MODULE_3_firebase_app___default.a.functions().httpsCallable('ADD_User_High_School_Degree')({ Phone: this.userPhone, data: this.user.High_School_Degree });
            this.step = 1000;
            this.answers.push("Welcome " + this.user.Name + ", How can I help you ?");
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Content */])
    ], HomePage.prototype, "content", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\FF\ALIS\src\pages\home\home.html"*/'<ion-header no-border>\n  <ion-navbar color="red">      \n    <ion-title >\n      <!--<ion-icon class = "Lefticon" ios="ios-information-circle" md="md-information-circle"></ion-icon>\n      <ion-icon class ="Righticon" ios="ios-help-circle" md="md-help-circle"></ion-icon>-->\n      <img class ="logo" src="../assets/imgs/Purple-PNG.png" > \n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content no-bounce>\n\n  <ion-list>\n\n    <div *ngFor="let chat of chats" no-lines>\n\n      <ion-card text-wrap class = "grey">\n        <ion-item text-wrap class = "greytext">{{GreyText}}</ion-item>\n        <ion-label class = "greyclock">{{CurrentTime}}</ion-label>     \n      </ion-card>\n\n      <!--<ion-card text-wrap class = "purple" >\n        <ion-item text-wrap class = "purpletext" > \n          <h1 style="color:#fff">\n            <typing [message]="\'.....\'" [referenceSpeed]="700" [typo]="false">He;</typing>\n          </h1>\n        </ion-item>    \n      </ion-card> -->\n\n      <ion-card text-wrap class = "purple">\n        <ion-item text-wrap class = "purpletext" *ngFor = "let answer of answers"> {{answer}}</ion-item>\n        <ion-label class = "purpleclock">{{CurrentTime}}</ion-label>    \n      </ion-card> \n\n    </div>\n\n  </ion-list>\n\n</ion-content>\n\n<ion-footer>\n  <div class="flex-items" padding>\n    <ion-input [(ngModel)]="question" name="question" class="input_message" placeholder="Type A Message">\n      <button type="submit" class="button" ng-click="ask(question)"></button>\n    </ion-input>\n    <ion-icon (click)="ask(question)" class="send" name="send"></ion-icon>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"D:\FF\ALIS\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgZone */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(389);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_typing__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__ = __webpack_require__(265);
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5_ng_typing__["a" /* TypingModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_fcm__["a" /* FCM */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_fcm__ = __webpack_require__(265);
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
    function MyApp(platform, statusBar, splashScreen, fcm) {
        this.fcm = fcm;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            //Notifications
            fcm.subscribeToTopic('all');
            fcm.getToken().then(function (token) {
                console.log(token);
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
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\FF\ALIS\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"D:\FF\ALIS\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_fcm__["a" /* FCM */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 441:
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

/***/ })

},[266]);
//# sourceMappingURL=main.js.map