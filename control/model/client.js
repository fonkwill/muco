class Client{
    constructor(json) {
        if (json)
            this.fromJson(json)
    }
    fromJson(json){
        this.id = json.id
        this.name = json.name
        this.group_id = json.group_id
        this.zone_id = json.zone_id
    }
    name = "";
    id;
    group_id = -1;
    zone_id;
}