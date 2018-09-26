firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

    } else {
        // No user is signed in.
    }
});


function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location .assign('index.html'); //After successful sign out, user will be redirected to sign in page.
    }).catch(function (error) {
        // An error happened.
    });
}