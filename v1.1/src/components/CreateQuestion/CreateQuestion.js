import React, {Component} from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import TextField from "@material-ui/core/TextField/TextField";


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
        const options = this.state.options.map((option, index) => (
            <FormControlLabel
                key={index}
                value={this.state.options[index]}
                control={<Radio/>}
                disabled={this.state.options[index] === ''}
                label={
                    <TextField
                        name={'Option ' + (index + 1)}
                        label={'Option ' + (index + 1)}
                        type='text'
                        margin='normal'
                        value={this.state.options[index]}
                        onChange={this.handleTextChange(index)}
                    />
                }/>
        ));

        return (
            <div style={{marginTop: '56px'}}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Options</FormLabel>
                    <RadioGroup
                        aria-label="Options"
                        name="gender1"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {options}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

export default CreateQuestion;