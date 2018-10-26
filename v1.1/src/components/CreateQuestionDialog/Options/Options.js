import React from 'react';
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

import classes from './Options.module.css';


function Options(props) {
    console.log('Radio Group Value', props.value);
    const options = props.options.value.map((option, index) => (
            <FormControlLabel
                key={index}
                value={props.options.value[index].value}
                control={<Radio/>}
                disabled={props.options.value[index].value === ''}
                label={
                    <TextField
                        name={'Option ' + (index + 1)}
                        label={'Option ' + (index + 1)}
                        type='text'
                        margin='normal'
                        value={props.options.value[index].value}
                        error={props.options.value[index].error.length > 0}
                        helperText={props.options.value[index].error}
                        onChange={props.optionChanged(index)}
                        onFocus={props.optionFocused(index)}
                        fullWidth
                    />
                }
            />
    ));

    return (
        <FormControl
            component="fieldset"
            error={props.options.error.length > 0}
            style={{width: '100%'}}
        >
            <FormLabel component="legend">Options</FormLabel>
            <RadioGroup
                aria-label="Options"
                name="Options"
                value={props.value}
                onChange={props.changed}
            >
                {options}
            </RadioGroup>
            {(props.options.error.length > 0) ? <FormHelperText>{props.options.error}</FormHelperText> : null}

        </FormControl>
    );
}

export default Options;