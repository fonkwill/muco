

class MucoService{
    constructor(json) {
        if (json)
            this.fromJson(json)
    }
    fromJson(json){
        this.zone_id = json.zone_id
    }
    zone_id = "";
    active_group;
    active_clients = [];

    getAvailableGroups(){
        return []
    }
    
    getActiveGroup(){
        return this.active_group;
    }

    setActiveGroup(group){
        this.active_group = group
    }

    getAvailableClients(){
        return [];
    }

    getActiveClients(){
        return active_clients;
    }

    setActiveClients(active_clients){
        this.active_clients = active_clients
    }

    setVolumeForGroup(group_id, volume){

    }

    getVolumeForGroup(group_id){
        return ""
    }

    setVolumeForClient(client_id, volume){

    }

    getVolumeForClient(client_id) {
        return "";
    }

    
}