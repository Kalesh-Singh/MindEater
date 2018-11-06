import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import $ from "jquery";
import cheerio from "cheerio";
import fire from "../../fire.js"

import classes from "./WebScraper.module.css";


class WebScraper extends Component {
    state = {
        title: '',
        imgUrl: ''
    };

    handleChange = event => {
        this.setState({title: event.target.value});
    };

    getBlob = (url) => {
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

    imgURLForChallenge = (oldURL, challengeId) => {
        const picRef = fire.storage().ref(/challenges/ + challengeId);

        this.getBlob(oldURL)
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

    getImage = () => {
        const searchTerm = this.state.title.split(' ').join('+');
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
                    this.imgURLForChallenge(challengeImgUrl, '123456');
                } else {
                    // TODO: Set the state to the default challenge image.
                }
            }
        );

    };

    render() {
        return (
            <div style={{marginTop: '80px', padding: '16px'}}>
                <h1>Web Scraper</h1>
                <TextField
                    label="Challenge Title"
                    margin="normal"
                    fullWidth
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <Button
                    color="inherit"
                    onClick={this.getImg}
                    disabled={this.state.title === ''}
                    fullWidth
                >
                    Get Image
                </Button>
                <figure className={classes.Figure}>
                    <img src={this.state.imgUrl} width="100%"/>
                </figure>
            </div>
        );
    }
}

export default WebScraper;