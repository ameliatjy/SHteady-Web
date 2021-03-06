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
        bar += '<li class="nav-item">'
        bar += '<a class="nav-link" href="../members/Members.html">Members<span class="sr-only">(current)</span></a>'
        bar += '</li>'
        bar += '<li class="nav-item dropdown">'
        bar += '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Venues</a>'
        bar += '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'
        bar += '<a class="dropdown-item" href="../venue/Venue.html">Book Venue</a>'
        bar += '<a class="dropdown-item" href="../venue/PastBookings.html">View Submitted Requests</a>'

        if (user.email.split('@')[0] === 'ccaconsheares') {
            bar += '</div>'
            bar += '<li class="nav-item dropdown">'
            bar += '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
            bar += 'Update Menu'
            bar += '</a>'
            bar += '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">'
            bar += '<a class="dropdown-item" href="../menu/Breakfast.html">Breakfast</a>'
            bar += '<a class="dropdown-item" href="../menu/Dinner.html">Dinner</a>'
            bar += '</div>'
        } else if (user.email.split('@')[0] === 'ccajcrc') { //can view all bookings
            bar += '<a class="dropdown-item" href="../venue/VenueManagement.html">Venue Management</a>'
            bar += '</div>'
            bar += '<li class="nav-item">'
            bar += '<a class="nav-link" href="../report/Report.html">Reports<span class="sr-only">(current)</span></a>'
            bar += '</li>'

        } else {
            bar += '</div>'
        }

        bar += '</li>'
        bar += '</ul>'
        bar += '<span class="navbar-text">'
        bar += '<ul class="navbar-nav">'
        bar += '<li class="nav-item">'
        bar += '<a class="nav-link" id="ccaid" style="color: black;" href="../login/ChangePassword.html" title="Change Password"></a>'
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

        $("#nav-placeholder").replaceWith(bar);
        document.getElementById("body").style.visibility = "visible";
        $('#loading').hide();
        firebase.database().ref("1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/" + user.email.split('@')[0] + "/name").on('value', function (snapshot) {
            document.getElementById("ccaid").innerHTML = snapshot.val();
        })
    }
})