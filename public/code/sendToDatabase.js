function sendToDatabase(){
    var input = {text: $('#inputText').val()};
    var newKey = firebase.database().ref('magnets').push().key;
    var entry = {};
    entry[newKey] = input;
    $("#shareCode").text(newKey);
    return firebase.database().ref('magnets' + newKey).update(input);
}    

function getMagnets(){
    console.log("in get magnets");
    var key = $("#keyInput").val();
    sessionStorage.setItem("key", "magnets" + $("#keyInput").val());
    console.log("in sendtodb, ss:" + sessionStorage.getItem("key"));
    window.location.href = "../html/shuffled.html";
}
