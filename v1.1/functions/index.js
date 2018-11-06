const $ = require('jquery');
const cheerio = require('cheerio');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getChallengeImage = functions.database.ref('/challenges/{pushId}/title')
    .onUpdate((change, context) => {
        const newChallengeTitle = change.after.val();
        console.log("This is the challenge title from firebase functions", newChallengeTitle);

        console.log("Need to scrape for a new image");
        return Promise.reject();
    });
