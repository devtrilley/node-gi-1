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

// HERE IS THE ADDED COMMAND THAT THE CHALLENGE CALLS FOR
// Create EDIT command
yargs.command({
  command: "edit", // name of command
  describe: "Edit a note", // description of what command does
  // Where we set up params for edit's command line args
  builder: {
    // We need to grab the title of the note to know which one to edit
    title: {
      describe: "Title of note to edit",
      demandOption: true, // require this argument
      type: "string",
    },
    // This is where we put the value of what we want in the note now
    body: {
      describe: "New text for the notes",
      demandOption: true, // require this argument
      type: "string",
    },
  },
  handler: (argv) => {
    notes.editNote(argv.title, argv.body);
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
