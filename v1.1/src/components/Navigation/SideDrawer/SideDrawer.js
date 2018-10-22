import React from 'react';
import NavigationItems from "../NavigationItems/NavigationItems";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer/SwipeableDrawer";

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

            <NavigationItems
                display='block'
                toggleDrawer={props.toggleDrawer}
            />
        </SwipeableDrawer>
    );
}

export default SideDrawer;