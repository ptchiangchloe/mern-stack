export const itemFieldType = {
    brand: 'required',
    category: 'optional',
    color: 'optional',
    // id => mongoDB insertOne will automatically create an id property.
    note: 'optional',
    price: 'optional',
    purchaseDate: 'optional',
};

// check all the request body's each property's value has correct data type.
// dates have to be proper dates
// data relationship validation
// introduce front end validations for more instant user-friendly error messages.

function validateItem(item) {
    const errors = [];
    Object.keys(itemFieldType).forEach(
        (field) => {
            if (itemFieldType[field] === 'required' && !item[field]) {
                errors.push(`Missing mandatory field: ${field}`);
            }
        },
    );

    return (errors.length ? errors.join('; ') : null);
}

// APIs are all about intuitiveness and predictability.
// REST gives you a framework for how to think about the structure APIs.
// how to implement and consume APIs.

// Representational state trasfer is a software archietectural style that defines
// a set of constraints to be used for creating Web services.

function cleanupItem(item) {
    const cleanedUpItem = {};
    Object.keys(item).forEach((field) => {
        // we use this condition to filter out all the unwanted properties to prepare 
        // the object for database injection
        if (itemFieldType[field]) cleanedUpItem[field] = item[field];
    });
    return cleanedUpItem;
}

function convertIssue(item) {
    return cleanupItem(item);
}

export { validateItem, convertIssue };
