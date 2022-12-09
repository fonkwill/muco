const WebSocket = require('websocket').w3cwebsocket;
const conf = require("../config/server")

class SnapserverService{
    constructor(){
        this.snapControl = new SnapControl(conf.snapcast_url)
    }

    getAllGroups(){
        
        console.log(this.snapControl.server)
        return this.snapControl.server.groups

    }
    snapControl;
}

"use strict";
class Host {
    constructor(json) {
        this.fromJson(json);
    }
    fromJson(json) {
        this.arch = json.arch;
        this.ip = json.ip;
        this.mac = json.mac;
        this.name = json.name;
        this.os = json.os;
    }
    arch = "";
    ip = "";
    mac = "";
    name = "";
    os = "";
}
class Client {
    constructor(json) {
        this.fromJson(json);
    }
    fromJson(json) {
        this.id = json.id;
        this.host = new Host(json.host);
        let jsnapclient = json.snapclient;
        this.snapclient = { name: jsnapclient.name, protocolVersion: jsnapclient.protocolVersion, version: jsnapclient.version };
        let jconfig = json.config;
        this.config = { instance: jconfig.instance, latency: jconfig.latency, name: jconfig.name, volume: { muted: jconfig.volume.muted, percent: jconfig.volume.percent } };
        this.lastSeen = { sec: json.lastSeen.sec, usec: json.lastSeen.usec };
        this.connected = Boolean(json.connected);
    }
    id = "";
    host;
    snapclient;
    config;
    lastSeen;
    connected = false;
}
class Group {
    constructor(json) {
        this.fromJson(json);
    }
    fromJson(json) {
        this.name = json.name;
        this.id = json.id;
        this.stream_id = json.stream_id;
        this.muted = Boolean(json.muted);
        for (let client of json.clients)
            this.clients.push(new Client(client));
    }
    name = "";
    id = "";
    stream_id = "";
    muted = false;
    clients = [];
    getClient(id) {
        for (let client of this.clients) {
            if (client.id == id)
                return client;
        }
        return null;
    }
}
class Metadata {
    constructor(json) {
        this.fromJson(json);
    }
    fromJson(json) {
        this.title = json.title;
        this.artist = json.artist;
        this.album = json.album;
        this.artUrl = json.artUrl;
        this.duration = json.duration;
    }
    title;
    artist;
    album;
    artUrl;
    duration;
}
class Properties {
    constructor(json) {
        this.fromJson(json);
    }
    fromJson(json) {
        this.loopStatus = json.loopStatus;
        this.shuffle = json.shuffle;
        this.volume = json.volume;
        this.rate = json.rate;
        this.playbackStatus = json.playbackStatus;
        this.position = json.position;
        this.minimumRate = json.minimumRate;
        this.maximumRate = json.maximumRate;
        this.canGoNext = Boolean(json.canGoNext);
        this.canGoPrevious = Boolean(json.canGoPrevious);
        this.canPlay = Boolean(json.canPlay);
        this.canPause = Boolean(json.canPause);
        this.canSeek = Boolean(json.canSeek);
        this.canControl = Boolean(json.canControl);
        if (json.metadata != undefined) {
            this.metadata = new Metadata(json.metadata);
        }
        else {
            this.metadata = new Metadata({});
        }
    }
    loopStatus;
    shuffle;
    volume;
    rate;
    playbackStatus;
    position;
    minimumRate;
    maximumRate;
    canGoNext = false;
    canGoPrevious = false;
    canPlay = false;
    canPause = false;
    canSeek = false;
    canControl = false;
    metadata;
}
class Stream {
    constructor(json) {
        this.fromJson(json);
    }
    fromJson(json) {
        this.id = json.id;
        this.status = json.status;
        if (json.properties != undefined) {
            this.properties = new Properties(json.properties);
        }
        else {
            this.properties = new Properties({});
        }
        let juri = json.uri;
        this.uri = { raw: juri.raw, scheme: juri.scheme, host: juri.host, path: juri.path, fragment: juri.fragment, query: juri.query };
    }
    id = "";
    status = "";
    uri;
    properties;
}
class Server {
    constructor(json) {
        if (json)
            this.fromJson(json);
    }
    fromJson(json) {
        this.groups = [];
        for (let jgroup of json.groups)
            this.groups.push(new Group(jgroup));
        let jsnapserver = json.server.snapserver;
        this.server = { host: new Host(json.server.host), snapserver: { controlProtocolVersion: jsnapserver.controlProtocolVersion, name: jsnapserver.name, protocolVersion: jsnapserver.protocolVersion, version: jsnapserver.version } };
        this.streams = [];
        for (let jstream of json.streams) {
            this.streams.push(new Stream(jstream));
        }
    }
    groups = [];
    server ;
    streams = [];
    getClient(id) {
        for (let group of this.groups) {
            let client = group.getClient(id);
            if (client)
                return client;
        }
        return null;
    }
    getGroup(id) {
        for (let group of this.groups) {
            if (group.id == id)
                return group;
        }
        return null;
    }
    getStream(id) {
        for (let stream of this.streams) {
            if (stream.id == id)
                return stream;
        }
        return null;
    }
}
class SnapControl {
    constructor(baseUrl) {
        this.server = new Server();
        this.baseUrl = baseUrl;
        this.msg_id = 0;
        this.status_req_id = -1;
        this.connect();
        this.state = "";
    }
    connect() {
        this.connection = new WebSocket(this.baseUrl + '/jsonrpc');
        this.connection.onmessage = (msg) => this.onMessage(msg.data);
        this.connection.onopen = () => { this.status_req_id = this.sendRequest('Server.GetStatus'); };
        this.connection.onerror = (ev) => { console.error('error:', ev); };
        this.connection.onclose = () => {
            console.info('connection lost, reconnecting in 1s');
            setTimeout(() => this.connect(), 1000);
        };
    }
    onNotification(notification) {
        let stream;
        switch (notification.method) {
            case 'Client.OnVolumeChanged':
                let client = this.getClient(notification.params.id);
                client.config.volume = notification.params.volume;
                updateGroupVolume(this.getGroupFromClient(client.id));
                return true;
            case 'Client.OnLatencyChanged':
                this.getClient(notification.params.id).config.latency = notification.params.latency;
                return false;
            case 'Client.OnNameChanged':
                this.getClient(notification.params.id).config.name = notification.params.name;
                return true;
            case 'Client.OnConnect':
            case 'Client.OnDisconnect':
                this.getClient(notification.params.client.id).fromJson(notification.params.client);
                return true;
            case 'Group.OnMute':
                this.getGroup(notification.params.id).muted = Boolean(notification.params.mute);
                return true;
            case 'Group.OnStreamChanged':
                this.getGroup(notification.params.id).stream_id = notification.params.stream_id;
                //this.updateProperties(notification.params.stream_id);
                return true;
            case 'Stream.OnUpdate':
                stream = this.getStream(notification.params.id);
                stream.fromJson(notification.params.stream);
                //this.updateProperties(stream.id);
                return true;
            case 'Server.OnUpdate':
                this.server.fromJson(notification.params.server);
                return true;
            case 'Stream.OnProperties':
                stream = this.getStream(notification.params.id);
                stream.properties.fromJson(notification.params.properties);
            default:
                return false;
        }
    }
    getClient(client_id) {
        let client = this.server.getClient(client_id);
        if (client == null) {
            throw new Error(`client ${client_id} was null`);
        }
        return client;
    }
    getGroup(group_id) {
        let group = this.server.getGroup(group_id);
        if (group == null) {
            throw new Error(`group ${group_id} was null`);
        }
        return group;
    }
    getGroupVolume(group, online) {
        if (group.clients.length == 0)
            return 0;
        let group_vol = 0;
        let client_count = 0;
        for (let client of group.clients) {
            if (online && !client.connected)
                continue;
            group_vol += client.config.volume.percent;
            ++client_count;
        }
        if (client_count == 0)
            return 0;
        return group_vol / client_count;
    }
    getGroupFromClient(client_id) {
        for (let group of this.server.groups)
            for (let client of group.clients)
                if (client.id == client_id)
                    return group;
        throw new Error(`group for client ${client_id} was null`);
    }
    getStreamFromClient(client_id) {
        let group = this.getGroupFromClient(client_id);
        return this.getStream(group.stream_id);
    }
    getStream(stream_id) {
        let stream = this.server.getStream(stream_id);
        if (stream == null) {
            throw new Error(`stream ${stream_id} was null`);
        }
        return stream;
    }
    setVolume(client_id, percent, mute) {
        percent = Math.max(0, Math.min(100, percent));
        let client = this.getClient(client_id);
        client.config.volume.percent = percent;
        if (mute != undefined)
            client.config.volume.muted = mute;
        this.sendRequest('Client.SetVolume', { id: client_id, volume: { muted: client.config.volume.muted, percent: client.config.volume.percent } });
    }
    setClientName(client_id, name) {
        let client = this.getClient(client_id);
        let current_name = (client.config.name != "") ? client.config.name : client.host.name;
        if (name != current_name) {
            this.sendRequest('Client.SetName', { id: client_id, name: name });
            client.config.name = name;
        }
    }
    setClientLatency(client_id, latency) {
        let client = this.getClient(client_id);
        let current_latency = client.config.latency;
        if (latency != current_latency) {
            this.sendRequest('Client.SetLatency', { id: client_id, latency: latency });
            client.config.latency = latency;
        }
    }
    deleteClient(client_id) {
        this.sendRequest('Server.DeleteClient', { id: client_id });
        this.server.groups.forEach((g, gi) => {
            g.clients.forEach((c, ci) => {
                if (c.id == client_id) {
                    this.server.groups[gi].clients.splice(ci, 1);
                }
            });
        });
        this.server.groups.forEach((g, gi) => {
            if (g.clients.length == 0) {
                this.server.groups.splice(gi, 1);
            }
        });
    }
    setStream(group_id, stream_id) {
        this.getGroup(group_id).stream_id = stream_id;
        this.sendRequest('Group.SetStream', { id: group_id, stream_id: stream_id });
    }
    setClients(group_id, clients) {
        this.status_req_id = this.sendRequest('Group.SetClients', { id: group_id, clients: clients });
    }
    muteGroup(group_id, mute) {
        this.getGroup(group_id).muted = mute;
        this.sendRequest('Group.SetMute', { id: group_id, mute: mute });
    }
    sendRequest(method, params) {
        let msg = {
            id: ++this.msg_id,
            jsonrpc: '2.0',
            method: method
        };
        if (params)
            msg.params = params;
        let msgJson = JSON.stringify(msg);
        console.log("Sending: " + msgJson);
        this.connection.send(msgJson);
        return this.msg_id;
    }
    onMessage(msg) {
        let json_msg = JSON.parse(msg);
        let is_response = (json_msg.id != undefined);
        console.log("Received " + (is_response ? "response" : "notification") + ", json: " + JSON.stringify(json_msg));
        if (is_response) {
            if (json_msg.id == this.status_req_id) {
                this.server = new Server(json_msg.result.server);
            }
        }
        else {
            let refresh = false;
            if (Array.isArray(json_msg)) {
                for (let notification of json_msg) {
                    refresh = this.onNotification(notification) || refresh;
                }
            }
            else {
                refresh = this.onNotification(json_msg);
            }
            // TODO: don't update everything, but only the changed, 
            // e.g. update the values for the volume sliders
            //if (refresh)
             //   show();
        }
    }
    baseUrl;
    connection;
    server;
    msg_id;
    status_req_id;
}

module.exports = SnapserverService