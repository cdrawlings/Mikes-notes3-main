const fs = require("fs");
const {v4:uuidv4} = require("uuid");

let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
         res.json(data);
     });


    app.get("/api/notes/:id", function(req, res) {
        res.json(data[Number(req.params.id)]);
    });


    app.post("/api/notes", function(req, res) {
        console.log(req.body);

        let newNote = req.body;

        let id = uuidv4();
        console.log(id);
        newNote.id = id;

        data.push(newNote);

        try{
            fs.writeFileSync("./db/db.json", JSON.stringify(data))
        } catch (error) {
                console.error(error);
        }

        res.json(data);
    });

    app.delete("/api/notes/:id", function(req, res) {

        let id = req.params.id;

        for (let i = 0; i < data.length; i++) {
            if(id === data[i].id) {
                data.splice(i ,1)
                console.log(data)

                let newData = JSON.stringify(data);

                fs.writeFileSync("./db/noteContents.json", newData)
            }
        }
        res.json(data);
    });

}