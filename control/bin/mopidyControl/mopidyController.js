const Mopidy = require("mopidy");

const talkOverVolume = 50;
var lastVolume = -1;

var mopidyScs = new Mopidy({
    webSocketUrl: "ws://192.168.0.97:6691/mopidy/ws"
})

var mopidyMusic = new Mopidy({
    webSocketUrl: "ws://192.168.0.97:6691/mopidy/ws"
})



function talkOver() {
    
    var volume = mopidyMusic.mixer.getVolume()
    volume.then( (volume) => (lastVolume = volume, null));
    mopidyMusic.mixer.setVolume(talkOverVolume)
}

function resetTalkOver() {
    console.log(lastVolume)
    if ( lastVolume != -1) {
        mopidyMusic.mixer.setVolume(lastVolume)
    }
    lastVolume = -1;
}

function playMusic() {
    mopidyMusic.playback.play()
}

function pauseMusic() {
    mopidyMusic.playback.pause()
}

function playOnceScs(id) {
    mopidyScs.tracklist.clear()
    var track = "http://192.168.0.96:32768/api/public/dl/" + id
    mopidyScs.tracklist.add(null, null, [ track ])
    mopidyScs.playback.play()
}

function stopScs() {
    mopidyScs.playback.stop()
    mopidyScs.tracklist.clear()
}

module.exports = { playOnceScs, stopScs, playMusic, pauseMusic, talkOver, resetTalkOver }
