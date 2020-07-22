function submitform() {
    let allAreFilled = true;
    document.getElementById("bookingform").querySelectorAll("[required]").forEach(function (i) {
        if (!allAreFilled) return;
        if (!i.value) allAreFilled = false;
    })
    if (!allAreFilled) {
        alert('Please fill in all fields!');
    } else {
        if (confirm("Please confirm venue booking details.\nThis action is irreversible.") == true) {
            setData();
        }
    }
}

function setData() {
    var currtime = new Date();
    var submittedAt = currtime.toDateString() + ", " + currtime.toTimeString().split(' ')[0];
    var cca = document.getElementById("ccaid").innerHTML;
    var venue = document.getElementById("venueselection").value;
    var startdate = document.getElementById("startdate").value; //yyyy-mm-dd
    var enddate = document.getElementById("enddate").value;
    var starttime = document.getElementById("starttime").value; //24hour like 19:05
    var endtime = document.getElementById("endtime").value;
    var purpose = document.getElementById("purpose").value;
    var newbooking = firebase.database().ref('venuebooking/' + venue).push();
    if (startdate < enddate || (startdate == enddate && starttime < endtime)) {
        newbooking.set({ // to display all bookings
            submittedAt: submittedAt,
            status: "PENDING",
            cca: cca,
            venue: venue,
            startdate: startdate,
            enddate: enddate,
            starttime: starttime,
            endtime: endtime,
            purpose: purpose,
            //need to add name of cca too
        })
        var newKey = newbooking.getKey();
        var currcca = firebase.auth().currentUser.email.split('@')[0];
        var currbookings = [];
        var count = 0;
        firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/' + currcca + '/submittedbookings/').on('value', function (snapshot) {
            currbookings = snapshot.val() ? snapshot.val() : [];
        })
        count = currbookings.length
        firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/' + currcca + '/submittedbookings/' + count).set({
            venue: venue,
            key: newKey,
        });
        document.getElementById("bookingform").reset();
    } else {
        alert('Invalid time or date fields!');
    }
}