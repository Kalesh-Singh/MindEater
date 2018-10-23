import React, {Component} from 'react';
import NavigationBar from "./NavigationBar/NavigationBar";
import SideDrawer from "./SideDrawer/SideDrawer";

class Navigation extends Component {
    state = {
      sideDrawer: false
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ sideDrawer: !state.sideDrawer }));
    };

    render() {
        return (
            <div>
                <NavigationBar
                    toggleDrawer={this.handleDrawerToggle}
                />
                <SideDrawer
                    open={this.state.sideDrawer}
                    toggleDrawer={this.handleDrawerToggle}
                />
            </div>
        );
    }
}

export default Navigation;