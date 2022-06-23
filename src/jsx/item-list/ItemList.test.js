import { loadItemData } from "./ItemList";

it("loads item data from server api", async () => {
    const apiURL = 'http://localhost:4000/api/items'
    const data = await loadItemData(apiURL)
    console.log(data)

    expect(data.length).not.toBe(0)

    expect(data[0]['brand'].toBe('Hurley'))
})