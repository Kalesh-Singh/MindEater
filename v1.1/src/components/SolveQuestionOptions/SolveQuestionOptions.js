import React, {Component} from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import Radio from "@material-ui/core/Radio/Radio";

class SolveQuestionOptions extends Component {

    state = {
        value: null
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    render() {

        // TODO: Expected options array as a prop
        const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

        const optionComponents = options.map((option, index) => (
            <FormControlLabel
                key={index}
                value={option}
                control={<Radio/>}
                label={option}
            />
        ));

        return (
            <FormControl
                component="fieldset"
                style={{width: '100%'}}
            >
                <RadioGroup
                    aria-label="Options"
                    name="Options"
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    {optionComponents}
                </RadioGroup>
            </FormControl>
        );
    }
}

export default SolveQuestionOptions;