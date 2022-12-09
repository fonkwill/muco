class Group{
    constructor(json) {
        if (json)
            this.fromJson(json)
    }
    fromJson(json){
        this.id = json.id
        this.name = json.name
        this.stream_id = json.stream_id
        this.zone_id = json.zone_id
    }
    name = "";
    id;
    stream_id = -1;
    zone_id;
}