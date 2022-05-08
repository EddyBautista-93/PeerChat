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

What you will see in the app when ran 

![Untitled](WebRTC%20JS%20Web%20App%20d5bedffe70624207ae1aa5ae7af10126/Untitled.png)