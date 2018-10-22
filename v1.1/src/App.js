import React, {Component} from 'react';
import Authentication from "./containers/Authentication/Authentication";
import Navigation from "./components/Navigation/Navigation";


class App extends Component {
    render() {
        return (
            <>
                <Authentication/>
                <Navigation/>
            </>
        );
    }
}

export default App;
