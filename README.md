# WebRTC JS Web App

Link to documentation  below - 

[https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)

# What is WebRTC?

WebRTC is a set of js APIs that allow us to establish peer-to-peer connections between browsers to share data like audio and video.

- We know how to work with APIs.
- implement a feature like this for customer service needs or being able to allow companies to have a way for users to have a face-to-face conversation.
- Allows for real-time communication and lower latency
- The data never reaches a server.

# What is latency?

Latency is a synonym for the delay.

Lower Latency = Good.

Higher Latency = bad.

WebSockets ≠ WebRTC

Web Sockets are real-time communication through servers.

WebRTC is communication between browsers. 

{ Use Cases }

WebSockets would be good for a real-time chat where a second of latency would not be as

noticeable but in the case of audio and video will have a bad experience due to higher latency due to the call going to the server.

WebRTC will have lower latency due to the audio and video data going straight to the browser.

UDP (WebRTC) does not validate data so it will not be a reliable protocol for transferring important data. 

# What is sent between the two clients and how is it sent?

- SDP’s
    - A session description protocol is an object containing information about the session connection such as the codec, address, media type, audio, and video.
- ICE Candidates
    - An ICE Candidate is a public IP address and port that could potentially be an address that receives data.
    
    # Code for base HTML / CSS /JS
    

# index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>WebRTC Video Chat App</title>
    <link rel="stylesheet" type="text/css" media="screen" href="main.css">
</head>
<body>
    <div id="videos">
        <video class="video-player" id="user-1" autoplay playsinline></video>
        <video class="video-player" id="user-2" autoplay playsinline></video>
    </div>  
</body>
<script src="main.js"></script>
</html>
```

# main.css

```css
#videos{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:2em;
}

.video-player{
    background-color: black;
    width: 100%;
    height: 300px;
}
```

# main.js

```jsx
let localStream; // our camera
let remoteStream; // other users

let init = async () => {
    // ask for permission to use camera for audio/video chat.
    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false}) // Request permission to our camera/mic
    document.getElementById('user-1').srcObject = localStream;
}

init();
```

What you will see in the app. 

![Untitled](WebRTC%20JS%20Web%20App%20d5bedffe70624207ae1aa5ae7af10126/Untitled.png)

# Connecting two peers together

- Create  RTCPeerConnection object to have access to the built-in methods.
    - The RTCPeerConnection interface represents the connection between a local and remote peer.  - [https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection)

```jsx
peerConnection = new RTCPeerConnection();
```

- Set up the remote steam for the other users by creating a new MediaSteam object. Afterward pass it to the DOM.
    - The mediastream interface represents a stream of media content. A stream consists of several tracks, such as video or audio tracks. Each track is specified as an instance of MediaSteamTrack. - [https://developer.mozilla.org/en-US/docs/Web/API/MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)
    
    ```jsx
    // set up the remote streams
        remoteStream = new MediaStream()
        document.getElementById('user-2').srcObject = remoteStream; // have the stream ready before the user accepts the offer.
    ```
    
- Then we create an offer to send to the other users
    - The createOffer method initiates the offer to start the connection of an RTC connection. The return value is a promise so needs to be used with await call.
    - setLocalDescription method changes the local description associated with the connection.
    
    ```jsx
    // create the offer
        let offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer)
    ```
    

# Set up a stun server

## What is a stun server?

The STUN server enables clients to find out their public IP address, NAT type, and the Internet-facing port associated by the NAT device with a particular local port. This information is used to set up a UDP communication session between the client and the VoIP provider to establish a call.

- Create a stun server object with google stun server found online

```jsx
// create a stun server object
const servers = {
    iceServer:[
        {
            urls:['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
        }

    ]
}
```

- Pass the server object into the RTCPeerConnection method

```jsx
peerConnection = new RTCPeerConnection(servers)
```

- We want to get our local tracks(audio and video data) and add them to connection so the remote peer can see them.
    - getTracks() - returns a sequence that represents all the media stream tracks in this stream track set.
    - addTrack() - adds a new media track to the set of tracks that will be transmitted to the other peer.
    
    ```jsx
    // get local tracks and add them to the connection so the remote peer can get them
        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream)
        });
    ```
    
- See when the other users is adding their tracks as well
    - Create an event that listens when we add a track then when we see there is a track we add the track to the stream.
    
    ```jsx
    // add the other users track
        peerConnection.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track)
            })
        }
    ```
    
    - generate ice candidates with an async that will grab the candidiates.
        - onIicecandidate promise is a async call.
        
        ```jsx
        // generate ice candidates 
            peerConnection.onicecandidate = async (event)  => {
                if(event.candidate){
                    console.log('new ice candidate:',event.candidate);
                }
            }
        ```
        
    
    # Use a third party software for signaling
    
    # {App in progress }