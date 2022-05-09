let localStream;
let remoteStream;
let peerConnection;

// create a stun server object
const servers = {
    iceServer:[
        {
            urls:['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
        }

    ]
}

let init = async () => {
    // ask for permission to use camera for audio/video chat.
    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false}) // Request permission to our camera/mic
    document.getElementById('user-1').srcObject = localStream;

    createOffer()
}

let createOffer = async () => {
    // peerConnection will be the core interface to connect to users.
    peerConnection = new RTCPeerConnection(servers)

    // set up the remote streams
    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream; // have the stream ready before the user accepts the offer. 


    // get local tracks and add them to the connection so the remote peer can get them
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    });

    // add the other users track
    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

    // generate ice candidates 
    peerConnection.onicecandidate = async (event)  => {
        if(event.candidate){
            console.log('new ice candidate:',event.candidate);
        }
    }

    // create the offer
    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer)

    console.log("Offer:" + offer)
}
init();