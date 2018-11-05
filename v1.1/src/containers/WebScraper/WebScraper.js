import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

class WebScraper extends Component {
    state = {
        title: '',
        imgUrl: null
    };

    handleChange = event => {
        this.setState({title: event.target.value});
    };

    getImg = () => {

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
                <Button
                    color="inherit"
                    onClick={this.getImg}
                    disabled={this.state.title === ''}
                >
                    Get Image
                </Button>
            </div>
        );
    }
}

export default WebScraper;