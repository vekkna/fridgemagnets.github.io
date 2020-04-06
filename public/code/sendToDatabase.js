$(document).ready(()=>{
    document.getElementById("keyInput").addEventListener("click", ()=>{
        navigator.clipboard.readText().then(
            clipText => document.getElementById("keyInput").value = clipText);
    });
});

function sendToDatabase(){
    if($("#inputText").val().length === 0){
        return;
    }
    var input = {description: $("#descriptionText").val(),
        text: $("#inputText").val()};
    var newKey = firebase.database().ref("magnets").push().key;
    $("#shareCode").val(newKey);
    return firebase.database().ref("magnets" + newKey).update(input);
}    

function getMagnets(){
    var key = $("#keyInput").val();
    if (key.length === 0){
        key = "-M32LeQgFDZzdkpMZ3YB";
    }
    sessionStorage.setItem("key", "magnets" + key);
    window.location.href = "../html/shuffled.html";
}

function copyCode(){
    let code = document.getElementById("shareCode");
    code.select();
    code.setSelectionRange(0, 99999);
    document.execCommand("copy");
}
