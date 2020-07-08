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
    var main1 = capitalizeWords(document.getElementById("main1").value);
    var side1 = capitalizeWords(document.getElementById("side1").value);
    var firstdish = "Main: " + main1 + "\nSide: " + side1;
    var main2 = capitalizeWords(document.getElementById("main2").value);
    var side2 = capitalizeWords(document.getElementById("side2").value);
    var seconddish = "Main: " + main2 + "\nSide: " + side2;

    var grabandgo = capitalizeWords(document.getElementById("grabandgo").value);

    var drinks1 = capitalizeWords(document.getElementById("drinks1").value);
    var drinks2 = capitalizeWords(document.getElementById("drinks2").value);

    var gotpaus = document.getElementById("Assorted Paus").checked;

    var gottoast = document.getElementById("Toast with Spread").checked;

    if (gotpaus && gottoast) {
        var array = ["Assorted Paus", "Toast with Spread"]
    } else if (gotpaus && !gottoast) {
        var array = ["Assorted Paus"]
    } else if (gottoast && !gotpaus) {
        var array = ["Toast with Spread"]
    } else {
        var array = ""
    }

    firebase.database().ref('menu').set("clear"); //reset branch

    firebase.database().ref('menu/0').set({
        data: [firstdish, seconddish],
        title: "Main Dishes"
    })

    firebase.database().ref('menu/1').set({
        data: [grabandgo],
        title: "Grab and Go"
    })

    firebase.database().ref('menu/2').set({
        data: [drinks1, drinks2],
        title: "Beverages"
    })

    firebase.database().ref('menu/3').set({
        data: array,
        title: "Others"
    })
}