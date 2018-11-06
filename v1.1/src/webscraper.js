import fire from "./fire";
import $ from "jquery";
import cheerio from "cheerio";

const getBlob = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = event => {
            const blob = xhr.response;
            resolve(blob);
        };
        xhr.onerror = reject;
        xhr.open('GET', url);
        xhr.send();
    });
};

const imgURLForChallenge = (oldURL, challengeId) => {
    const picRef = fire.storage().ref(/challenges/ + challengeId + '/img');

    getBlob(oldURL)
        .then(blob => {
            return picRef.put(blob)
        })
        .then(() => {
            return picRef.getDownloadURL();
        })
        .then(url => {
            const updates = {};
            updates['/challenges/' + challengeId + '/imgURL'] = url;
            return fire.database().ref().update(updates);

        })
        .then(() => {
            console.log('Successfully updated challenge image url');
        })
        .catch(error => {
            alert(error.message);
        })
};

const getChallengeImage = (challengeTitle, challengeId) => {
    const searchTerm = challengeTitle.split(' ').join('+');
    const imgUrl = 'https://www.shutterstock.com/search?search_source=base_landing_page&language=en&searchterm='
        + searchTerm + '&image_type=all';

    const url = "https://allorigins.me/get?url="
        + encodeURIComponent(imgUrl)
        + "&callback=?";

    $.getJSON(url, response => {
            const html = response.contents;
            const $ = cheerio.load(html);
            const images = $(".img-wrap");
            if (images[0]) {
                const challengeImgUrl = images[0].children[1].attribs.src;
                imgURLForChallenge(challengeImgUrl, challengeId);
            } else {
                // TODO: Set the state to the default challenge image.
            }
        }
    );

};

export default getChallengeImage;