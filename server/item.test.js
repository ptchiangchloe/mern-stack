import { validateItem, itemFieldType } from './item'

test('validate item to be null', () => {
    const item = {
        brand: 'versace'
    }

    expect(validateItem(item)).toBeNull()
})