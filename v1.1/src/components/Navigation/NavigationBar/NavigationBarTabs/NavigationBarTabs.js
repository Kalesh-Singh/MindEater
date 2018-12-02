import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";

import classes from './NavigationBarTabs.module.css';
import fire from "../../../../fire";


class NavigationBarTabs extends Component {
    state = {
        value: 0,
        username: "Guest",
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(this.updateUsername);
        const user = fire.auth().currentUser;
        if (user) {
            this.updateUsername(user);
        }
    }

    updateUsername = (user) => {
        if (user) {
            fire.database().ref('/users/' + user.uid + '/username')
                .once('value')
                .then(snapshot => {
                    console.log("USER Snapshot", snapshot);
                    if (snapshot.val()) {
                        console.log("USER Snapshot Val", snapshot.val());
                        this.setState({username: snapshot.val()});
                    }
                }).catch(error => {
                alert(error.message)
            });
            this.setListener(user);
        }
    };

    setListener = (user) => {
        fire.database().ref('/users/' + user.uid)
            .on('child_added', snapshot => {
                this.setState(state => {
                    return {username: state.username}
                })
            });
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
                        label={"Account"}
                        value={3}
                        component={Link}
                        to='/profile'
                    />
                </Tabs>
        );
    }
}

export default NavigationBarTabs;