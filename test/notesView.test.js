/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesModel = require('../lib/notesModel');
const NotesView = require('../lib/notesView');
 
describe('Notes view', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('../index.html');
  });

  it('displays two notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const firstNote = 'Funny note'
    const secondNote = 'An even funnier note'
    model.addNote(firstNote);
    model.addNote(secondNote);
    view.displayNotes();
    expect(document.querySelectorAll('div.note')[0].innerText).toContain(firstNote);
    expect(document.querySelectorAll('div.note')[1].innerText).toContain(secondNote);
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
    expect(document.querySelectorAll('div.note')[0].innerText).toContain(firstNote);
    expect(document.querySelectorAll('div.note')[1].innerText).toContain(secondNote);
    expect(document.querySelectorAll('div.note').length).toEqual(2);

    // adding a new Note and displaying again
    const thirdNote = 'this is the funniest note'
    model.addNote(thirdNote);
    view.displayNotes();
    expect(document.querySelectorAll('div.note')[0].innerText).toContain(firstNote);
    expect(document.querySelectorAll('div.note')[1].innerText).toContain(secondNote);
    expect(document.querySelectorAll('div.note')[2].innerText).toContain(thirdNote);
    expect(document.querySelectorAll('div.note').length).toEqual(3);
  });

  it('adds a new note and displays it on page', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const input = document.querySelector('#add-note-input');
    const button = document.querySelector('#add-note-button')

    const noteValue = 'Buy milk'
    input.value = noteValue;
    button.click();
    expect(document.querySelectorAll('div.note')[0].innerText).toEqual(noteValue);
    expect(document.querySelector('#add-note-input').value).toEqual('');
  });
});