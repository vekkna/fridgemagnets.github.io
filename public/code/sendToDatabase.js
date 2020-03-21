$(document).ready((()=>{
    console.log("ready");
}))

function sendToDatabase(){
    var input = {text: $('#inputText').val()};
    var newKey = firebase.database().ref('magnets').push().key;
    var entry = {};
    entry[newKey] = input;
    $("#shareCode").text(newKey);
    return firebase.database().ref('magnets' + newKey).update(input);
}    

function getMagnets(){
    var key = $("#keyInput").val();
    firebase.database().ref('magnets' + key).once('value', function(snapshot) {
        $('#magnets').val(snapshot.val().text);
      });
}
