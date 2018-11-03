import React, {Component} from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import Radio from "@material-ui/core/Radio/Radio";

class SolveQuestionOptions extends Component {

    // Expected props
    // 1. options               (Array)
    // 2. selectedOption        (string)
    // 3. optionChanged    (func)

    render() {
        const optionComponents = this.props.options.map((option, index) => (
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
                    value={this.props.selectedOption}
                    onChange={this.props.optionChanged}
                >
                    {optionComponents}
                </RadioGroup>
            </FormControl>
        );
    }
}

export default SolveQuestionOptions;