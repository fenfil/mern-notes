const router = require('express').Router();
const apiDebug = require('debug')('app:api:notes');
const consoleProbe = require('console-probe');

const Note = require('../schemas/Note');

router.use((req, res, next) => {
  let d = new Date();
  apiDebug(`Request: ${req.originalUrl}, Time: ${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
  next();
});

// Get all Notes

router.get('/', (req, res) => {
  Note.find()
    .sort({date: -1})
    .then(notes => {
      res.json(notes)
    })
    .catch(err => console.log(err));
});

// Selete Note by id

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then(note => {
      res.json({ success: true });
    })
    .catch(err => {
      res.json({ success: false });
      apiDebug(err)
    });
});

// Add new Note

router.post('/', (req, res) => {
  const note = new Note({
    title: req.body.title,
    body: req.body.body
  });
  note.save()
    .then((note) => {
      res.json({
        success: true,
        note: note
      });
    })
    .catch(err => {
      res.json({ success: false });
      apiDebug(err);
    });
});

module.exports = router;