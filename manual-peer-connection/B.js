let rc = new RTCPeerConnection();

rc.onicecandidate = (e) => {
    console.log("New ICE Candidate. Reprint SDP" + JSON.stringify(rc.localDescription))
};

rc.ondatachannel = (e) => {
    rc.dc = e.channel;
    rc.dc.onmessage = e => {
        let newLi = document.createElement('li')
        newLi.innerHTML = `${(new Date()).getTime()} A := ${e.data}`;

        document.getElementById("msgs").appendChild(newLi)
    };
    rc.dc.onopen = e => {
        document.getElementById("initializers").style.display = "none";
        document.getElementById("logger").style.display = "block";
        console.log("Connection opened.")
    };
}

function setRemoteDescription() {
    const offer = JSON.parse(document.getElementById('remoteSDP').value);
    rc.setRemoteDescription(offer).then(v => {
        console.log("setRemoteDescription done.")
    })
}


function createAnswer() {
    rc.createAnswer().then((v) => {
        rc.setLocalDescription(v)
        document.getElementById('myAnswer').value = JSON.stringify(v)
    }).then(() => {
        console.log("Answer created.")
    })
}

function sendMessage() {
    rc.dc.send(document.getElementById('msg').value)
    document.getElementById('msg').value = ''
}