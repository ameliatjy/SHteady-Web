firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "../members/Members.html"
    } else {

    }
});

function login() {
    var userEmail = document.getElementById("username").value + '@u.nus.edu';
    var userPass = document.getElementById("password").value;

    if (userEmail.startsWith("cca")) {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
        });
    } else {
        window.alert("you do not have access!");
    }
}