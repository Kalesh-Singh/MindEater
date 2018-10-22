import React from 'react';
import Drawer from "@material-ui/core/Drawer/Drawer";
import NavigationItems from "../NavigationItems/NavigationItems";

function SideDrawer(props) {
    return (
        <Drawer
            variant="temporary"
            open={props.open}
            onClose={props.toggleDrawer}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >

            <NavigationItems
                display='block'
                toggleDrawer={props.toggleDrawer}
            />
        </Drawer>
    );
}

export default SideDrawer;