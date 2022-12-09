const Zone = require('../model/zone');
const SnapserverService = require('./snapserverService');


class AdminService{
    constructor() {
       
    }
    fromJson(json){
    }


    getZones(){
        var a = new Zone()
        a.name = "Haus"
        a.id = "house"
        var b = new Zone()
        b.name = "Garten"
        b.id = "garden"

        var r = []
        r.push(a)
        r.push(b)
    
        return r
    }

    getGroups(){
        var snapserver = new SnapserverService()
        return snapserver.getAllGroups();
    }


    getClients(){
        return []
    }

    addZone(){

    }

    removeZone(){

    }

    addGroup(){

    }

    removeGroup(){

    }

    addGroupToZone(group_id, zone_id){

    }

    removeGroupFromZone(group_id, zone_id){

    }

    addClientToZone(client_id, zone_id){

    }

    removeClientFromZone(client_id, zone_id){
        
    }
    
}

module.exports =  AdminService 