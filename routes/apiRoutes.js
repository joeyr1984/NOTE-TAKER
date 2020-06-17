const path = require("path");
const noteData = require("../db/db.json");
const fs = require("fs");


module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });
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
};
