const config = require("./config.js");
const SnapControl = require("./snapcontrol.js");
let snapcontroller = new SnapControl(config.baseUrl);

function getClients(){
    
    var msg = '{"id": 1, "jsonrpc": "2.0", "method": "Plugin.Stream.Player.Control", "params": {"id": "Spotify", "command": "play", "params": {}}}'
    snapcontroller.connection.send(msg)
    return snapcontroller.server.streams
}

module.exports = { getClients }