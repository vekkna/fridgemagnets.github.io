function sendToDatabase(){
    var input = {text: document.getElementById("inputText").value};
    var newKey = firebase.database().ref('magnets').push().key;
    var entry = {};
    entry[newKey] = input;
    document.getElementById("shareCode").innerHTML = newKey;
    return firebase.database().ref('magnets').update(entry);
}