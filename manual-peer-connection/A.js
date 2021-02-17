let lc = new RTCPeerConnection();
let dc = lc.createDataChannel('channel');

dc.onmessage = e => {
    let newLi = document.createElement('li')
    newLi.innerHTML = `${(new Date()).getTime()} B := ${e.data}`;

    document.getElementById("msgs").appendChild(newLi)
};

dc.onopen = e => {
    document.getElementById("initializers").style.display = "none";
    document.getElementById("logger").style.display = "block";
    console.log("Connection opened.")
};

lc.onicecandidate = e => {
    document.getElementById('mySDP').value = JSON.stringify(lc.localDescription);
    console.log("New ICE Candidate. Reprint SDP" + JSON.stringify(lc.localDescription))
};

lc.createOffer().then(o => lc.setLocalDescription(o)).then(e => console.log("Local Description Set."))

function createConnection() {
    const answer = JSON.parse(document.getElementById('remoteAnswer').value);
    lc.setRemoteDescription(answer).then(a => {
        console.log("done")
    })
}

function sendMessage() {
    dc.send(document.getElementById('msg').value)
    document.getElementById('msg').value = ''
}