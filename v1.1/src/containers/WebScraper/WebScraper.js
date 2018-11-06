import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import $ from "jquery";
import cheerio from "cheerio";

import classes from "./WebScraper.module.css";

class WebScraper extends Component {
    state = {
        title: '',
        imgUrl: ''
    };

    handleChange = event => {
        this.setState({title: event.target.value});
    };

    getImg = () => {
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
                    const challengeImg = images[0].children[1].attribs.src;
                    this.setState({imgUrl: challengeImg});
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