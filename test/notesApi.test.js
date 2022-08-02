const Api = require('../lib/notesApi');

require('jest-fetch-mock').enableFetchMocks()

describe('API class', () => {
  it('class the fetch function and loads the data', () => {
    const api = new Api();

    fetch.mockResponseOnce(JSON.stringify({
      name: "Test",
      id: 123
    }));

    api.loadNotes((returnDataFromApi) => {
      expect(returnDataFromApi.name).toBe("Test");
      expect(returnDataFromApi.id).toBe(123);
    });
  });
});
