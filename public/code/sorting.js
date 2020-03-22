var solution = ""

$(document).ready((()=>{
    $( "#sortable" ).sortable({
        cursor: "move",
        update: ()=>checkOrder()
      });
    $( "#sortable" ).disableSelection();
    var key = sessionStorage.getItem("key");
    firebase.database().ref(key).once('value', function(snapshot) {
        this.sourceCode = snapshot.val().text;
        makeMagnets(snapshot.val().text);
      });
}));

function makeMagnets(text){
    let arr = text.split('\n');
    let trimmed = arr.map(function(el){
        return el.trim() + " ";
    });
    this.solution = trimmed.join("");
    trimmed = shuffle(trimmed);
    trimmed.forEach(el => {
        $("#sortable").append("<li>" + el +"</li>")
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