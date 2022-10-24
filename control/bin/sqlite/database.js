//var sqlite = require('sqlite')
var sqlite3 = require('sqlite3')
var md5 = require('md5')

const DBSOURCE = "./db/db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE config (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key text, 
            title text,
            desc text,
            value text, 
            CONSTRAINT key_unique UNIQUE (key)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO config (key, title, desc, value) VALUES (?,?,?,?)'
                db.run(insert, ["RADIO_GARDEN","Radio Garden", "Mopidy Instanz für Radio Garden", "radio_garden.com"]);
                db.run(insert, ["RADIO_HOUSE", "Radio House", "Mopidy Instanz für Radio House", "radio_house.com"]);
            
            }
        });  
    }
});

module.exports = db



