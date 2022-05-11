let localStream;
let remoteStream;
let peerConnection;

// grab info after creating a new project on agora.io
let APP_ID = ''
let token = null;

let uid = String(Math.floor(Math.random() * 1000));

let client;
let channel;

// create a stun server object
const servers = {
    iceServer:[
        {
            urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }

    ]
}

let init = async () => {

    // agora set up
    client = await AgoraRTM.createInstance(APP_ID)
    await client.login({uid, token})

    channel = client.createChannel('main')
    await channel.join()
    channel.on('MemberJoined', handleUserJoined)

    client.on('MessageFromPeer', handleMessageFromPeer)

    // ask for permission to use camera for audio/video chat.
    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false}) // Request permission to our camera/mic
    document.getElementById('user-1').srcObject = localStream;

    
}

let handleMessageFromPeer = async (message, memberId) => {
    console.log('handleMessageFromPeer Message:', message.text)

}

let handleUserJoined = async (MemberId) => {
    console.log('A new user joined the channel:', MemberId)
    createOffer(MemberId)
}


let createOffer = async (memberId) => {
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

    client.sendMessageToPeer({text:'Hey!'}, memberId)
}
init();