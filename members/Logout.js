function logout() {
    firebase.auth().signOut().then(function() {
        window.location.href = "../login/Homepage.html";
    }).catch(function(error) {

    });
}