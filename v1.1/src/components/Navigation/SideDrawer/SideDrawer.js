import React, {Component} from 'react';
import Drawer from "@material-ui/core/Drawer/Drawer";
import NavigationItems from "../NavigationItems/NavigationItems";

class SideDrawer extends Component {
    render() {
        return (
            <Drawer
                open
            >
                <NavigationItems display='block'/>
            </Drawer>
        );
    }
}

export default SideDrawer;