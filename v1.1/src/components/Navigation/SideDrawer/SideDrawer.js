import React from 'react';
import NavigationItems from "../NavigationItems/NavigationItems";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";
import SideDrawerButtons from "../NavigationItems/SideDrawerButtons/SideDrawerButtons";

function SideDrawer(props) {
    return (
        <SwipeableDrawer
            variant="temporary"
            open={props.open}
            onClose={props.toggleDrawer}
            onOpen={props.toggleDrawer}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >
            <SideDrawerButtons toggleDrawer={props.toggleDrawer}/>
        </SwipeableDrawer>
    );
}

export default SideDrawer;