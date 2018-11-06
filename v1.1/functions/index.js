const https = require('https');
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

        let success = false;

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

        /*axios.get(url, {
            proxy: false,
        })
            .then(response => {
                console.log(response);
                success = true;
            })
            .catch(error => {
                console.log(error.message);
                success = false;
            });
            */

        /* request(url, { json: true }, (err, res, body) => {
            if (err) {
                console.log(err);
                success = false;
                return err;
            }
            console.log('res ==', res);
            success = true;
            console.log('body == ', body);
         });*/

        return new Promise((resolve, reject) => {
            let data = '';
            const request = https.get(url, res => {
                res.on('data', d => {
                    data += d;
                });
                res.on('end', () => {
                    console.log(data);
                    resolve();
                });
            });
            request.on('error', () => {
                console.log('An error occurred whilst fetching the data');
                reject();
            });
        });
    });
