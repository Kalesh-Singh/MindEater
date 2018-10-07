// Initiate firebase auth
function initFirebaseAuth() {
    firebase.auth().onAuthStateChanged(authStateObserver);
}

// Triggers when the auth state changes for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (!user) {
        console.log("User signed out.");
        window.location.replace('index.html');
    }
}

// Signs out user.
function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location .assign('index.html'); //After successful sign out, user will be redirected to sign in page.
    }).catch(function (error) {
        // An error happened.
    });
}

// Shortcuts to DOM Elements.
var signOutButton = document.getElementById('sign-out-button');

// Event Listeners
signOutButton.addEventListener('click', signOut);

// Initialize firebase auth
initFirebaseAuth();