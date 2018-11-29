import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";

import classes from './NavigationBarTabs.module.css';


class NavigationBarTabs extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value: value});
    };

    render() {
        const value = this.state.value;
        return (
                <Tabs fullWidth
                      className={classes.DesktopOnly}
                      onChange={this.handleChange}
                      value={value}
                      style={{textAlign:"center", color:"white"}}
                >
                    <Tab
                        label='Dashboard'
                        value={0}
                        component={Link}
                        to='/dashboard'
                    />
                    <Tab
                        label='My Challenges'
                        value={1}
                        component={Link}
                        to='/my-challenges'
                    />

                    <Tab
                        label='Solve Challenges'
                        value={2}
                        component={Link}
                        to='/solve-challenges'
                    />

                    <Tab
                        label='Profile'
                        value={3}
                        component={Link}
                        to='/profile'
                    />
                </Tabs>
        );
    }
}

export default NavigationBarTabs;