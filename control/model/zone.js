class Zone{
    constructor(json) {
        if (json)
            this.fromJson(json)
    }
    fromJson(json){
        this.id = json.id
        this.name = json.name
    }
    name = "";
    id;
}

module.exports = Zone