function getDate(millisec) {
    return new Date(millisec).toLocaleString()
}

document.getElementById('reportTable').innerHTML=''

var report = firebase.database().ref('report/')
report.on('value', function(snapshot) {

    let reportValue = snapshot.val() ? snapshot.val() : {}
    let keys = Object.keys(reportValue)

    keys.map((key) => (
        document.getElementById('reportTable').innerHTML+=`
        <tr>
            <td>${reportValue[key].location}</td>
            <td>${reportValue[key].problem}</td>
            <td>${reportValue[key].otherDetails}</td>
            <td>${reportValue[key].reportSubmittedBy}</td>
            <td>${this.getDate(reportValue[key].timeSubmitted)}</td>
            <td>${reportValue[key].status}</td>                
            <td>${this.getDate(reportValue[key].lastUpdatedTime)}</td>
        </tr> 
    `
    ))
})

