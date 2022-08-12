const Api = require('../notesApi');

require('jest-fetch-mock').enableFetchMocks()

describe('API class', () => {
  it('loads data from the webpage', () => {
    const api = new Api();

    fetch.mockResponseOnce(JSON.stringify("test"));

    api.loadNotes((returnDataFromApi) => {
      expect(returnDataFromApi).toBe("test");
    });
  });

  it('uploads notes to the website', () => {
    const api = new Api();

    fetch.mockResponseOnce(JSON.stringify("test"));

    api.createNote((returnDataFromApi) => {
      expect(returnDataFromApi).toBe("test");
    });
  });
});
