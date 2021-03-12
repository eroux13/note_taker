// API Routes
// Require fs for reading html and writing json
const fs = require("fs");
// Require path for express
const path = require("path");
// Require provided json file
const noteData = require("./../db/db.json");

module.exports = (app) => {


    app.get("/api/notes", (req, res) => {
        let notes = fs.readFileSync(path.join(__dirname, "./../db/db.json"), "utf8");
        notes = JSON.parse(notes);
        res.json(notes)
    });

    app.post("/api/notes", (req, res) => {
        let notes = fs.readFileSync(path.join(__dirname, "./../db/db.json"), "utf8");
        notes = JSON.parse(notes);
        let noteID = noteData.length;
        let newNote = {
            id: noteID,
            title: req.body.title,
            text: req.body.text
        };
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, "./../db/db.json"), JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
        });
        res.json(newNote);
        return console.log(`New note added: ${newNote.title}`)
    })
}