import React from 'react';
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";

function Options(props) {

    const options = props.options.map((option, index) => (
        <FormControlLabel
            key={index}
            value={props.options[index]}
            control={<Radio/>}
            disabled={props.options[index] === ''}
            label={
                <TextField
                    name={'Option ' + (index + 1)}
                    label={'Option ' + (index + 1)}
                    type='text'
                    margin='normal'
                    value={props.options[index]}
                    onChange={props.textChanged(index)}
                />
            }/>
    ));

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Options</FormLabel>
            <RadioGroup
                aria-label="Options"
                name="Options"
                value={props.value}
                onChange={props.changed}
            >
                {options}
            </RadioGroup>
        </FormControl>
    );
}

export default Options;