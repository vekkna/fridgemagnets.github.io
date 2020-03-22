$(document).ready(function(){

})

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
    sessionStorage.setItem("key", "magnets" + $("#keyInput").val());
    window.location.href = "../html/shuffled.html";
}

function copyCode(){
    let code = document.getElementById("shareCode");
    code.select();
    code.setSelectionRange(0, 99999);
    document.execCommand("copy");
}
