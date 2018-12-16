const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  body: {type: String, required: true},
  date: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;