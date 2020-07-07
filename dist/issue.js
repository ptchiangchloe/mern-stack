"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true
};
var issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required'
}; // check all the request body's each property's value has correct data type.
// dates have to be proper dates
// data relationship validation
// such as completion date that cannot be lesser than the created or current date. 
// introduce front end validations for more instant user-friendly error messages.

function validateIssue(issue) {
  for (var field in issueFieldType) {
    var type = issueFieldType[field];

    if (!type) {
      delete issue[field];
    } else if (type === 'required' && !issue[field]) {
      return "".concat(field, " is required .");
    }
  }

  if (!validIssueStatus[issue.status]) {
    return "".concat(issue.status, " is not a valid status.");
  }

  return null;
} // APIs are all about intuitiveness and predictability. 
// REST gives you a framework for how to think about the structure APIs.
// how to implement and consume APIs. 
// Representational state trasfer is a software archietectural style that defines a set of constraints to be used for 
// creating Web services.


var _default = {
  validateIssue: validateIssue
};
exports["default"] = _default;
//# sourceMappingURL=issue.js.map