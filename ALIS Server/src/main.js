import http from 'http'
import * as admin from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.cert("./alis-ac07d-firebase-adminsdk-uj1w9-2ae6dcdcb6.json"),
    databaseURL: "https://alis-ac07d.firebaseio.com"
});

http.createServer(function (req, res) {
    let serverDate_and_Time = GetDate_and_Time();
    setInterval(() => {
        let Current_serverDate_and_Time = GetDate_and_Time()
        console.log(Current_serverDate_and_Time.Date + "  " + Current_serverDate_and_Time.Time + "  " + Current_serverDate_and_Time.AMPM);
        if (Current_serverDate_and_Time.Time.split(":")["1"] != serverDate_and_Time.Time.split(":")["1"]) {
            serverDate_and_Time = Current_serverDate_and_Time
            let date = `${serverDate_and_Time.Date}`;
            let time = `${serverDate_and_Time.Time} ${serverDate_and_Time.AMPM}`;
            Tutor_Feedback(date, time);
            Study_Group_Reminder(date, time);
            Student_Activity_Reminder(date, time)
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
            "data": info.data
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

function Tutor_Feedback(date, time) {
    admin.database().ref('/users').once('value').then(snapshot1 => {
        snapshot1.forEach(snapshot2 => {
            if (snapshot2.child('lessonsRequests').exists()) {
                snapshot2.child('lessonsRequests').forEach(snapshot3_lesson => {
                    if (date == snapshot3_lesson.child('slot/date').val() && time == snapshot3_lesson.child('slot/end_time').val()) {
                        if (!snapshot2.child(`Ratings/${snapshot3_lesson.child('phone').val()}`).exists()) {
                            snapshot2.child(`Ratings/${snapshot3_lesson.child('phone').val()}`).ref.set(0)
                            let info = {
                                title: 'Tutor rating!',
                                body: `What's your rating for ${snapshot3_lesson.child('name').val()}?`,
                                type: 'Rating',
                                data: JSON.stringify({
                                    tutorName: snapshot3_lesson.child('name').val(),
                                    subject: snapshot3_lesson.child('subject').val(),
                                    phone: snapshot3_lesson.child('phone').val()
                                })
                            }
                            sendNotification(snapshot2.key, info)
                        }
                    }
                    else if (`${date}, ${time}` == snapshot3_lesson.child('slot/reminder').val()) {
                        let info = {
                            title: 'Lesson reminder!',
                            body: `You have ${snapshot3_lesson.child('subject').val()} lesson with ${snapshot3_lesson.child('name').val()} on ${snapshot3_lesson.child('slot/date').val()} at ${snapshot3_lesson.child('slot/start_time').val()} in ${snapshot3_lesson.child('place').val()}`,
                            type: 'Welcome',
                            data: JSON.stringify({})
                        }
                        sendNotification(tokenKey, info)
                    }
                });
            }
        })
    });
}

function Study_Group_Reminder(date, time) {
    admin.database().ref('/users').once('value').then(snapshot1 => {
        snapshot1.forEach(snapshot2 => {
            if (snapshot2.child('Study groups').exists()) {
                snapshot2.child('Study groups').forEach(snapshot3_study => {
                    if (`${date}, ${time}` == snapshot3_study.child('Reminder').val()) {
                        let info = {
                            title: 'Study group reminder!',
                            body: `You have a study group on ${snapshot3_study.child('Date').val()} at ${snapshot3_study.child('Time').val()} in ${snapshot3_study.child('Place').val()}`,
                            type: 'Study_group_Reply',
                            data: JSON.stringify({
                                Date: `${snapshot3_study.child('Date').val()}`,
                                Time: `${snapshot3_study.child('Time').val()}`,
                                Place: `${snapshot3_study.child('Place').val()}`,
                                Study_Token: snapshot3_study.key
                            })
                        }
                        sendNotification(snapshot2.key, info)
                    }
                });
            }
        })
    });
}

function Student_Activity_Reminder(date, time) {
    admin.database().ref("IEEE/applicants").once('value').then(snapshot1 => {
        snapshot1.forEach(snapshot2 => {
            if (snapshot2.child("slot/Reminder").exists()) {
                if (`${date}, ${time}` == snapshot2.child("slot/Reminder").val()) {
                    let info = {
                        title: 'Student activity reminder!',
                        body: `You have an interview with IEEE on ${snapshot2.child("slot/Date").val()} at ${snapshot2.child("slot/Start_time").val()} in ${snapshot2.child("slot/Place").val()}`,
                        type: 'Welcome',
                        data: JSON.stringify({})
                    }
                    sendNotification(snapshot2.key, info)
                }
            }
        })
    })
}