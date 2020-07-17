var data = '';
$('select').on('change', function () {
    document.getElementById("allbookings").style.visibility = "visible";
    var venueselected = this.value;
    firebase.database().ref('venuebooking/' + venueselected).on('value', function (snapshot) {
        var currtable = document.getElementById("bookingstable");
        while (currtable.rows.length > 1) {
            currtable.deleteRow(1);
        }
        let data = snapshot.val() ? snapshot.val() : {}
        var bookingdetails = { ...data }
        displaydata(bookingdetails);
    })
})

function displaydata(bookingdetails) {
    let keys = Object.keys(bookingdetails)
    var index = 0;
    if (keys.length > 0) {
        keys.map((key) => {
            index += 1;
            //window.alert(key);
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
                $('table').append(content);
            }
        })
    }
    sortByDate();
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

function sortByDate() {
    var shouldSwitch;
    var table = document.getElementById("bookingstable");
    var switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            var firstmonth = rows[i].getElementsByTagName("TD")[0].toString();
            //window.alert(firstmonth);
        }
    }
}