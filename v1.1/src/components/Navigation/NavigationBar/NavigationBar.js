import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import AppBar from "@material-ui/core/AppBar/AppBar";
import MenuIcon from '@material-ui/icons/Menu';
import NavigationItems from "../NavigationItems/NavigationItems";

import classes from './NavigationBar.module.css';

class NavigationBar extends Component {
    handleDrawerToggle;

    render() {
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <div className={classes.MenuIconButton}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.props.toggle}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </div>
                    <NavigationItems display='flex'/>

                </Toolbar>
            </AppBar>
        )
            ;
    }
}

export default NavigationBar;