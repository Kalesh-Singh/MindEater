// FirebaseUI config.

var uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: 'dashboard.html', // url-to-redirect-to-on-success
    signInOptions: [
        // Providers we offer users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: 'terms-of-service.html',     // url to terms of service
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
        window.location.assign('privacy-policy.html');  // url to privacy policy
    }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);