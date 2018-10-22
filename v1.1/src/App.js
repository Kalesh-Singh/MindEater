import React, {Component} from 'react';
import Authentication from "./containers/Authentication/Authentication";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";

class App extends Component {
    render() {
        return (
            <>
                <Authentication/>
                <SideDrawer/>
            </>
        );
    }
}

export default App;
