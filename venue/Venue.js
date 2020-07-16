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
            document.getElementById("bookingform").reset();
        }
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
    firebase.database().ref('venuebooking/' + venue).push({
        cca: cca,
        venue: venue,
        startdate: startdate,
        enddate: enddate,
        starttime: starttime,
        endtime: endtime,
        purpose: purpose,
        //need to add name of cca too
    })
}