const config = require("./config.js");



function init(){

    let snapcontrol = new SnapControl(config.baseUrl);
    let server = snapcontrol.server


    for (let jgroup of server.groups) {
        let group = new Group(jgroup);
        console.log(group.name)
    }

}

function getClients(){
    
    //var msg = '{"id": 1, "jsonrpc": "2.0", "method": "Plugin.Stream.Player.Control", "params": {"id": "Spotify", "command": "play", "params": {}}}'
    //snapcontroller.connection.send(msg)
    
    init();
    return snapcontroller.server.streams
}

module.exports = { getClients }