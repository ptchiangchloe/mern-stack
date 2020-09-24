const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true,
};

const issueFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
};

const cardigan = {
    brand: 'Comme des garcons',
    category: 'top',
    color: 'black',
    note: 'This is a cardigan I bought in Japan last year',
    price: 340,
    purchaseDate: '2019-04-07',
}

const itemFieldType = {
    brand: 'required',
    category: 'required',
    color: 'required',
    // id => mongoDB insertOne will automatically create an id property.
    note: 'optional',
    price: 'required',
    purchaseDate: 'required',
}

// check all the request body's each property's value has correct data type.
// dates have to be proper dates
// data relationship validation
// such as completion date that cannot be lesser than the created or current date.
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

function cleanupItem(issue) {
    const cleanedUpIssue = {};
    Object.keys(issue).forEach((field) => {
        // we use this condition to filter out all the unwanted properties to prepare 
        // the object for database injection
        if (itemFieldType[field]) cleanedUpIssue[field] = issue[field];
    });
    return cleanedUpIssue;
}

function convertIssue(issue) {
    if (issue.created) issue.created = new Date(issue.created);
    if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
    return cleanupIssue(issue);
}

export default { validateItem, convertIssue, cleanupItem };
