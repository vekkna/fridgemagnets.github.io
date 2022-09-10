var solution = ""

$(document).ready((() => {
    $("#sortable").sortable({
        cursor: "move",
        update: () => checkOrder()
    });
    $("#sortable").disableSelection();
    var key = sessionStorage.getItem("key");
    firebase.database().ref(key).once('value', function (snapshot) {
        if (snapshot.val() === null) {
            document.getElementById("report").innerHTML = "Sorry, no puzzle for that key found."
        }
        else {
            document.getElementById("report").innerHTML = "Their order is <span id='feedback'>WRONG</span>"
            makeMagnets(snapshot.val());
        }
    });
}));

function makeMagnets(input) {
    console.log("Input: " + input);
    $("#description").text(input.description);
    // The string from the db will contain empty lines to split the magnets into groups
    // We need to split the string into an array of strings, each string being a group
    let arr = input.text.split('\n\n');
    console.log("Array: " + arr);
    // Remove any empty lines
    let stripped = arr.filter((line) => line.length !== 0);
    console.log("Stripped is: " + stripped);
    // Remove any spaces at the beginning of each line
    let trimmed = stripped.map(function (line) {
        return line.replace(/^\s+/mg, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    });
    console.log("Trimmed, escaped: " + trimmed);
    this.solution = trimmed.join("");
    console.log("Solution: " + this.solution);
    while (this.solution === trimmed.join("")) {
        trimmed = shuffle(trimmed);
    }
    trimmed.forEach(line => {
        $("#sortable").append("<li>" + line + "</li>")
    });
};

function checkOrder(event, ui) {
    var guess = $("#sortable").children().text();
    guess = guess.replace(/^\s+/mg, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    console.log("Guess: " + guess);
    if (guess === solution) {
        $("#feedback").text("RIGHT");
        $("#feedback").css("color", "green");
    }
    else {
        $("#feedback").text("WRONG");
        $("#feedback").css("color", "red");
    }
};

function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};