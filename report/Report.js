$(document).ready(function () {
    $('#reportDetails').DataTable();
    $('.dataTables_length').addClass('bs-select');
});

function getDate(millisec) {
    var date = new Date(millisec).toLocaleString()
    return date.substring(0,date.length-3)
}

$('select').on('change', function () {
    var status = this.value;

    readTable(status)
})

function readTable(status) {
    // document.getElementById('reportTable').innerHTML=''

    // var report 
    // if (status == "ALL") {
    //     report = firebase.database().ref('report/')
    // } else {
    //     report = firebase.database().ref('report/').orderByChild('status').equalTo(status)
    // }
    
    // report.on('value', function(snapshot) {

    //     let reportValue = snapshot.val() ? snapshot.val() : {}
    //     let keys = Object.keys(reportValue)

    //     keys.map((key) => (
    //         document.getElementById('reportTable').innerHTML+=`
    //         <tr>
    //             <td>${reportValue[key].location}</td>
    //             <td>${reportValue[key].problem}</td>
    //             <td>${reportValue[key].otherDetails}</td>
    //             <td>${reportValue[key].reportSubmittedBy}</td>
    //             <td>${this.getDate(reportValue[key].timeSubmitted)}</td>
    //             <td>${reportValue[key].status}</td>                
    //             <td>${this.getDate(reportValue[key].lastUpdatedTime)}</td>
    //         </tr> 
    //     `
    //     ))
    // })
    
    var descending = ''

    var report 
    if (status == "ALL") {
        report = firebase.database().ref('report/')
    } else {
        report = firebase.database().ref('report/').orderByChild('status').equalTo(status)
    }
    
    report.on('value', function(snapshot) {

        let reportValue = snapshot.val() ? snapshot.val() : {}
        let keys = Object.keys(reportValue)

        keys.map((key) => {
            descending = `
            <tr>
                <td>${reportValue[key].location}</td>
                <td>${reportValue[key].problem}</td>
                <td>${reportValue[key].otherDetails == "" ? "-" : reportValue[key].otherDetails}</td>
                <td>
                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="${reportValue[key].name}">
                    ${reportValue[key].reportSubmittedBy}
                    </a>
                </td>
                <td>${this.getDate(reportValue[key].timeSubmitted)}</td>
                <td>${reportValue[key].status}</td>                
                <td>${this.getDate(reportValue[key].lastUpdatedTime)}</td>
            </tr> 
            ` + descending
            document.getElementById('reportTable').innerHTML=descending
        })
    })

}

function initial() {
    readTable("ALL")
}

function getInfo(matric) {
    var name
    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).once('value', function(snapshot) {
        name = snapshot.val().name
    })
    return name

    // document.getElementById("editModalBody").innerHTML=`
    //     <div class="modal-header">
    //         <h5 class="modal-title" id="reportModalLabel">Update Member Details</h5>
    //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //             <span aria-hidden="true">&times;</span>
    //         </button>
    //     </div>
    //     <div class="modal-body">
    //         <div class="form-group">
    //             <h5 style="font-weight: 300;">Name:</h5>
    //         </div>
    //         <div class="form-group">
    //             <h5 style="font-weight: 300;">Matric: </h5>
    //         </div>
    //     </div>
    //     <div class="modal-footer">
    //         <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
    //         <button type="button" class="btn btn-success" data-dismiss="modal">Update</button>
    //     </div>
    // `

    // // firebase.database().ref('report/')
}
