import http from 'http'
import * as admin from 'firebase-admin'

let serviceAccount = require("./alis-ac07d-firebase-adminsdk-uj1w9-2ae6dcdcb6.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://alis-ac07d.firebaseio.com"
});

http.createServer(function (req, res) {
    let serverDate_and_Time = GetDate_and_Time();
    setInterval(() => {
        let Current_serverDate_and_Time = GetDate_and_Time()
        console.log(Current_serverDate_and_Time.Date + "  " + Current_serverDate_and_Time.Time + "  " + Current_serverDate_and_Time.AMPM);
        if (Current_serverDate_and_Time.Time.split(":")["1"] != serverDate_and_Time.Time.split(":")["1"]) {
            serverDate_and_Time = Current_serverDate_and_Time
            let dateTime = `${serverDate_and_Time.Date}, ${serverDate_and_Time.Time} ${serverDate_and_Time.AMPM}`;
            compareTimeAndNotify(dateTime);
        }
    }, 1000)
}).listen(8080);

function GetDate_and_Time() {
    let d = new Date(),
        date = [(d.getMonth() + 1), d.getDate(), d.getFullYear()].join("/"),
        time = [(d.getHours() > 12) ? d.getHours() - 12 : (d.getHours() == 0) ? "12" : d.getHours(), (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes()].join(":"),
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

function compareTimeAndNotify(dateTime) {
    admin.database().ref('/users').once('value').then(snapshot1 => {
        snapshot1.forEach(snapshot2 => {
            if (snapshot2.child('lessonsRequests').exists()) {
                let tokenKey = snapshot2.key;
                snapshot2.child('lessonsRequests').forEach(snapshot3_slot => {
                    if (dateTime == snapshot3_slot.child('slot').val()) {
                        let tutor_rated = false
                        snapshot2.forEach(snapshot3_phone => {
                            if (snapshot3_phone.child(snapshot3_slot.child('phone').val()).exists()) {
                                tutor_rated = true
                                return
                            }
                        })
                        if (tutor_rated == false) {
                            let info = {
                                title: 'Tutor rating!',
                                body: `What's your rating for ${snapshot3_slot.child('name').val()}?`,
                                type: 'rating',
                                tutorName: snapshot3_slot.child('name').val(),
                                subject: snapshot3_slot.child('subject').val(),
                                phone: snapshot3_slot.child('phone').val()
                            }
                            sendNotification(tokenKey, info)
                        }
                    }
                });
            }
        })
    });
}