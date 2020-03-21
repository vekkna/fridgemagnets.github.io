function sendToDatabase(){
    var input = {text: document.getElementById("inputText").value};
    var newKey = firebase.database().ref('magnets').push().key;
    var entry = {};
    entry[newKey] = input;
    document.getElementById("shareCode").innerHTML = newKey;
    return firebase.database().ref('magnets'+newKey).update(input);
}    

function getMagnets(){
    var key = document.getElementById("keyInput").value;
    firebase.database().ref('magnets'+key).once('value', function(snapshot) {
        document.getElementById('magnets').value = snapshot.val().text;
      });
}
