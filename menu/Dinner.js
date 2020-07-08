function submitform() {
    setData();
    document.getElementById("normalmenuform").reset();
    document.getElementById("specialmenuform").reset();
    document.getElementById("dessertdrinksmenuform").reset();
}

function capitalizeWords(str) {
    return str.split(/\s+/).map(s => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()).join(" ");
}

function setData() {
    var meat1 = capitalizeWords(document.getElementById("meat1").value);
    var meat2 = capitalizeWords(document.getElementById("meat2").value);
    var meat3 = capitalizeWords(document.getElementById("meat3").value);
    var side1 = capitalizeWords(document.getElementById("side1").value);
    var side2 = capitalizeWords(document.getElementById("side2").value);
    var side3 = capitalizeWords(document.getElementById("side3").value);
    var side4 = capitalizeWords(document.getElementById("side4").value);
    var vege1 = capitalizeWords(document.getElementById("vege1").value);
    var vege2 = capitalizeWords(document.getElementById("vege2").value);
    var vege3 = capitalizeWords(document.getElementById("vege3").value);

    var specialmain = capitalizeWords(document.getElementById("specialmain").value);
    var specialside1 = capitalizeWords(document.getElementById("specialside1").value);
    var specialside2 = capitalizeWords(document.getElementById("specialside2").value);

    var dessert = capitalizeWords(document.getElementById("dessert").value);
    var drinks = capitalizeWords(document.getElementById("drinks").value);

    firebase.database().ref('menu/0').set({
        data: [meat1, meat2, meat3],
        title: "Meat Dishes"
    })

    firebase.database().ref('menu/1').set({
        data: [side1, side2, side3, side4],
        title: "Side Dishes"
    })

    firebase.database().ref('menu/2').set({
        data: [vege1, vege2, vege3],
        title: "Vegetables"
    })

    firebase.database().ref('menu/3').set({
        data: [specialmain, specialside1, specialside2],
        title: "Specials"
    })

    firebase.database().ref('menu/4').set({
        data: [dessert, drinks],
        title: "Dessert/Drinks"
    })
}