import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
exports.DialogFlow = functions.https.onRequest((request, response) => {
    if (request.body.result.action == "SignUp-Name-Phone") {
        ADD_User_Name(request.body.result.parameters["phone-number"],request.body.result.contexts[0].parameters["Name"]).then().catch();
    }
   // response.send({ speech: request.body.result.fulfillment.speech + "💩" });
   if (request.body.result.action == "Basic_info") {
    ADD_User_Study_Level("010", request.body.result.contexts[0].parameters["study_level"]).then().catch();
   }
   if (request.body.result.action == "school_name") {
    ADD_User_High_School_Name("010", request.body.result.contexts[0].parameters["school_name"]).then().catch();
   }
  
   if (request.body.result.action == "father_job") {
    ADD_Father_Job("010", request.body.result.contexts[0].parameters["father_job"]).then().catch();
   }
   if (request.body.result.action == "mother_job") {
    ADD_Mother_Job("010", request.body.result.contexts[0].parameters["mother_job"]).then().catch();
   }
   if (request.body.result.action == "high_school_degree") {
       console.log(request.body.result.contexts[0].parameters["High_school_degree_name"]);
    ADD_User_High_School_Degree("010", request.body.result.contexts[0].parameters["High_school_degree_name"]).then().catch();
    var degreeName= request.body.result.contexts[0].parameters["High_school_degree_name"];
    if(degreeName=="1"){
        response.send({ speech: "what is your degree for sat1?" + "💩" });
    }
    else if(degreeName=="2"){
        response.send({ speech: "what is your degree for national subjects?" + "💩" });

    }
    else if(degreeName=="3"){
        response.send({ speech: "what is your degree for IG subjects?" + "💩" });
    }
   }
   if (request.body.result.action == "sat1_grade") {
    ADD_User_sat1_grade("010", request.body.result.contexts[0].parameters["sat1_grade"]).then().catch();
   }
   if (request.body.result.action == "sat2_grade") {
    ADD_User_sat2_grade("010", request.body.result.contexts[0].parameters["sat2_grade"]).then().catch();
   }
   if (request.body.result.action == "sat2_grade") {
    ADD_User_sat2_grade("010", request.body.result.contexts[0].parameters["sat2_grade"]).then().catch();
   }
   if (request.body.result.action == "tanya_thanawy_grade") {
    ADD_User_tanya_thanawy_grade("010", request.body.result.contexts[0].parameters["grade11_score"]).then().catch();
   }
   if (request.body.result.action == "talta_thanawy_grade") {
    ADD_User_talta_thanawy_grade("010", request.body.result.contexts[0].parameters["grade12_score"]).then().catch();
   }

});


function ADD_User_Name(Phone: string, Name: string) {
    return admin.database().ref('/users').child(Phone).update({
        Name: Name
    });
};

function ADD_User_sat1_grade(Phone: string, sat1_grade: string) {
    return admin.database().ref('/users').child(Phone).update({
        sat1_grade: sat1_grade
    });
};

function ADD_User_sat2_grade(Phone: string, sat2_grade: string) {
    return admin.database().ref('/users').child(Phone).update({
        sat2_grade: sat2_grade
    });
};

function ADD_User_High_School_Name(Phone: string, High_School_Name: string) {
    return admin.database().ref('/users').child(Phone).update({
        High_School_Name: High_School_Name
    });
};

function ADD_User_tanya_thanawy_grade(Phone: string, tanaya_thanawy: string) {
    return admin.database().ref('/users').child(Phone).update({
        tanaya_thanawy: tanaya_thanawy
    });
};

function ADD_User_talta_thanawy_grade(Phone: string, talta_thanawy: string) {
    return admin.database().ref('/users').child(Phone).update({
        talta_thanawy: talta_thanawy
    });
};

function ADD_User_Hobbies(Phone: string, Hobbies: string) {
    return admin.database().ref('/users').child(Phone).update({
        Hobbies: Hobbies
    });
};
function ADD_Father_Job(Phone: string, Job: string) {
    return admin.database().ref('/users').child(Phone).update({
        Father_job : Job
    });
};
function ADD_Mother_Job(Phone: string, Job: string) {
    return admin.database().ref('/users').child(Phone).update({
        Mother_job : Job
    });
};


function ADD_User_High_School_Degree(Phone: string, High_School_Degree: string) {
    return admin.database().ref('/users').child(Phone).update({
        High_School_Degree: High_School_Degree
    });
};

function ADD_User_University_Name(Phone: string, University_Name_Name: string) {
    return admin.database().ref('/users').child(Phone).update({
        University_Name_Name: University_Name_Name
    });
};

function ADD_User_University_Faculty(Phone: string, University_Faculty: string) {
    return admin.database().ref('/users').child(Phone).update({
        University_Faculty: University_Faculty
    });
};

function ADD_User_University_Department(Phone: string, University_Department: string) {
    return admin.database().ref('/users').child(Phone).update({
        University_Department: University_Department
    });
};

function ADD_User_Study_Level(Phone: string, Study_Level:string){
    return admin.database().ref('/users').child(Phone).update({
        Study_Level: Study_Level
    });
};

function checkPhoneNumber(Phone: string){
    return admin.database().ref('/users').child(Phone).once('value').then((snapshot) => {
        snapshot.exists()
    });
};

function RetrievePhoneNumber(Phone: string){
    return admin.database().ref('/users').child(Phone).once('value').then((snapshot) => {
        return snapshot.val();
    });
};