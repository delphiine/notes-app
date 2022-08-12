/**
 * @jest-environment jsdom
 */

 require('jest-fetch-mock').enableMocks();

const fs = require('fs');
const NotesModel = require('../notesModel');
const NotesView = require('../notesView');
const Api = require('../notesApi');
const NotesApi = require('../notesApi');

describe('Notes view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it('displays two notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const firstNote = 'Funny note'
    const secondNote = 'An even funnier note'
    model.addNote(firstNote);
    model.addNote(secondNote);
    view.displayNotes();
    expect(document.querySelectorAll('div.note')[0].innerText).toEqual(firstNote);
    expect(document.querySelectorAll('div.note')[1].innerText).toEqual(secondNote);
    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it('displays added notes without duplicates', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const firstNote = 'Funny note'
    const secondNote = 'An even funnier note'
    model.addNote(firstNote);
    model.addNote(secondNote);
    view.displayNotes();
    expect(document.querySelectorAll('div.note')[0].innerText).toEqual(firstNote);
    expect(document.querySelectorAll('div.note')[1].innerText).toEqual(secondNote);
    expect(document.querySelectorAll('div.note').length).toEqual(2);

    // adding a new Note and displaying again
    const thirdNote = 'this is the funniest note'
    model.addNote(thirdNote);
    view.displayNotes();
    expect(document.querySelectorAll('div.note')[0].innerText).toEqual(firstNote);
    expect(document.querySelectorAll('div.note')[1].innerText).toEqual(secondNote);
    expect(document.querySelectorAll('div.note')[2].innerText).toEqual(thirdNote);
    expect(document.querySelectorAll('div.note').length).toEqual(3);
  });

  it('adds a new note and displays it on page', () => {
    const model = new NotesModel();
    const api = new NotesApi();
    const view = new NotesView(model, api);

    const input = document.querySelector('#add-note-input');
    const button = document.querySelector('#add-note-button');

    const noteValue = 'Buy milk';
    input.value = noteValue;
    button.click();
    expect(document.querySelectorAll('div.note')[0].innerText).toEqual(noteValue);
    expect(document.querySelector('#add-note-input').value).toEqual('');
  });

  it('Test DisplayNotesFromApi()', () => {
    const model = new NotesModel();
    const api = new Api();
    const view = new NotesView(model, api);
    const note1 = "Test";
    const note2 = "Another test";
    fetch.mockResponseOnce(JSON.stringify([note1, note2]));

    view.displayNotesFromApi(() => {
      expect(document.querySelectorAll('div.note')[0].innerText).toEqual(note1);
      expect(document.querySelectorAll('div.note')[1].innerText).toEqual(note2);
      expect(document.querySelectorAll('div.note').length).toEqual(2);
    });
  });

  it('creates a new note on the server', () => {
    const model = new NotesModel();
    const api = new Api();
    const view = new NotesView(model, api);
    fetch.mockResponseOnce(JSON.stringify(["notes1"]));

    view.addNewNote()
    expect(document.querySelectorAll('div.note')[0].textContent).toEqual("notes1");
    expect(document.querySelectorAll('div.note').length).toEqual(1);
  });
});
