var solution = ""

$(document).ready((()=>{
    $( "#sortable" ).sortable({
        cursor: "move",
        update: ()=>checkOrder()
      });
    $( "#sortable" ).disableSelection();
    var key = sessionStorage.getItem("key");
    firebase.database().ref(key).once('value', function(snapshot) {
        if(snapshot.val() === null){
            console.log("nothing found")
            document.getElementById("report").innerHTML = "Sorry, no puzzle for that key found."
        }
        else{
            document.getElementById("report").innerHTML = "Their order is <span id='feedback'>WRONG</span>"
            this.sourceCode = snapshot.val().text;
            makeMagnets(snapshot.val().text);
        }
      });
}));

function makeMagnets(text){
    let arr = text.split('\n');
    let stripped = arr.filter((line) => line.length !== 0);
    let trimmed = stripped.map(function(line){
        return line.trim() + " ";
    });
    this.solution = trimmed.join("");
    trimmed = shuffle(trimmed);
    trimmed.forEach(line => {
        $("#sortable").append("<li>" + line +"</li>")
    });
};

function checkOrder(event, ui){
    var guess = $("#sortable").children().text();
    if(guess === solution){
        $("#feedback").text("RIGHT");
        $("#feedback").css("color", "green");
    }
    else{
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