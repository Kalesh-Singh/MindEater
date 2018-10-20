import React, {Component} from 'react';
import SignIn from "./containers/Authentication/SignIn/SignIn";
import SignUp from "./containers/Authentication/SignUp/SignUp";

class App extends Component {
    render() {
        return (
            <>
                <SignIn/>
                <SignUp/>
            </>
        );
    }
}

export default App;
