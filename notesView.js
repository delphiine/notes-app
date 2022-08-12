class NotesView {
  constructor(model, api) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
    this.api = api;

    document.querySelector('#add-note-button').addEventListener('click', () => {
      const newNote = document.querySelector('#add-note-input').value;
      this.addNewNote(newNote);
      document.querySelector('#add-note-input').value = '';
    })
  }
  
  displayNotes() {
    const notes = this.model.getNotes();
    document.querySelectorAll('div.note').forEach(note => {
      note.remove()
    })

    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.innerText = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    })
  }

  displayNotesFromApi(callbackTest) {
    this.api.loadNotes((data) => {
      this.model.reset();
      data.forEach(note => {this.model.addNote(note)});
      this.displayNotes();
      if (callbackTest) {
        callbackTest()
      }
    });
  }
  
  addNewNote(note, callbackTest) {
    this.api.createNote(note, (data) => {
      this.model.reset();
      data.forEach(note => {this.model.addNote(note)});
      this.displayNotes();
      if (callbackTest) {
        callbackTest()
      }
    });
  }
}

module.exports = NotesView;
