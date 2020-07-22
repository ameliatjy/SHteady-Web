function changePassword() {
    var pw = document.getElementById("pw").value;
    var cfmpw = document.getElementById("cfmpw").value;
    //window.alert(pw, cfmpw)
    if (pw.length <= 0) {
        window.alert("Password cannot be empty.");
    } else if (cfmpw.length <= 0) {
        window.alert("Please retype your password for confirmation.");
    } else if (pw.length < 6) {
        window.alert("Password cannot be less than 6 characters.");
    } else if (pw !== cfmpw) {
        window.alert("Passwords mismatch.");
    } else {
        firebase.auth().currentUser.updatePassword(cfmpw).then(function() {
        }).catch(function(error) {
        })
        window.alert("Password successfully updated!");
        document.getElementById("pageform").reset();
    }
}