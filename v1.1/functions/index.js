

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.getChallengeImage = functions.database.ref('/challenges/{pushId}/title')
    .onUpdate((change, context) => {
        const oldChallengeTitle = change.before.val();
        const newChallengeTitle = change.after.val();
        console.log("This is the challenge title from firebase functions", newChallengeTitle);
    });
