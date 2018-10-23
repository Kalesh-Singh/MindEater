import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import AppBar from "@material-ui/core/AppBar/AppBar";
import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';

import classes from './NavigationBar.module.css';
import NavigationBarTabs from "./NavigationBarTabs/NavigationBarTabs";


class NavigationBar extends Component {
    render() {
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <div className={classes.Container}>
                        <div className={classes.MenuIconButton}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.props.toggleDrawer}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </div>
                        <NavigationBarTabs/>
                        <IconButton
                            style={{position: 'absolute', right: '18px'}}
                            color="inherit"
                            aria-label="Open Account Properties"
                        >
                            <AccountIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        )
            ;
    }
}

export default NavigationBar;