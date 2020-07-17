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

// check all the request body's each property's value has correct data type.
// dates have to be proper dates
// data relationship validation
// such as completion date that cannot be lesser than the created or current date.
// introduce front end validations for more instant user-friendly error messages.

function validateIssue(issue) {
    const errors = [];
    Object.keys(issueFieldType).forEach(
        (field) => {
            if (issueFieldType[field] === 'required' && !issue[field]) {
                errors.push(`Missing mandatory field: ${field}`);
            }
        },
    );

    if (!validIssueStatus[issue.status]) {
        errors.push(`${issue.status} is not a valid status.`);
    }

    return (errors.length ? errors.join('; ') : null);
}

// APIs are all about intuitiveness and predictability.
// REST gives you a framework for how to think about the structure APIs.
// how to implement and consume APIs.

// Representational state trasfer is a software archietectural style that defines
// a set of constraints to be used for creating Web services.

function cleanupIssue(issue) {
    const cleanedUpIssue = {};
    Object.keys(issue).forEach((field) => {
        if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
    });
    return cleanedUpIssue;
}

function convertIssue(issue) {
    if (issue.created) issue.created = new Date(issue.created);
    if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
    return cleanupIssue(issue);
}

export default { validateIssue, convertIssue, cleanupIssue };
