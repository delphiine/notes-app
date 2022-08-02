const NotesModel = require("../lib/notesModel")

describe("NotesModel", () => {
  it("should return an empty array",() => {
    const model = new NotesModel();
    expect(model.getNotes()).toEqual([]); 
  })

  it("adds items and returns an updated list", () => {
    const model = new NotesModel();
    model.addNote("Buy milk");
    model.addNote("Go to the gym");
    expect(model.getNotes()).toEqual(["Buy milk", "Go to the gym"]);
  })

  it("removes all items from the list", () => {
    const model = new NotesModel();
    model.addNote("Buy milk");
    model.addNote("Go to the gym");
    model.reset();
    expect(model.getNotes()).toEqual([]);
  })
})