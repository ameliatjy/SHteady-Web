function logout() {
    firebase.auth().signOut().then(function() {
        window.location.replace("../login/Homepage.html");
    }).catch(function(error) {

    });
}