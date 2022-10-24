

//let snapstream = new SnapStream('ws://192.168.0.96:1780');

var activated = false

function activateSpeaker() {


    let snapstreamMusic = new SnapStream(config.baseUrl);
    var streamMusicMac = "00:00:00:00:00:01";
    snapstreamMusic.setClientParams('Music Speaker', streamMusicMac)
    let snapstreamShortCut = new SnapStream(config.baseUrl);
    var streamShortCutMac =  "00:00:00:00:00:02"
    snapstreamShortCut.setClientParams('ShortCutSongs Speaker', streamShortCutMac)

    let snapcontroller = new SnapControl(config.baseUrl);

    
    (async() => {
        console.log("waiting for variable");
        while(snapcontroller.server.groups.length == 0) // define the condition as you like
            await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("variable is defined");
        setSteamsAndGroups();
    })();

}

function setSteamsAndGroups(){
    console.log(snapcontroller.server.groups)
    console.log(snapcontroller.server.streams)

    var snapStreamMusicID = SnapStream.getClientId(streamMusicMac);
    var snapStreamShortCutID = SnapStream.getClientId(streamShortCutMac);

    var musicGroup;
    var shortCutGroup

    for (let group of snapcontroller.server.groups) {
        for (let client of group.clients) {
            if (client && client.connected == false) {
                snapcontroller.deleteClient(client.id);
            }
            if (client.id == snapStreamMusicID) {
                musicGroup = group;
            }
            if (client.id == snapStreamShortCutID) {
                shortCutGroup = group;
            }
        }
    }

    var musicStream = snapcontroller.server.getStream("Music");
    var schortCutStream = snapcontroller.server.getStream("ShortCutSongs"); 


    console.log(musicStream + musicGroup)
    if (musicStream && musicGroup) {
        snapcontroller.setStream(musicGroup.id, musicStream.id);
    }
    console.log(schortCutStream + shortCutGroup)
    if (schortCutStream && shortCutGroup) {
        snapcontroller.setStream(shortCutGroup.id, schortCutStream.id);
    }
    activated = true
};


// let url = 'https://speaker_skplay.public.onsite.fonkwill.com/config';
// let username = 'skplay';
// let password = 'S!peaker';

// let headers = new Headers();

// //headers.append('Content-Type', 'text/json');
// headers.append('Authorization', 'Basic' + btoa(username + ":" + password));

// fetch(url, {method:'GET',
//         headers: headers,
//         //credentials: 'user:passwd'
//        })
// .then(console.log("authenticated"))
// .then((res) => console.log(res));
// //.done();

