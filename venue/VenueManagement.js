var data = '';
$('select').on('change', function () {
    document.getElementById("allbookings").style.visibility = "visible";
    var venueselected = this.value;
    firebase.database().ref('venuebooking/' + venueselected).on('value', function (snapshot) {
        var currtable = document.getElementById("bookingstable");
        while (currtable.rows.length > 1) {
            currtable.deleteRow(1);
        }
        var approvedtable = document.getElementById("approvedbookings");
        while (approvedtable.rows.length > 1) {
            approvedtable.deleteRow(1);
        }
        let data = snapshot.val() ? snapshot.val() : {}
        var bookingdetails = { ...data }
        displaydata(bookingdetails);
        approvedbookings(bookingdetails);
    })
})

function displaydata(bookingdetails) {
    let keys = Object.keys(bookingdetails)
    var index = 0;
    if (keys.length > 0) {
        keys.map((key) => {
            index += 1;
            var cca = bookingdetails[key].cca;
            var submittedAt = bookingdetails[key].submittedAt;
            var startdate = bookingdetails[key].startdate;
            var starttime = bookingdetails[key].starttime;
            var enddate = bookingdetails[key].enddate;
            var endtime = bookingdetails[key].endtime;
            var purpose = bookingdetails[key].purpose;
            var status = bookingdetails[key].status;
            if (status === 'PENDING') {
                var content
                content += '<tr>';
                content += '<td>' + cca + '</td>';
                content += '<td>' + submittedAt + '</td>';
                content += '<td>' + startdate + ", " + starttime + '</td>';
                content += '<td>' + enddate + ", " + endtime + '</td>';
                content += '<td>' + purpose + '</td>';
                content += '<td><input type="button" class="acceptbtn" value="Accept" onclick="acceptrequest(\'' + key + '\')"></input><input type="button" class="rejectbtn" value="Reject" onclick="rejectrequest(\'' + key + '\')"></input></td>';
                content += '</tr>';
                $('#bookingstable').append(content);
            }
        })
    }
}

function acceptrequest(key) {
    if (confirm("Please confirm acceptance of venue booking request.") == true) {
        var currvenue = $('select').val();
        firebase.database().ref('venuebooking/' + currvenue + '/' + key + '/status').set('APPROVED');
    }
}

function rejectrequest(key) {
    if (confirm("Please confirm rejection of venue booking request.") == true) {
        var currvenue = $('select').val();
        firebase.database().ref('venuebooking/' + currvenue + '/' + key + '/status').set('REJECTED');
    }
}

function approvedbookings(bookingdetails) {
    let keys = Object.keys(bookingdetails)
    var index = 0;
    if (keys.length > 0) {
        keys.map((key) => {
            index += 1;
            var cca = bookingdetails[key].cca;
            var startdate = bookingdetails[key].startdate;
            var starttime = bookingdetails[key].starttime;
            var enddate = bookingdetails[key].enddate;
            var endtime = bookingdetails[key].endtime;
            var purpose = bookingdetails[key].purpose;
            var status = bookingdetails[key].status;
            if (status === 'APPROVED') {
                var content
                content += '<tr>';
                content += '<td>' + cca + '</td>';
                content += '<td id="startdate">' + startdate + ", " + starttime + '</td>';
                content += '<td>' + enddate + ", " + endtime + '</td>';
                content += '<td>' + purpose + '</td>';
                content += '</tr>';
                $('#approvedbookings').append(content);
            }
        })
    }
}

function sortNewestOldest(type) {
    var table = document.getElementById("approvedbookings");
    var rows = table.rows;
    var alltd = table.getElementsByTagName("td")
    var numOfTds = alltd.length;
    var switching = true;
    var shouldSwitch;
    while (switching) {
        switching = false;
        if (type === 'start') {
            for (var i = 1; i < numOfTds - 4; i += 4) {
                shouldSwitch = false;
                var firstdate = alltd[i].innerHTML;
                var nextdate = alltd[i + 4].innerHTML;
                if (firstdate > nextdate) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 3) / 4;
                var nextRow = ((i + 4) + 3) / 4;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        } else {
            for (var i = 2; i < numOfTds - 4; i += 4) {
                shouldSwitch = false;
                var firstdate = alltd[i].innerHTML;
                var nextdate = alltd[i + 4].innerHTML;
                if (firstdate > nextdate) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 2) / 4;
                var nextRow = ((i + 4) + 2) / 4;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        }
    }
}

function sortOldestNewest(type) {
    var table = document.getElementById("approvedbookings");
    var rows = table.rows;
    var alltd = table.getElementsByTagName("td")
    var numOfTds = alltd.length;
    var switching = true;
    var shouldSwitch;
    while (switching) {
        switching = false;
        if (type === 'start') {
            for (var i = 1; i < numOfTds - 4; i += 4) {
                shouldSwitch = false;
                var firstdate = alltd[i].innerHTML;
                var nextdate = alltd[i + 4].innerHTML;
                if (firstdate < nextdate) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 3) / 4;
                var nextRow = ((i + 4) + 3) / 4;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        } else {
            for (var i = 2; i < numOfTds - 4; i += 4) {
                shouldSwitch = false;
                var firstdate = alltd[i].innerHTML;
                var nextdate = alltd[i + 4].innerHTML;
                if (firstdate < nextdate) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                var currRow = (i + 2) / 4;
                var nextRow = ((i + 4) + 2) / 4;
                rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
                switching = true;
            }
        }
    }
}

function sortAtoZ() {
    var table = document.getElementById("approvedbookings");
    var rows = table.rows;
    var alltd = table.getElementsByTagName("td")
    var numOfTds = alltd.length;
    var switching = true;
    var shouldSwitch;
    while (switching) {
        switching = false;
        for (var i = 0; i < numOfTds - 4; i += 4) {
            shouldSwitch = false;
            var firstname = alltd[i].innerHTML;
            var nextname = alltd[i + 4].innerHTML;
            if (firstname > nextname) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            var currRow = (i / 4) + 1;
            var nextRow = ((i + 4) / 4) + 1;
            rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
            switching = true;
        }
    }
}

function sortZtoA() {
    var table = document.getElementById("approvedbookings");
    var rows = table.rows;
    var alltd = table.getElementsByTagName("td")
    var numOfTds = alltd.length;
    var switching = true;
    var shouldSwitch;
    while (switching) {
        switching = false;
        for (var i = 0; i < numOfTds - 4; i += 4) {
            shouldSwitch = false;
            var firstname = alltd[i].innerHTML;
            var nextname = alltd[i + 4].innerHTML;
            if (firstname < nextname) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            var currRow = (i / 4) + 1;
            var nextRow = ((i + 4) / 4) + 1;
            rows[currRow].parentNode.insertBefore(rows[nextRow], rows[currRow]);
            switching = true;
        }
    }
}