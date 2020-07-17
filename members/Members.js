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

        // window.alert('hi')
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
                    <a class="add" title="Add" data-toggle="tooltip" onclick="confirmnew()"><i class="material-icons">&#xE03B;</i></a>
                    <a class="edit" title="Edit" data-toggle="tooltip" onclick="edit()"><i class="material-icons">&#xE254;</i></a>
                    <a class="delete" title="Delete" data-toggle="tooltip" onclick="deleteMember(${data.id})"><i class="material-icons">&#xE872;</i></a>
                </td>            
            </tr> 
            `
           
        })
        // $("table tbody tr").eq(index - 1).find(".edit, .delete").toggle();
        $('[data-toggle="tooltip"]').tooltip();
        
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

        addToDatabase(matric, position, contact)

        $('#addingNew').remove()
        $(".add-new").removeAttr("disabled");
    }
}

function addToDatabase(matric, position, contact) {
    var currcca = [] 

    var name
    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).once('value').then(function (snapshot) {
        currcca = snapshot.val().cca ? snapshot.val().cca : []
        name = snapshot.val().name
        
    }).then(() => {
        var newMember = firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/' + ccaname + '/members').push()
        newMember.set({
            id: newMember.getKey(),
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

function deleteMember(id) {
    window.alert('hi')
    var member = firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/' + ccaname + '/members/' + id)
    member.remove()
    document.getElementById('displayMembers').innerHTML=''
    readMembers()
}

// function removeMember() {
// window.alert(this.rowIndex)
// var ids = $.map($('table').bootstrapTable('getSelections'), function (row) {
//     return row.id
//   })
//   $('table').bootstrapTable('remove', {
//     field: 'id',
//     values: ids
//   })

// need to delete from firebase and delete row
// $(this).parents('tr').remove()
// }

// function edit() {
//     // doesnt work T.T
//     // need to edit firebase and show editted row

//     // $('#addingNew').find("td:not(:last-child)").each(function () {
//     $(this).parents("tr").find("td:not(:last-child)").each(function () {
//         $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
//     });
//     $('#addingNew').find(".add, .edit").toggle();
//     // $(this).parents("tr").find(".add, .edit").toggle();
//     $(".add-new").attr("disabled", true);
// }

// $(document).ready(function () {
//     $('[data-toggle="tooltip"]').tooltip();
//     var actions = $("table td:last-child").html();
    // Append table with add row form on add new button click
    // $(".add-new").click( function () {
    //     window.alert('hello')
    //     $(this).prop("disabled", "disabled");
    //     var index = $("table tbody tr:last-child").index();
    //     var row = '<tr>' +
    //         '<td><input type="text" class="form-control" name="name" id="name"></td>' +
    //         '<td><input type="text" class="form-control" name="department" id="department"></td>' +
    //         '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
    //         '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
    //         '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
    //         '<td>' + actions + '</td>' +
    //         '</tr>';
    //     $("table").append(row);
    //     $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
    //     $('[data-toggle="tooltip"]').tooltip();
    // });
    // Add row on add button click
    // $(document).on("click", ".add", function () {
    //     var empty = false;
    //     var input = $(this).parents("tr").find('input[type="text"]');
    //     input.each(function () {
    //         if (!$(this).val()) {
    //             $(this).addClass("error");
    //             empty = true;
    //         } else {
    //             $(this).removeClass("error");
    //         }
    //     });
    //     $(this).parents("tr").find(".error").first().focus();
    //     if (!empty) {
    //         input.each(function () {
    //             $(this).parent("td").html($(this).val());
    //         });
    //         $(this).parents("tr").find(".add, .edit").toggle();
    //         $(".add-new").removeAttr("disabled");
    //     }
    // });
    // Edit row on edit button click
    // $(document).on("click", ".edit", function () {
    //     $(this).parents("tr").find("td:not(:last-child)").each(function () {
    //         $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
    //     });
    //     $(this).parents("tr").find(".add, .edit").toggle();
    //     $(".add-new").attr("disabled", "disabled");
    // });


    // Delete row on delete button click
//     $(document).on("click", ".delete", function () {
//         $(this).parents("tr").remove();
//         $(".add-new").removeAttr("disabled");
//     });
// });

