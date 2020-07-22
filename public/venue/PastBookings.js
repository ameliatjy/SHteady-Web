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

function sortAtoZ(type) {
    var table = document.getElementById("bookingstable");
    var rows = table.rows;
    var alltd = table.getElementsByTagName("td")
    var numOfTds = alltd.length;
    var switching = true;
    var shouldSwitch;
    if (type === 'venue') {
        while (switching) {
            switching = false;
            for (var i = 0; i < numOfTds - 6; i += 6) {
                shouldSwitch = false;
                var firstname = alltd[i].innerHTML;
                var nextname = alltd[i + 6].innerHTML;
                if (firstname > nextname) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 6) / 6;
                var nextRow = ((i + 6) + 6) / 6;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        }
    } else {
        while (switching) {
            switching = false;
            for (var i = 5; i < numOfTds - 6; i += 6) {
                shouldSwitch = false;
                var firstname = alltd[i].innerHTML;
                var nextname = alltd[i + 6].innerHTML;
                if (firstname > nextname) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 1) / 6;
                var nextRow = ((i + 6) + 1) / 6;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        }
    }
}

function sortZtoA(type) {
    var table = document.getElementById("bookingstable");
    var rows = table.rows;
    var alltd = table.getElementsByTagName("td")
    var numOfTds = alltd.length;
    var switching = true;
    var shouldSwitch;
    if (type === 'venue') {
        while (switching) {
            switching = false;
            for (var i = 0; i < numOfTds - 6; i += 6) {
                shouldSwitch = false;
                var firstname = alltd[i].innerHTML;
                var nextname = alltd[i + 6].innerHTML;
                if (firstname < nextname) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 6) / 6;
                var nextRow = ((i + 6) + 6) / 6;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        }
    } else {
        while (switching) {
            switching = false;
            for (var i = 5; i < numOfTds - 6; i += 6) {
                shouldSwitch = false;
                var firstname = alltd[i].innerHTML;
                var nextname = alltd[i + 6].innerHTML;
                if (firstname < nextname) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 1) / 6;
                var nextRow = ((i + 6) + 1) / 6;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        }
    }
}

function sortNewestOldest(type) {
    var table = document.getElementById("bookingstable");
    var rows = table.rows;
    var alltd = table.getElementsByTagName("td")
    var numOfTds = alltd.length;
    var switching = true;
    var shouldSwitch;
    while (switching) {
        switching = false;
        if (type === 'start') {
            for (var i = 2; i < numOfTds - 6; i += 6) {
                shouldSwitch = false;
                var firstdate = alltd[i].innerHTML;
                var nextdate = alltd[i + 6].innerHTML;
                if (firstdate > nextdate) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 4) / 6;
                var nextRow = ((i + 6) + 4) / 6;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        } else {
            for (var i = 3; i < numOfTds - 6; i += 6) {
                shouldSwitch = false;
                var firstdate = alltd[i].innerHTML;
                var nextdate = alltd[i + 6].innerHTML;
                if (firstdate > nextdate) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 3) / 6;
                var nextRow = ((i + 6) + 3) / 6;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        }
    }
}

function sortOldestNewest(type) {
    var table = document.getElementById("bookingstable");
    var rows = table.rows;
    var alltd = table.getElementsByTagName("td")
    var numOfTds = alltd.length;
    var switching = true;
    var shouldSwitch;
    while (switching) {
        switching = false;
        if (type === 'start') {
            for (var i = 2; i < numOfTds - 6; i += 6) {
                shouldSwitch = false;
                var firstdate = alltd[i].innerHTML;
                var nextdate = alltd[i + 6].innerHTML;
                if (firstdate < nextdate) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 4) / 6;
                var nextRow = ((i + 6) + 4) / 6;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        } else {
            for (var i = 3; i < numOfTds - 6; i += 6) {
                shouldSwitch = false;
                var firstdate = alltd[i].innerHTML;
                var nextdate = alltd[i + 6].innerHTML;
                if (firstdate < nextdate) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 3) / 6;
                var nextRow = ((i + 6) + 3) / 6;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        }
    }
}