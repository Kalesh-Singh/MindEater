import React, {Component} from 'react';
import Options from "./Options/Options";


class CreateQuestion extends Component {

    state = {
        value: 'no options entered',
        options: ['', '', '', ''],
        correctOption: null
    };

    handleChange = event => {
        this.setState({value: event.target.value, correctOption: event.target.value});
    };

    handleTextChange = index => event => {
        const updatedOptions = [...this.state.options];
        updatedOptions[index] = event.target.value.trim();
        this.setState({options: updatedOptions});
    };

    render() {
        console.log(this.state);
        return (
            <div style={{marginTop: '56px', display: 'flex', flexFlow: 'column', alignItems: 'center'}}>
                <Options
                    options={this.state.options}
                    textChanged={this.handleTextChange}
                    value={this.state.value}
                    changed={this.handleChange}
                />
            </div>
        );
    }
}

export default CreateQuestion;