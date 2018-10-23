import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import AppBar from "@material-ui/core/AppBar/AppBar";
import MenuIcon from '@material-ui/icons/Menu';

import classes from './NavigationBar.module.css';
import NavigationBarTabs from "./NavigationBarTabs/NavigationBarTabs";
import UserMenu from "../UserMenu/UserMenu";


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
                        <UserMenu/>
                    </div>
                </Toolbar>
            </AppBar>
        )
            ;
    }
}

export default NavigationBar;