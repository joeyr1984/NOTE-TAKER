const path = require("path");
const noteData = require("../db/db.json");
const fs = require("fs");


module.exports = function (app) {
    //get request to get all notes
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });
    //this to save a note
    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        newNote.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        noteData.push(newNote);
        let json = JSON.stringify(noteData);


        fs.writeFile(path.join(__dirname, "../db/db.json"), json, "utf8", (err) => {
            if (err) {
                throw err;
            }
        });
        res.json(req.body);
    });
    //this is to delete note via id
    app.delete("/api/notes/:id", function (req, res) {
        let noteID = req.params.id;
        for (let index = 0; index < noteData.length; index++) {
            const element = noteData[index];
            if (element.id === noteID){
                noteData.splice(index, 1);
                break;
            };
        }
        let json = JSON.stringify(noteData);


        fs.writeFile(path.join(__dirname, "../db/db.json"), json, "utf8", (err) => {
            if (err) {
                throw err;
            }
        });
        res.json(noteData);
    });
};
