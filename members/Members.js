// import firebaseConfig from '../Firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB1oyaDAneBvtqpJJqYN_o13jWDExpRDq0",
    authDomain: "shteady-b81ed.firebaseapp.com",
    databaseURL: "https://shteady-b81ed.firebaseio.com",
    projectId: "shteady-b81ed",
    storageBucket: "shteady-b81ed.appspot.com",
    messagingSenderId: "749591564782",
    appId: "1:749591564782:web:73f597ecbcf1edd21dfeff",
    measurementId: "G-CBS54V1147"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var dbRef = firebase.database();
var mainRef = dbRef.ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg');
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
    // window.alert('hello')
    var actions = $("table td:last-child").html();
    // window.alert(this)
    $(".add-new").prop("disabled", true);

        var index = $("table tbody tr:last-child").index();
        var nextIndex = index + 2;
        var row = '<tr id="addingNew">' +
            '<td>' + nextIndex + '</td>' +
            '<td><input type="text" class="form-control" name="Full Name" id="Full Name"></td>' +
            '<td><select>' +
                '<option value="Chairperson">Chairperson</option>' + 
                '<option value="Vice-Chairperson">Vice-Chairperson</option>' + 
                '<option value="Secretary">Secretary</option>' + 
                '<option value="Treasurer">Treasurer</option>' + 
                '<option value="Main Committee">Main Committee</option>' +
                '<option value="Sub Committee">Sub Committee</option>' + 
            '</select></td>' +
            '<td><input type="text" class="form-control" name="Matric Number" id="Matric Number"></td>' +
            '<td><input type="text" class="form-control" name="Contact" id="Contact"></td>' +
            '<td>' + actions + '</td>' +
            '</tr>';
        $('table').append(row);
        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
}

function confirmnew() {

    var empty = false;
    var input = $('#addingNew').find('input[type="text"]');
    // var input = $(document).find('input[type="text"]');

    var role = $('#addingNew').find('select').filter(':visible:first');

    input.each(function () {
        if (!$(this).val()) {
            $(this).addClass("error");
            empty = true;
        } else {
            $(this).removeClass("error");
        }
    });
    $('#addingNew').find(".error").first().focus();
    // $(document).find(".error").first().focus();

    if (!empty) {
        input.each(function () {
            $(this).parent("td").html($(this).val());
        });
        // role.each(function () {
            // firebase.database().ref('test/').push().set({position: 'h'})
            // window.alert($(role).val())
            mainRef.push({position: $(role).val()}) //??????????

            $(role).parent("td").html($(role).val()); // this works without the line above

        // });
        $('#addingNew').find(".add, .edit").toggle();
        $(".add-new").removeAttr("disabled");
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

