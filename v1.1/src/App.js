import React, {Component} from 'react';
import SignIn from "./containers/Authentication/SignIn/SignIn";
import SignUp from "./containers/Authentication/SignUp/SignUp";
import Authentication from "./containers/Authentication/Authentication";

class App extends Component {
    render() {
        return (
            <>
                <Authentication/>
                <SignIn/>
                <SignUp/>
            </>
        );
    }
}

export default App;
