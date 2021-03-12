// API Routes
// Require fs for reading html and writing json
const fs = require("fs");
// Require path for express
const path = require("path");
// Require uniqid for unique id for deleting notes
const uniqid = require("uniqid");
// Require provided json file
const noteData = require("./../db/db.json");

module.exports = (app) => {
    // Retrieve saved notes
    app.get("/api/notes", (req, res) => {
        let notes = fs.readFileSync(path.join(__dirname, "./../db/db.json"), "utf8");
        notes = JSON.parse(notes);
        res.json(notes)
    });
    // Crete new note
    app.post("/api/notes", (req, res) => {
        let notes = fs.readFileSync(path.join(__dirname, "./../db/db.json"), "utf8");
        notes = JSON.parse(notes);
        // Create a unique ID for each note
        let noteID = uniqid("id:");
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
    // Delete selected note
    // Work in progress
    app.delete("/api/notes/:id", (req, res) => {
        let notes = fs.readFileSync(path.join(__dirname, "./../db/db.json"), "utf8");
        notes = JSON.parse(notes);
        const deleteID = req.params.id;
        const deleteNote = notes.map(function (note) { return note.id }).indexOf(deleteID);
        notes.splice(deleteNote, 1);
        fs.writeFile(path.join(__dirname, "./../db/db.json"), JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
        });
        res.json(notes);
        return console.log(`Deleted note: ${deleteID}`);
    })
}