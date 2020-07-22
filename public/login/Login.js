firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.replace("../members/Members.html")
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
        })
    } else {
        window.alert("you do not have access!");
    }
}

var pw = document.getElementById("password");
pw.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("loginbtn").click();
    }
});
