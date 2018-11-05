import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";

class WebScraper extends Component {
    state = {
        title: '',
        imgUrl: null
    };

    handleChange = event => {
        this.setState({title: event.target.value});
    };

    render() {
        return (
            <div style={{marginTop: '100px', padding: '16px'}}>
                <h1>Web Scraper</h1>
                <TextField
                    label="Challenge Title"
                    margin="normal"
                    fullWidth
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                {this.state.imgUrl ? <p>{this.state.imgUrl}</p> : null}
            </div>
        );
    }
}

export default WebScraper;