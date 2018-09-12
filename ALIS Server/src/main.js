import http from 'http'
import * as admin from 'firebase-admin'

var serviceAccount = require("./alis-ac07d-firebase-adminsdk-uj1w9-2ae6dcdcb6.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://alis-ac07d.firebaseio.com"
});

http.createServer(function (req, res) {
    setInterval(() => {
        console.log(GetDate_and_Time().Date + "  " + GetDate_and_Time().Time + "  " + GetDate_and_Time().AMPM);
        compareTimeAndNotify();
    }, 60000)
}).listen(8080);

function GetDate_and_Time() {
    var d = new Date(),
        date = [(d.getMonth() + 1), d.getDate(), d.getFullYear()].join("/"),
        time = [(d.getHours() > 12) ? d.getHours() - 12 : (d.getHours() == 0) ? "12" : d.getHours(), d.getMinutes()].join(":"),
        ampm = (d.getHours() < 12) ? "AM" : "PM"
    return { 'Date': date, 'Time': time, 'AMPM': ampm };
}

function sendNotification(token, info) {
    var data = JSON.stringify({ tutorName: info.tutorName, subject: info.subject, phone: info.phone });
    const payload = {
        "notification": {
            "title": info.title,
            "body": info.body,
            "sound": "enabled",
            "click_action": "FCM_PLUGIN_ACTIVITY",
            "icon": "drawable-hdpi-icon"
        },
        "data": {
            "type": info.type,
            "data": data
        }
    }
    return admin.messaging().sendToDevice(token, payload)
        .then(function (response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });
}

function compareTimeAndNotify() {
    admin.database().ref('/users').once('value').then(snapshot1 => {
        snapshot1.forEach(snapshot2 => {
            if (snapshot2.child('lessonsRequests').exists()) {
                snapshot2.child('lessonsRequests').forEach(snapshot3 => {
                    var slot = snapshot3.child('slot').val();
                    var tutorName = snapshot3.child('name').val();
                    var subject = snapshot3.child('subject').val();
                    var phone = snapshot3.child('phone').val();
                    var tokenKey = snapshot2.key;
                    var dateTime = `${GetDate_and_Time().Date}, ${GetDate_and_Time().Time} ${GetDate_and_Time().AMPM}`;
                    if (dateTime == slot) {
                        let data = {
                            title: 'Tutor rating!', body: `What\'s your rating of the ${subject} tutor?`, type: 'rating',
                            tutorName: tutorName, subject: subject, phone: phone
                        }
                        sendNotification(tokenKey, data)
                    }
                });
            }
        })
    });
}