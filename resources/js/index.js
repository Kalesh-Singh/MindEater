// Initiate firebase auth
function initFirebaseAuth() {
    firebase.auth().onAuthStateChanged(authStateObserver);
}

// Signs in a user from MindEater's Custom Sign In
function signIn() {
    console.log("signIn called.");
    let userAuthData = getSignInData();
    firebase.auth().signInWithEmailAndPassword(userAuthData.email, userAuthData.password).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        window.alert(errorCode + " : " + errorMessage);
        // ...
    });
}

// Signs up a user from MindEater's Custom Sign Up
function signUp() {
    console.log("signUp called.");
    let userAuthData = getSignUpData();

    if (verifyPasswordsMatch(userAuthData.password, userAuthData.repeatedPassword)) {
        firebase.auth().createUserWithEmailAndPassword(userAuthData.email, userAuthData.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        console.log("User Sign Up Successful!");
    } else {
        window.alert("Error: Passwords do not match!");
    }
}

// Gets the inputted sign in data
function getSignInData() {
    console.log("getSignInData called.");
    return {email: signInEmail.value, password: signInPassword.value};
}

// Gets the inputted sign up data
function getSignUpData() {
    console.log("getSignUpData called.");
    return { email: signUpEmail.value,
        password: signUpPassword.value,
        repeatedPassword: signUpPasswordRepeat.value,
        username: signUpUsername.value }
}

// Verifies that the sign-up passwords match
function verifyPasswordsMatch(password, repeatedPassword) {
    return password === repeatedPassword;
}

// Triggers when the auth state changes for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (user) {
        console.log("User singed in.");
        window.location.replace('dashboard.html');
    }
}

// Shortcuts to DOM Elements.
var signInEmail = document.getElementById('sign-in-email');
var signInPassword = document.getElementById('sign-in-password');
var signInButton = document.getElementById('sign-in-button');
var signUpEmail = document.getElementById('sign-up-email');
var signUpPassword = document.getElementById('sign-up-password');
var signUpPasswordRepeat = document.getElementById('sign-up-password-repeat');
var signUpUsername = document.getElementById('sign-up-username');
var signUpButton = document.getElementById('sign-up-button');

// Event Listeners
signInButton.addEventListener('click', signIn);
signUpButton.addEventListener('click', signUp);

// Initialize firebase
initFirebaseAuth();