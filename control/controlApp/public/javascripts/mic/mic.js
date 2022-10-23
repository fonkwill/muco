navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => { handlerFunction(stream) })


var currBlob;

function handlerFunction(stream) {
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
        audioChunks.push(e.data);
        if (rec.state == "inactive") {
            currBlob = null
            let blob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
            recordedAudio.src = URL.createObjectURL(blob);
            recordedAudio.controls = true;
            recordedAudio.autoplay = true;
            currBlob = blob;
            //sendData(blob)
        }
    }
}
function sendData() { 
    console.log(recordedAudio.src)
    console.log(currBlob)
    //currBlob = new Blob(["This is some important text"],{ type: "text/plain" })
    //currBlob = JSON.stringify(currBlob)
    //obj = {data: "blob1", blob : currBlob}

    data = new FormData();
    data.append('file', currBlob)
    fetch('/mic/post_data', { method:"POST",  body: data }).then(result => console.log(result))


}


function start() {
    console.log('I was clicked')
   
    audioChunks = [];
    rec.start();
}

function stop() {
    console.log("I was clicked")
    rec.stop();
}