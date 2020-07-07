/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/App.js":
/*!***********************!*\
  !*** ./static/App.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar contentNode = document.getElementById('contents');\n\nvar IssueFilter = function (_React$Component) {\n    _inherits(IssueFilter, _React$Component);\n\n    function IssueFilter() {\n        _classCallCheck(this, IssueFilter);\n\n        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));\n    }\n\n    _createClass(IssueFilter, [{\n        key: 'render',\n        value: function render() {\n            return React.createElement(\n                'div',\n                null,\n                'This is a placeholder for the Issue Filter.'\n            );\n        }\n    }]);\n\n    return IssueFilter;\n}(React.Component);\n\nvar IssueRow = function IssueRow(_ref) {\n    var issue = _ref.issue;\n    return React.createElement(\n        'tr',\n        null,\n        React.createElement(\n            'td',\n            null,\n            issue._id\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.status\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.owner\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.created.toDateString()\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.effort\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.completionDate ? issue.completionDate.toDateString() : ''\n        ),\n        React.createElement(\n            'td',\n            null,\n            issue.title\n        )\n    );\n};\n\nIssueRow.propTypes = {\n    issue: React.PropTypes.object.isRequired\n};\n\nvar IssueTable = function (_React$Component2) {\n    _inherits(IssueTable, _React$Component2);\n\n    function IssueTable() {\n        _classCallCheck(this, IssueTable);\n\n        return _possibleConstructorReturn(this, (IssueTable.__proto__ || Object.getPrototypeOf(IssueTable)).apply(this, arguments));\n    }\n\n    _createClass(IssueTable, [{\n        key: 'render',\n        value: function render() {\n            var borderedStyle = { border: \"1px solid silver\", padding: 6 };\n            return React.createElement(\n                'table',\n                { className: 'bordered-table' },\n                React.createElement(\n                    'thead',\n                    null,\n                    React.createElement(\n                        'tr',\n                        null,\n                        React.createElement(\n                            'th',\n                            null,\n                            'Id'\n                        ),\n                        React.createElement(\n                            'th',\n                            null,\n                            'Status'\n                        ),\n                        React.createElement(\n                            'th',\n                            null,\n                            'Owner'\n                        ),\n                        React.createElement(\n                            'th',\n                            null,\n                            'Created'\n                        ),\n                        React.createElement(\n                            'th',\n                            null,\n                            'Effort'\n                        ),\n                        React.createElement(\n                            'th',\n                            null,\n                            'Completion Date'\n                        ),\n                        React.createElement(\n                            'th',\n                            null,\n                            'Title'\n                        )\n                    )\n                ),\n                React.createElement(\n                    'tbody',\n                    null,\n                    this.props.issues.map(function (issue) {\n                        return React.createElement(IssueRow, { key: issue._id, issue: issue });\n                    })\n                )\n            );\n        }\n    }]);\n\n    return IssueTable;\n}(React.Component);\n\nvar IssueAdd = function (_React$Component3) {\n    _inherits(IssueAdd, _React$Component3);\n\n    function IssueAdd() {\n        _classCallCheck(this, IssueAdd);\n\n        var _this3 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));\n\n        _this3.handleSubmit = _this3.handleSubmit.bind(_this3);\n        return _this3;\n    }\n\n    _createClass(IssueAdd, [{\n        key: 'handleSubmit',\n        value: function handleSubmit(e) {\n            e.preventDefault();\n            var form = document.forms.issueAdd;\n            this.props.createIssue({\n                owner: form.owner.value,\n                title: form.title.value,\n                status: 'New',\n                created: new Date()\n            });\n            // clear the form for the next input\n            form.owner.value = '';\n            form.title.value = '';\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return React.createElement(\n                'div',\n                null,\n                React.createElement(\n                    'form',\n                    { name: 'issueAdd', onSubmit: this.handleSubmit },\n                    React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),\n                    React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),\n                    React.createElement(\n                        'button',\n                        null,\n                        'Add'\n                    )\n                )\n            );\n        }\n    }]);\n\n    return IssueAdd;\n}(React.Component);\n\nvar IssueList = function (_React$Component4) {\n    _inherits(IssueList, _React$Component4);\n\n    function IssueList() {\n        _classCallCheck(this, IssueList);\n\n        var _this4 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));\n\n        _this4.state = { issues: [] };\n        _this4.createIssue = _this4.createIssue.bind(_this4);\n        return _this4;\n    }\n\n    _createClass(IssueList, [{\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            this.loadData();\n        }\n    }, {\n        key: 'loadData',\n        value: function loadData() {\n            var _this5 = this;\n\n            fetch('/api/issues').then(function (response) {\n                if (response.ok) {\n                    response.json().then(function (data) {\n                        console.log('Total count of records: ' + data._metadata.total_count);\n                        data.records.forEach(function (issue) {\n                            issue.created = new Date(issue.created);\n                            if (issue.completionDate) {\n                                issue.completionDate = new Date(issue.completionDate);\n                            }\n                        });\n                        _this5.setState({ issues: data.records });\n                    });\n                } else {\n                    response.json().then(function (error) {\n                        alert(\"Failed to fetch issues:\" + error.message);\n                    });\n                }\n            }).catch(function (err) {\n                console.log(err);\n            });\n        }\n    }, {\n        key: 'createIssue',\n        value: function createIssue(newIssue) {\n            var _this6 = this;\n\n            console.log(newIssue);\n            fetch('/api/issues', {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(newIssue)\n            }).then(function (response) {\n                console.log(response);\n                if (response.ok) {\n                    response.json().then(function (updatedIssue) {\n                        console.log(updatedIssue);\n                        updatedIssue.created = new Date(updatedIssue.created);\n                        if (updatedIssue.completionDate) updatedIssue.completionDate = new Date(updatedIssue.completionDate);\n                        var newIssues = _this6.state.issues.concat(updatedIssue);\n                        _this6.setState({ issues: newIssues });\n                    });\n                } else {\n                    response.json().then(function (error) {\n                        alert(\"Failed to add issues: \" + error.message);\n                    });\n                }\n            }).catch(function (err) {\n                alert(\"Failed in sending data to server: \" + error.message);\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return React.createElement(\n                'div',\n                null,\n                React.createElement(\n                    'h1',\n                    null,\n                    'Issue Tracker'\n                ),\n                React.createElement(IssueFilter, null),\n                React.createElement('hr', null),\n                React.createElement(IssueTable, { issues: this.state.issues }),\n                React.createElement(\n                    'button',\n                    { onClick: this.createTestIssue },\n                    'Add'\n                ),\n                React.createElement('hr', null),\n                React.createElement(IssueAdd, { createIssue: this.createIssue })\n            );\n        }\n    }]);\n\n    return IssueList;\n}(React.Component);\n\nReactDOM.render(React.createElement(IssueList, null), contentNode); // Render the component inside the contentNode\n\n//# sourceURL=webpack:///./static/App.js?");

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi ./static/App.js static/app.bundle.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /Users/han/Desktop/study/mern/static/App.js */\"./static/App.js\");\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'static/app.bundle.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n//# sourceURL=webpack:///multi_./static/App.js_static/app.bundle.js?");

/***/ })

/******/ });