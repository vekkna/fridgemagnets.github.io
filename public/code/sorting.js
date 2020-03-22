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
    console.log("array: " + arr);
    let trimmed = arr.map(function(el){
        return el.trim() + " ";
    });
    console.log("trimmed: " + trimmed);
    this.solution = trimmed.join("");
    console.log("Solution: " + solution);
    trimmed = shuffle(trimmed);
    trimmed.forEach(el => {
        $("#sortable").append("<li><span>" + el +"</span></li>")
    });
};

function checkOrder(event, ui){
    var guess = $("#sortable").children().text();
    console.log("Guess: " + guess);
    console.log("Solution: " + this.solution);
    if(guess === solution){
        console.log("correct");
    }
    else{
        console.log("wrong");
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