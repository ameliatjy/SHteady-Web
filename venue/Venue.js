firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //ccaname = user.email.split('@')[0]; //to get cca name
        firebase.database().ref("1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/" + user.email.split('@')[0] + "/name").on('value', function(snapshot) {
            document.getElementById("ccaid").innerHTML = snapshot.val();
        })
    }
})

function submitform() {
    if (confirm("Please confirm venue booking details.\nThis action is irreversible.") == true) {
        setData();
        document.getElementById("bookingform").reset();
    }
}

function setData() {
    var cca = document.getElementById("ccaid").innerHTML;
    var venue = document.getElementById("venueselection").value;
    var startdate = document.getElementById("startdate").value; //yyyy-mm-dd
    var enddate = document.getElementById("enddate").value;
    var starttime = document.getElementById("starttime").value; //24hour like 19:05
    var endtime = document.getElementById("endtime").value;
    var purpose = document.getElementById("purpose").value;
    firebase.database().ref('venuebooking').push({
        cca: cca,
        vanue: venue,
        startdate: startdate,
        enddate: enddate,
        starttime: starttime,
        endtime: endtime,
        purpose: purpose,
        //need to add name of cca too
    })
}