import fire from "./fire";
import $ from "jquery";
import cheerio from "cheerio";
import DefaultChallengImg from './assets/svg/default-challenge-image.jpg';

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
    const picRef = fire.storage().ref(/challenges/ + challengeId + '/img.webp');
     return getBlob(oldURL)
        .then(blob => {
            return picRef.put(blob)
        })
        .then(() => {
            return picRef.getDownloadURL();
        })
        .then(url => {
            const updates = {};
            updates['/challengeImages/' + challengeId + '/imgURL'] = url;
            return fire.database().ref().update(updates);
        })
        .catch(error => {
            alert(error.message);
        })
};

const putDefaultImg = (challengeId) => {
    const picRef = fire.storage().ref(/challenges/ + challengeId + '/img.webp');
    picRef.put(DefaultChallengImg)
        .then(() => {
            return picRef.getDownloadURL();
        })
        .then(url => {
            const updates = {};
            updates['/challengeImages/' + challengeId + '/imgURL'] = url;
            return fire.database().ref().update(updates);
        })
        .catch(error => {
            alert(error.message);
        })

};
const saveChallengeImageURL = (challengeId, challengeTitle) => {
    // Returns a Promise when we we have finished updating
    // the challenge imgURL in the the Firebase RTDB.

    const searchTerm = challengeTitle.split(' ').join('+');
    const imgUrl = 'https://www.shutterstock.com/search?search_source=base_landing_page&language=en&searchterm='
        + searchTerm + '&image_type=all';
    const url = "https://api.allorigins.ml/get?url="
        + encodeURIComponent(imgUrl)
        + "&callback=?";
    return $.getJSON(url, response => {
            const html = response.contents;
            const $ = cheerio.load(html);
            const images = $(".img-wrap");
            if (images[0]) {
                const challengeImgUrl = images[0].children[1].attribs.src;
                return imgURLForChallenge(challengeImgUrl, challengeId);
            } else {
                return putDefaultImg(challengeId);
            }
        }
    );
};
export default saveChallengeImageURL;