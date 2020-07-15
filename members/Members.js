firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var bar = '';
        bar += '<nav class="navbar navbar-expand-lg navbar-light" style="background-color: orange;">';
        bar += '<a class="navbar-brand" href="#">'
        bar += '<img src="../images/shteadylogo.png" height="40" class="d-inline-block align-top" alt="">'
        bar += '</a>'

        bar += '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">'
        bar += '<span class="navbar-toggler-icon"></span>'
        bar += '</button>'

        bar += '<div class="collapse navbar-collapse" id="navbarNavDropdown">'
        bar += '<ul class="navbar-nav mr-auto">'
        bar += '<li class="nav-item active">'
        bar += '<a class="nav-link" href="../members/Members.html">Members<span class="sr-only">(current)</span></a>'
        bar += '</li>'
        if (user.email.split('@')[0] === 'ccaconsheares') {
            bar += '<li class="nav-item">'
            bar += '<a class="nav-link" href="../venue/Venue.html">Venue Booking</a>'
            bar += '</li>'
            bar += '<li class="nav-item dropdown">'
            bar += '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
            bar += 'Update Menu'
            bar += '</a>'
            bar += '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'
            bar += '<a class="dropdown-item" href="../menu/Breakfast.html">Breakfast</a>'
            bar += '<a class="dropdown-item" href="../menu/Dinner.html">Dinner</a>'
            bar += '</div>'
            bar += '</li>'
            bar += '</ul>'
            bar += '<span class="navbar-text">'
            bar += '<ul class="navbar-nav">'
            bar += '<li class="nav-item">'
            bar += '<a class="nav-link disabled" href="#" id="ccaid" style="color: black;"></a>'
            bar += '</li>'
            bar += '<li class="nav-item">'
            bar += '<a class="nav-link" data-toggle="tooltip" data-placement="bottom" onclick="logout()" title="Log Out">'
            bar += '<img src="../open-iconic-master/svg/account-logout.svg" alt="account-logout" height="20">'
            bar += '</a>'
            bar += '</li>'
            bar += '</ul>'
            bar += '</span>'
            bar += '</div>'
            bar += '</nav>'
        } else if (user.email.split('@')[0] === 'ccajcrc') {
            bar += '<li class="nav-item dropdown">'
            bar += '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Venues</a>'
            bar += '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'
            bar += '<a class="dropdown-item" href="../venue/Venue.html">Venue Booking</a>'
            bar += '<a class="dropdown-item" href="../venue/VenueManagement.html">Venue Management</a>'
            bar += '</div>'
            bar += '</li>'
            bar += '</ul>'
            bar += '<span class="navbar-text">'
            bar += '<ul class="navbar-nav">'
            bar += '<li class="nav-item">'
            bar += '<a class="nav-link disabled" href="#" id="ccaid" style="color: black;"></a>'
            bar += '</li>'
            bar += '<li class="nav-item">'
            bar += '<a class="nav-link" data-toggle="tooltip" data-placement="bottom" onclick="logout()" title="Log Out">'
            bar += '<img src="../open-iconic-master/svg/account-logout.svg" alt="account-logout" height="20">'
            bar += '</a>'
            bar += '</li>'
            bar += '</ul>'
            bar += '</span>'
            bar += '</div>'
            bar += '</nav>'
        } else {
            bar += '<li class="nav-item">'
            bar += '<a class="nav-link" href="../venue/Venue.html">Venue Booking</a>'
            bar += '</li>'
            bar += '</ul>'
            bar += '<span class="navbar-text">'
            bar += '<ul class="navbar-nav">'
            bar += '<li class="nav-item">'
            bar += '<a class="nav-link disabled" href="#" id="ccaid" style="color: black;"></a>'
            bar += '</li>'
            bar += '<li class="nav-item">'
            bar += '<a class="nav-link" data-toggle="tooltip" data-placement="bottom" onclick="logout()" title="Log Out">'
            bar += '<img src="../open-iconic-master/svg/account-logout.svg" alt="account-logout" height="20">'
            bar += '</a>'
            bar += '</li>'
            bar += '</ul>'
            bar += '</span>'
            bar += '</div>'
            bar += '</nav>'
        }

        $("#nav-placeholder").replaceWith(bar);
        document.getElementById("memberstable").style.visibility = "visible";
        $('#loading').hide();
        firebase.database().ref("1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/" + user.email.split('@')[0] + "/name").on('value', function (snapshot) {
            document.getElementById("ccaid").innerHTML = snapshot.val();
        })
    }
})

var memberDetails = {}

function checkDB() {
    return firebase.database().ref('CCA/' + firebase.auth().currentUser.email.split('@')[0]).on('value', function (snapshot) {
        // var index = 0

        let data = snapshot.val() ? snapshot.val() : {}
        let memberDetailsItems = { ...data }
        memberDetails = memberDetailsItems
    })
}

window.setTimeout(() => {
    window.alert('Data loading... Please hold on for a second :)' + firebase.auth().currentUser.displayName) //idk why but adding the back part made the page faster ... wot
}, 500)

//window.setTimeout(this.getCCAname, 1000)
window.setTimeout(this.checkDB, 1000)

function getData() {

    let keys = Object.keys(memberDetails)
    var index = 0

    if (keys.length > 0) {
        keys.map((key) => {
            index += 1;
            var name = memberDetails[key].name;
            var matric = memberDetails[key].matric;
            var position = memberDetails[key].position;
            var contact = memberDetails[key].contact == '' ? 'NIL' : memberDetails[key].contact;
            var content
            content += '<tr>';
            content += '<td>' + index + '</td>';
            content += '<td>' + name + '</td>';
            content += '<td>' + position + '</td>';//column2
            content += '<td>' + matric + '</td>'; //column1
            content += '<td>' + contact + '</td>'; //column1
            content += '<td>' +
                '<a class="add" title="Add" data-toggle="tooltip" onclick="confirmnew()"><i class="material-icons">&#xE03B;</i></a>' +
                '<a class="edit" title="Edit" data-toggle="tooltip" onclick="edit()"><i class="material-icons">&#xE254;</i></a>' +
                '<a class="delete" title="Delete" data-toggle="tooltip" onclick="removeMember()"><i class="material-icons">&#xE872;</i></a>' +
                '</td>'
            content += '</tr>';
            $('table').append(content);
        })
    }
}

window.setTimeout(this.getData, 3000)

function addnew() {

    var actions = $("table td:last-child").html();
    $(".add-new").prop("disabled", true);

    var index = $("table tbody tr:last-child").index();
    var nextIndex = index + 2;
    var row = '<tr id="addingNew">' +
        '<td>' + nextIndex + '</td>' +
        '<td class="namefield"></td>' +
        '<td><select>' +
        '<option value="Chairperson">Chairperson</option>' +
        '<option value="Vice-Chairperson">Vice-Chairperson</option>' +
        '<option value="Secretary">Secretary</option>' +
        '<option value="Treasurer">Treasurer</option>' +
        '<option value="Main Committee">Main Committee</option>' +
        '<option value="Sub Committee">Sub Committee</option>' +
        '</select></td>' +
        '<td class="matricfield"><input type="text" class="form-control" name="Matric Number" id="Matric Number"></td>' +
        '<td class="contactfield"><input type="text" class="form-control" name="Contact" id="Contact"></td>' +
        '<td>' + actions + '</td>' +
        '</tr>';
    $('table').append(row);
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

        var cca = firebase.auth().currentUser.email.split('@')[0];
        window.alert(cca)
        this.addToDatabase(cca, matric, position, contact)

        $('#addingNew').remove()

        $(".add-new").removeAttr("disabled");

        // firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).child('cca').set({
        //     0: "Sports Management Board",
        //     1: "Sheares Link",
        //     2: "JCRC",
        // })
    }
}

function addToDatabase(cca, matric, position, contact) {
    return firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).once('value').then(function (snapshot) {
        var name = snapshot.val().name
        // window.alert(name)
        var newMember = firebase.database().ref('CCA/' + cca).push()
        newMember.set({
            matric: matric,
            position: position,
            name: name,
            contact: contact,
        }).then(function () {
            //window.setTimeout(getCCAname(), 1000)
            window.setTimeout(this.checkDB(), 1000)
        }).then(function () {
            var index = Object.keys(memberDetails).length
            var keyIndex = Object.keys(memberDetails).length - 1

            var key = Object.keys(memberDetails)[keyIndex]

            var name = memberDetails[key].name;
            var matric = memberDetails[key].matric;
            var position = memberDetails[key].position;
            var contact = memberDetails[key].contact == '' ? 'NIL' : memberDetails[key].contact;
            var content
            content += '<tr>';
            content += '<td>' + index + '</td>';
            content += '<td><input type="text" class="form-control" name="name" id="name">' + name + '</input></td>';
            content += '<td contenteditable="true">' + position + '</td>';//column2
            content += '<td contenteditable="true">' + matric + '</td>'; //column1
            content += '<td contenteditable="true">' + contact + '</td>'; //column1
            content += '<td>' +
                '<a class="add" title="Add" data-toggle="tooltip" onclick="confirmnew()"><i class="material-icons">&#xE03B;</i></a>' +
                '<a class="edit" title="Edit" data-toggle="tooltip" onclick="edit()"><i class="material-icons">&#xE254;</i></a>' +
                '<a class="delete" title="Delete" data-toggle="tooltip" onclick="removeMember()"><i class="material-icons">&#xE872;</i></a>' +
                '</td>'
            content += '</tr>';
            $('table').append(content);

        })
    })
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

function edit() {
    // doesnt work T.T
    // need to edit firebase and show editted row

    // $('#addingNew').find("td:not(:last-child)").each(function () {
    $(this).parents("tr").find("td:not(:last-child)").each(function () {
        $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
    });
    $('#addingNew').find(".add, .edit").toggle();
    // $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", true);
}

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

