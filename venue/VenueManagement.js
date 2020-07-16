var data = '';
$('select').on('change', function () {
    document.getElementById("allbookings").style.visibility = "visible";
    var venueselected = this.value;
    var currtable = document.getElementById("bookingstable");
    while(currtable.rows.length > 1) {
        currtable.deleteRow(1);
    }
    firebase.database().ref('venuebooking/' + venueselected).on('value', function (snapshot) {
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
            var cca = bookingdetails[key].cca;
            var startdate = bookingdetails[key].startdate;
            var starttime = bookingdetails[key].starttime;
            var enddate = bookingdetails[key].enddate;
            var endtime = bookingdetails[key].endtime;
            var purpose = bookingdetails[key].purpose;
            var content
            content += '<tr>';
            content += '<td>' + cca + '</td>';
            content += '<td>' + startdate + ", " + starttime + '</td>';
            content += '<td>' + enddate + ", " + endtime + '</td>';
            content += '<td>' + purpose + '</td>';
            content += '</tr>';
            $('table').append(content);
        })
    }
    sortByDate();
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
            window.alert(firstmonth);
        }
    }
}