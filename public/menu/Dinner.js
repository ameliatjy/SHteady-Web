firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //ccaname = user.email.split('@')[0]; //to get cca name
        firebase.database().ref("1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/cca/" + user.email.split('@')[0] + "/name").on('value', function(snapshot) {
            document.getElementById("ccaid").innerHTML = snapshot.val();
        })
    }
})

function submitform() {
    if (confirm("Please confirm update of dinner menu.\nThis action is irreversible.") == true) {
        setDinnerData();
        document.getElementById("normalmenuform").reset();
        document.getElementById("specialmenuform").reset();
        document.getElementById("dessertdrinksmenuform").reset();
    }
}

function capitalizeWords(str) {
    return str.split(/\s+/).map(s => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()).join(" ");
}

function setDinnerData() {
    var meatarray = [];
    var meat1 = capitalizeWords(document.getElementById("meat1").value);
    if (meat1 !== "") {
        meatarray.push(meat1);
    }
    var meat2 = capitalizeWords(document.getElementById("meat2").value);
    if (meat2 !== "") {
        meatarray.push(meat2);
    }
    var meat3 = capitalizeWords(document.getElementById("meat3").value);
    if (meat3 !== "") {
        meatarray.push(meat3);
    }

    var sidesarray = [];
    var side1 = capitalizeWords(document.getElementById("side1").value);
    if (side1 !== "") {
        sidesarray.push(side1);
    }
    var side2 = capitalizeWords(document.getElementById("side2").value);
    if (side2 !== "") {
        sidesarray.push(side2);
    }
    var side3 = capitalizeWords(document.getElementById("side3").value);
    if (side3 !== "") {
        sidesarray.push(side3);
    }
    var side4 = capitalizeWords(document.getElementById("side4").value);
    if (side4 !== "") {
        sidesarray.push(side4);
    }

    var vegearray = [];
    var vege1 = capitalizeWords(document.getElementById("vege1").value);
    if (vege1 !== "") {
        vegearray.push(vege1);
    }
    var vege2 = capitalizeWords(document.getElementById("vege2").value);
    if (vege2 !== "") {
        vegearray.push(vege2);
    }
    var vege3 = capitalizeWords(document.getElementById("vege3").value);
    if (vege3 !== "") {
        vegearray.push(vege3);
    }

    var specialsarray = [];
    var specialmain = capitalizeWords(document.getElementById("specialmain").value);
    if (specialmain !== "") {
        specialsarray.push(specialmain);
    }
    var specialside1 = capitalizeWords(document.getElementById("specialside1").value);
    if (specialside1 !== "") {
        specialsarray.push(specialside1);
    }
    var specialside2 = capitalizeWords(document.getElementById("specialside2").value);
    if (specialside2 !== "") {
        specialsarray.push(specialside2);
    }

    var dessertdrinksarray = [];
    var dessert = capitalizeWords(document.getElementById("dessert").value);
    if (dessert !== "") {
        dessertdrinksarray.push(dessert);
    }
    var drinks = capitalizeWords(document.getElementById("drinks").value);
    if (drinks !== "") {
        dessertdrinksarray.push(drinks);
    }

    firebase.database().ref('menu').set("clear");

    var counter = 0;

    if (meatarray.length > 0) {
        firebase.database().ref('menu/' + counter).set({
            data: meatarray,
            title: "Meat Dishes"
        })
        counter++;
    }

    if (sidesarray.length > 0) {
        firebase.database().ref('menu/' + counter).set({
            data: sidesarray,
            title: "Side Dishes"
        })
        counter++;
    }

    if (vegearray.length > 0) {
        firebase.database().ref('menu/' + counter).set({
            data: vegearray,
            title: "Vegetables"
        })
        counter++;
    }

    if (specialsarray.length > 0) {
        firebase.database().ref('menu/' + counter).set({
            data: specialsarray,
            title: "Specials"
        })
        counter++;
    }

    if (dessertdrinksarray.length > 0) {
        firebase.database().ref('menu/' + counter).set({
            data: dessertdrinksarray,
            title: "Dessert/Drinks"
        })
        counter++;
    }
}