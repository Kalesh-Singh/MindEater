import React, {Component} from 'react';
import Authentication from "./containers/Authentication/Authentication";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";
import NavigationBar from "./components/Navigation/NavigationBar/NavigationBar";

class App extends Component {
    render() {
        return (
            <>
                <Authentication/>
                <NavigationBar/>
                <SideDrawer/>
            </>
        );
    }
}

export default App;
