var dbRef = firebase.database();
//var email, ccaname;
// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         email = user.email;
//         ccaname = email.split('@')[0];
//     }
// });

// $('.dropdown-toggle').dropdown()

// var columns = [];
// var data = [];

// firebase.database().ref("1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/cmb").once("value", function(snap){
//     snap.forEach(snapshot => {
//         var rcd = [];
//         Object.keys(snapshot.val()).map(k => {
//               columns.push(Object.assign({}, {"data":k}));
//               rcd.push(Object.assign({}, {k:snapshot.val()[k]}));
//         })
//         data.push(rcd);
//     });
// });

// $("#member details").DataTable({
//     "data": data,
//     "columns": columns
//  });

function addnew() {
    //window.alert(firebase.auth().currentUser)
    // window.alert('hello')
    var actions = $("table td:last-child").html();
    // window.alert(this)
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
    var contactfield = $('#addingNew').find(".contactfield input");

    var namefield = $('#addingNew').find(".namefield input");

    var role = $('#addingNew').find('select').filter(':visible:first');

    if (matric === "") { //field is empty
        matricfield.addClass("error");
        empty = true;
    } else {
        matricfield.removeClass("error");
    }
    //$('#addingNew').find(".error").first().focus();
    matricfield.find(".error").first().focus();
    // $(document).find(".error").first().focus();

    if (!empty) {

        firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).on('value', function (snapshot) {
            window.alert(snapshot.val().name);
            $(namefield).parent("td").html(snapshot.val().name);
        })

        $('#addingNew').parent("td").html($('#addingNew').val());

        $(role).parent("td").html($(role).val()); // this works without the line above
        $(matricfield).parent("td").html($(matricfield).val());

        //window.alert(email)
        //.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/' + ccaname).set('test')

        //$(namefield).parent("td").html($(namefield).val());
        $(contactfield).parent("td").html($(contactfield).val());

        $('#addingNew').find(".add, .edit").toggle();
        $(".add-new").removeAttr("disabled");

        firebase.database().ref().child('ccasmb').push().set({
            matric: matric,
            position: role.val(),
        })
        // firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).child('cca').set({
        //     0: "Sports Management Board",
        //     1: "Sheares Link",
        //     2: "JCRC",
        // })
    }
}

// no idea whats this though hahahhaha

// $(window).load(function () {
//     $('#addingNew').submit(confirmnew);
//     window.alert('done')
// })

function edit() {
    // $('#addingNew').find("td:not(:last-child)").each(function () {
    $(this).parents("tr").find("td:not(:last-child)").each(function () {
        $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
    });
    $('#addingNew').find(".add, .edit").toggle();
    // $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", true);
}

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();
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
    $(document).on("click", ".delete", function () {
        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
    });
});

