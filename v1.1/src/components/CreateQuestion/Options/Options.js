import React, {Component} from 'react';
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControl from "@material-ui/core/FormControl/FormControl";

class Options extends Component {
    render() {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Options</FormLabel>
                <RadioGroup
                    aria-label="Options"
                    name="gender1"
                    value={this.props.value}
                    onChange={this.props.changed}
                >
                    {options}
                </RadioGroup>
            </FormControl>
        );
    }
}

export default Options;