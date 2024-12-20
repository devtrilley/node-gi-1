const { log } = require("console");
const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const editNote = (title, body) => {
  // Load in notes array of objects using loadNotes()
  const notes = loadNotes();

  // notes.find() returns note object in notes array
  const noteToChange = notes.find((note) => {
    return note.title === title;
  });

  if (noteToChange) {
    // Change the found notes body to be the same as "body" command line arg
    noteToChange.body = body;
    saveNotes(notes); // Updates notes
    console.log(chalk.bgGreen(`${title} has been edited!`)); // Log results with chalk
  } else {
    console.log(chalk.bgRed(`No note with the title: "${title}"`)); // Log error with chalk
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => {
    return note.title !== title;
  });

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.white.bgMagenta("Your Notes"));

  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes();

  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.white.bgBlue.italic(title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
  editNote: editNote,
};
