firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //ccaname = user.email.split('@')[0]; //to get cca name
        firebase.database().ref("1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/" + user.email.split('@')[0] + "/name").on('value', function(snapshot) {
            document.getElementById("ccaid").innerHTML = snapshot.val();
        })
    }
})

function submitform() {
    if (confirm("Please confirm update of breakfast menu.\nThis action is irreversible.") == true) {
        setBreakfastData();
        document.getElementById("normalmenuform").reset();
        document.getElementById("drinksmenuform").reset();
        document.getElementById("othersform").reset();
    }
}

function capitalizeWords(str) {
    return str.split(/\s+/).map(s => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()).join(" ");
}

function setBreakfastData() {
    var mainarray = [];
    var main1 = capitalizeWords(document.getElementById("main1").value);
    var side1 = capitalizeWords(document.getElementById("side1").value);
    if (main1 !== "") {
        if (side1 !== "") {
            var firstdish = "Main: " + main1 + "\nSide: " + side1;
        } else {
            var firstdish = "Main: " + main1
        }
        mainarray.push(firstdish);
    }

    var main2 = capitalizeWords(document.getElementById("main2").value);
    var side2 = capitalizeWords(document.getElementById("side2").value);
    if (main2 !== "") {
        if (side2 !== "") {
            var seconddish = "Main: " + main2 + "\nSide: " + side2;
        } else {
            var seconddish = "Main: " + main2
        }
        mainarray.push(seconddish);
    }

    var grabandgoarray = [];
    var grabandgo = capitalizeWords(document.getElementById("grabandgo").value);
    if (grabandgo !== "") {
        grabandgoarray.push(grabandgo);
    }

    var drinksarray = [];
    var drinks1 = capitalizeWords(document.getElementById("drinks1").value);
    if (drinks1 !== "") {
        drinksarray.push(drinks1);
    }
    var drinks2 = capitalizeWords(document.getElementById("drinks2").value);
    if (drinks2 !== "") {
        drinksarray.push(drinks2);
    }

    var gotpaus = document.getElementById("Assorted Paus").checked;

    var gottoast = document.getElementById("Toast with Spread").checked;

    if (gotpaus && gottoast) {
        var array = ["Assorted Paus", "Toast with Spread"]
    } else if (gotpaus && !gottoast) {
        var array = ["Assorted Paus"]
    } else if (gottoast && !gotpaus) {
        var array = ["Toast with Spread"]
    } else {
        var array = []
    }

    firebase.database().ref('menu').set("clear"); //reset branch

    var counter = 0;

    if (mainarray.length > 0) {
        firebase.database().ref('menu/' + counter).set({
            data: mainarray,
            title: "Main Dishes"
        })
        counter++;
    }

    if (grabandgoarray.length > 0) {
        firebase.database().ref('menu/' + counter).set({
            data: [grabandgo],
            title: "Grab and Go"
        })
        counter++;
    }

    if (drinksarray.length > 0) {
        firebase.database().ref('menu/' + counter).set({
            data: drinksarray,
            title: "Beverages"
        })
        counter++;
    }

    if (array.length > 0) {
        firebase.database().ref('menu/' + counter).set({
            data: array,
            title: "Others"
        })
        counter++;
    }
}