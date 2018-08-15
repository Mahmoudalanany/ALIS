"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
/*********************************************************************Firebase Functions********************************************************************************/
exports.DialogFlow = functions.https.onRequest((request, response) => {
    console.log(request.body.result);
    if (request.body.result.action == "SignUp-Name-Phone") {
        ADD_User_Name(request.body.result.parameters["phone-number"], request.body.result.contexts[0].parameters["Name"]).then().catch();
    }
    response.send({ speech: request.body.result.fulfillment.speech + "💩" });
});
/*
 pushNotification = functions.database.ref('/users/011/{pushId}')
    .onCreate((event) => {
        payload = {
            "notification": {
                "title": "New Notification has arrived",
                "body": "Notification Body",
                "sound": "enabled",
                "click_action": "FCM_PLUGIN_ACTIVITY",
                "icon": "drawable-hdpi-icon"
            }
        }
        admin.messaging().sendToDevice("e5cS3d7XSt4:APA91bEm1dt8oIo-g5mW6c1rrxQ38zsfxTZR4tcUClOvo6NXKwgCQweuP4n6_aVQKfTety_LGTbpsEZ_0oK67q2kralwz5x2vez_ZlHL6tibAd5NXGsKFouCqN269GxukAnIKALhiXfzeEuvESKlcu3Fvzxzegjrlw", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    });
*/
/*********************************************************************Utility Functions********************************************************************************/
function ADD_User_Name(Phone, Name) {
    return admin.database().ref('/users').child(Phone).update({
        Name: Name
    });
}
;
function ADD_User_High_School_Name(Phone, High_School_Name) {
    return admin.database().ref('/users').child(Phone).update({
        High_School_Name: High_School_Name
    });
}
;
function ADD_User_High_School_Degree(Phone, High_School_Degree) {
    return admin.database().ref('/users').child(Phone).update({
        High_School_Degree: High_School_Degree
    });
}
;
function ADD_User_University_Name(Phone, University_Name_Name) {
    return admin.database().ref('/users').child(Phone).update({
        University_Name_Name: University_Name_Name
    });
}
;
function ADD_User_University_Faculty(Phone, University_Faculty) {
    return admin.database().ref('/users').child(Phone).update({
        University_Faculty: University_Faculty
    });
}
;
function ADD_User_University_Department(Phone, University_Department) {
    return admin.database().ref('/users').child(Phone).update({
        University_Department: University_Department
    });
}
;
function ADD_User_Study_Level(Phone, Study_Level) {
    return admin.database().ref('/users').child(Phone).update({
        Study_Level: Study_Level
    });
}
;
function checkPhoneNumber(Phone) {
    return admin.database().ref('/users').child(Phone).once('value').then((snapshot) => {
        snapshot.exists();
    });
}
;
function RetrievePhoneNumber(Phone) {
    return admin.database().ref('/users').child(Phone).once('value').then((snapshot) => {
        return snapshot.val();
    });
}
;
//# sourceMappingURL=index.js.map