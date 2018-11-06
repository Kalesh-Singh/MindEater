const axios = require('axios');
const cheerio = require('cheerio');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getChallengeImage = functions.database.ref('/challenges/{pushId}/title')
    .onUpdate((change, context) => {
        const challengeTitle = change.after.val();
        console.log("This is the challenge title from firebase functions", challengeTitle);

        console.log("Need to scrape for a new image");

        const searchTerm = challengeTitle.split(' ').join('+');
        const imgUrl = 'https://www.shutterstock.com/search?search_source=base_landing_page&language=en&searchterm='
            + searchTerm + '&image_type=all';

        const url = "https://allorigins.me/get?url="
            + encodeURIComponent(imgUrl)
            + "&callback=?";

        let promise = null;

        /*$.getJSON(url, response => {
                const html = response.contents;
                const $ = cheerio.load(html);
                const images = $(".img-wrap");
                if (images[0]) {
                    const challengeImg = images[0].children[1].attribs.src;
                    console.log("Image URL", challengeImg);
                } else {
                    // TODO: Set the state to the default challenge image.
                }
            }
        )
            .success(() => {
                console.log("Success!");
                promise = Promise.resolve()
            })
            .error(() => {
                console.log("Something went wrong");
                promise = Promise.reject("Something went wrong")
            });*/

       /* $.ajax({
            url,
            dataType: 'json',
            success: (response) => {
                console.log('response', response);
                const html = response.contents;
                const $ = cheerio.load(html);
                const images = $(".img-wrap");
                if (images[0]) {
                    const challengeImg = images[0].children[1].attribs.src;
                    console.log("Image URL", challengeImg);
                } else {
                    // TODO: Set the state to the default challenge image.
                }
                promise = Promise.resolve();
            }
        });*/

        return promise;
    });
