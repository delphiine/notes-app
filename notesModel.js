class NotesModel {
  constructor() {
    this.list = [];
  }

  setNotes(notes) {
    this.notes = notes
  }

  getNotes() {
    return this.list;
  }

  addNote(note) {
    this.list.push(note);
  }

  reset() {
    this.list = [];
  }
}

module.exports = NotesModel;