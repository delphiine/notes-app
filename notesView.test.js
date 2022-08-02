/**
 * @jest-environment jsdom
 */

 const fs = require('fs');
 const NotesModel = require('./notesModel');
 const NotesView = require('./notesView'); 
 
 describe('Notes view', () => {
   it('displays two notes', () => {
     document.body.innerHTML = fs.readFileSync('./index.html');
     const model = new NotesModel();
     const view = new NotesView(model);

     model.addNote('Funny note');
     model.addNote('An even funnier note');
     view.displayNotes();
     expect(view.displayNotes()).toContain('Funny note');
     expect(document.querySelectorAll('div.note').length).toEqual(2);
   });

   it('adds a new note and displays it on page', () => {
    document.body.innerHTML = fs.readFileSync('./index.html')
    const model = new NotesModel();
    const view = new NotesView();

    const input = document.querySelector('#add-note-input');
    const button = document.querySelector('#add-note-button')

    input.value = 'Buy milk';
    button.click();
    expect(document.querySelectorAll('div.note')[0].innerText).toEqual('Buy milk');
   });
 });