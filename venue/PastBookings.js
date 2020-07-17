var currcca = "";
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        currcca = user.email.split('@')[0];
        firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/' + currcca + '/submittedbookings').on('value', function (snapshot) {
            var submittedbookings = snapshot.val() ? snapshot.val() : [];
            loopBookings(submittedbookings);
        })
    }
})

function loopBookings(bookingArray) {
    var numOfBookings = bookingArray.length;
    if (numOfBookings > 0) {
        for (var i = 0; i < numOfBookings; i++) {
            var bookingKey = bookingArray[i].key;
            var venue = bookingArray[i].venue;
            firebase.database().ref('venuebooking/' + venue + '/' + bookingKey).on('value', function (snapshot) {
                setData(snapshot.val());
            })
        }
    }
}

function setData(booking) {
    var venue = booking.venue;
    var bookingDetails = booking.submittedAt;
    var startdate = booking.startdate;
    var enddate = booking.enddate;
    var starttime = booking.starttime;
    var endtime = booking.endtime;
    var purpose = booking.purpose;
    var status = booking.status;
    var content;
    content += '<tr>';
    content += '<td>' + venue + '</td>';
    content += '<td>' + bookingDetails + '</td>';
    content += '<td>' + startdate + ", " + starttime + '</td>';
    content += '<td>' + enddate + ", " + endtime + '</td>';
    content += '<td>' + purpose + '</td>';
    content += '<td>' + status + '</td>';
    content += '</tr>';
    $('table').append(content);
}