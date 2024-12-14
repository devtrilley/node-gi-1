const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

// Customize yarg version
yargs.version("1.1.0");

// Add, remove, read, and list notes

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Title of note to delete",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.removeNote(argv.title);
  },
});

// Create a lists command
yargs.command({
  command: "list",
  describe: "Lists out all notes.",
  handler: () => {
    notes.listNotes();
  },
});

// Create a read command
yargs.command({
  command: "read",
  describe: "Reading the note.",
  builder: {
    title: {
      describe: "Title of note to read",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  },
});

yargs.parse();
