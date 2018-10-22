import React from 'react';
import Drawer from "@material-ui/core/Drawer/Drawer";
import NavigationItems from "../NavigationItems/NavigationItems";

function SideDrawer(props) {
    return (
        <Drawer
            variant="temporary"
            open={props.open}
            onClose={props.toggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >
            <NavigationItems display='block'/>
        </Drawer>
    );
}

export default SideDrawer;