import { loadItemData } from "./ItemList";
import fetch from 'node-fetch';

// Test fetch from the local server api 
it("loads item data from server api", async () => {
    const apiURL = 'http://localhost:4000/api/items'

    const result = await fetch(apiURL);
    const data = await result.json();

    expect(data.records.length).not.toBe(0)

    const testBrand = data.records[0].brand
    expect(testBrand).toBe('Hurley')
})

global.fetch = jest.fn(() => {
    Promise.resolve({
        json: () => Promise.resolve({

        })
    })
})


