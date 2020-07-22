var ccaname

function initial() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            ccaname = user.email.split('@')[0]
            document.getElementById('displayMembers').innerHTML=''
            readMembers()
        }
    })
}

function readMembers() {
    var index = 0
    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/' + ccaname + '/members/').on('child_added', function(snapshot){

        var data = snapshot.val() 
        index += 1

            document.getElementById('displayMembers').innerHTML+=`
            <tr>
                <td>${index}</td>
                <td>${data.name}</td>
                <td>${data.position}</td>
                <td>${data.matric}</td>
                <td>${data.contact}</td>
                <td>
                    <a class="edit" title="Edit" data-toggle="modal" data-target="#editModal" onclick="edit(${data.memberId}, '${data.name}', '${data.matric}', '${data.contact}')"><i class="material-icons">&#xE254;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip" onclick="deleteMember(${data.memberId}, '${data.matric}')"><i class="material-icons">&#xE872;</i></a>
                </td>            
            </tr> 
            `

        })
    }

function addnew() {

    $(".add-new").prop("disabled", true);

    var index = $("table tbody tr:last-child").index();
    var nextIndex = index + 2;

    document.getElementById('displayMembers').innerHTML+=`
            <tr id="addingNew">
                <td>${nextIndex}</td>
                <td class="namefield"></td>
                <td>
                    <select>
                        <option value="Chairperson">Chairperson</option>
                        <option value="Vice-Chairperson">Vice-Chairperson</option>
                        <option value="SecTres">SecTres</option>
                        <option value="Secretary">Secretary</option>
                        <option value="Treasurer">Treasurer</option>
                        <option value="Main Committee">Main Committee</option>
                        <option value="Sub Committee">Sub Committee</option>
                    </select>
                </td>
                <td class="matricfield"><input type="text" class="form-control" name="Matric Number" id="Matric Number"></td>
                <td class="contactfield"><input type="text" class="form-control" name="Contact" id="Contact"></td>
                <td>
                    <a class="add" title="Add" data-toggle="tooltip" onclick="confirmnew()"><i class="material-icons">&#xE03B;</i></a>
                    <a class="edit" title="Edit" data-toggle="tooltip" onclick="edit()"><i class="material-icons">&#xE254;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip" onclick="undo()"><i class="material-icons">&#xE872;</i></a>
                </td>            
            </tr> 
            `
    $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
    $('[data-toggle="tooltip"]').tooltip();
}

function confirmnew() {
    var empty = false;

    var matric = $('#addingNew').find(".matricfield input").val(); // gets the value
    var matricfield = $('#addingNew').find(".matricfield input"); // gets the field
    var contact = $('#addingNew').find(".contactfield input").val();
    var position = $('#addingNew').find('select').filter(':visible:first').val();

    if (matric === '') { //field is empty
        matricfield.addClass("error");
        empty = true;
    } else {
        matricfield.removeClass("error");
    }

    matricfield.find(".error").first().focus();

    if (!empty) {
        checkDatabase(matric, position, contact)

        $('#addingNew').remove()
        $(".add-new").removeAttr("disabled");
    }
}

function checkDatabase(matric, position, contact) {
    var currcca, check, exists
    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).once('value', function (snapshot) {
        exists = snapshot.exists()
        currcca = snapshot.child("cca").exists() ? snapshot.val().cca : []
    }).then(() => {
        var index = currcca.indexOf(ccaname)

        if (index > -1) {
            check = false
        } else {
            check = true
        }
    }).then(() => {
        if (exists) {
            if (check) {
                addToDatabase(matric, position, contact)
            } else {
                window.alert('Shearite already in CCA.')
            }
        } else {
            window.alert('Shearite with matric number ' + matric + ' does not exist.')
        }
    })
}

function addToDatabase(matric, position, contact) {
    var currcca = [] 

    var name
    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).once('value').then(function (snapshot) {
        currcca = snapshot.val().cca ? snapshot.val().cca : []
        name = snapshot.val().name
        
    }).then(() => {

        var memberId = new Date().getTime()
        var newMember = firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/' + ccaname + '/members/' + memberId)

        newMember.set({
            memberId: memberId,
            matric: matric,
            position: position,
            name: name,
            contact: contact,
        })

        if (!currcca.includes(ccaname)) {
            currcca.push(ccaname)
            firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).child('cca').set(currcca)
        } 
    }).then(() => {
        document.getElementById('displayMembers').innerHTML=''
        readMembers()
    })
   
}

function undo() {
    $('#addingNew').remove()
    $(".add-new").removeAttr("disabled");
}

function deleteMember(id, matric) {
    var member = firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/' + ccaname + '/members/' + id)
    member.remove()
    document.getElementById('displayMembers').innerHTML=''
    readMembers()

    // delete from personal cca list also

    var currcca
    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).once('value', function (snapshot) {
        currcca = snapshot.val().cca ? snapshot.val().cca : []
    }).then(() => {
        var index = currcca.indexOf(ccaname)

        if (index > -1) {
            currcca.splice(index, 1)
        }
        
        firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).update({
            cca : currcca
        })
    })
}

function edit(id, name, matric, contact) {
    document.getElementById("editModalBody").innerHTML=`
        <div class="modal-header">
            <h5 class="modal-title" id="memberModalLabel">Update Member Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <h5 style="font-weight: 300;">Name: ${name}</h5>
            </div>
            <div class="form-group">
                <h5 style="font-weight: 300;">Matric: ${matric}</h5>
            </div>
            <div class="form-group">
                <select id="updatePosition">
                    <option value="Chairperson">Chairperson</option>
                    <option value="Vice-Chairperson">Vice-Chairperson</option>
                    <option value="SecTres">SecTres</option>
                    <option value="Secretary">Secretary</option>
                    <option value="Treasurer">Treasurer</option>
                    <option value="Main Committee">Main Committee</option>
                    <option value="Sub Committee">Sub Committee</option>
                </select>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="updateContact" placeholder="Enter Contact" value=${contact}>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" onclick="update(${id})" data-dismiss="modal">Update</button>
        </div>
    `
}

function update(id) {
    var position = document.getElementById("updatePosition")
    var updatedPosition = position.options[position.selectedIndex].text
    var updatedContact = document.getElementById("updateContact").value

    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/' + ccaname + '/members/' + id).update({
        position: updatedPosition,
        contact: updatedContact
    })

    document.getElementById('displayMembers').innerHTML=''
    readMembers()
    
}