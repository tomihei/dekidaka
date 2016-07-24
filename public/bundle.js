/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React, ReactDOM, formbox_1) {
	    "use strict";
	    ReactDOM.render(React.createElement("div", {className: "container"}, React.createElement(formbox_1.FormBox, null)), document.getElementById("example"));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React, lineform_1, IndexDB) {
	    "use strict";
	    class FormBox extends React.Component {
	        constructor() {
	            super();
	            this.onSubmit = this.onSubmit.bind(this);
	            this.db = new IndexDB.LineData();
	            this.db.onWriteEvent = this.yey;
	        }
	        yey() {
	            alert("moi");
	        }
	        onSubmit(data) {
	            this.db.addData(data);
	        }
	        render() {
	            return React.createElement("div", null, React.createElement(lineform_1.LineForm, {change: this.onSubmit}));
	        }
	    }
	    exports.FormBox = FormBox;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React, form_1) {
	    "use strict";
	    class LineForm extends React.Component {
	        constructor() {
	            super();
	            this.state = {
	                data: {
	                    linename: null,
	                    partnum: null,
	                    cicletime: 0,
	                },
	            };
	            this.handleSubmit = this.handleSubmit.bind(this);
	            this.checkValue = this.checkValue.bind(this);
	        }
	        handleSubmit(e) {
	            e.preventDefault();
	            this.props.change(this.state["data"]);
	        }
	        checkValue(type, data) {
	            let kdata = {
	                linename: this.state["data"].linename,
	                partnum: this.state["data"].partnum,
	                cicletime: this.state["data"].cicletime,
	            };
	            switch (type) {
	                case "linename":
	                    kdata.linename = data;
	                    break;
	                case "partnum":
	                    kdata.partnum = data;
	                    break;
	                case "cicletime":
	                    kdata.cicletime = data;
	                    break;
	            }
	            this.setState({
	                data: kdata,
	            });
	        }
	        render() {
	            return React.createElement("form", {onSubmit: this.handleSubmit}, React.createElement(form_1.Form, {type: "text", placeholder: "ライン名", name: "linename", checkValue: this.checkValue}), React.createElement(form_1.Form, {type: "text", placeholder: "品番", name: "partnum", checkValue: this.checkValue}), React.createElement(form_1.Form, {type: "number", placeholder: "サイクルタイム", name: "cicletime", checkValue: this.checkValue}), React.createElement("input", {type: "submit", className: "btn btn-default btn-block", value: "登録"}));
	        }
	    }
	    exports.LineForm = LineForm;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, React) {
	    "use strict";
	    class Form extends React.Component {
	        constructor() {
	            super();
	            this.handleChange = this.handleChange.bind(this);
	        }
	        handleChange(event) {
	            this.props.checkValue(this.props.name, event.target.value);
	        }
	        render() {
	            return React.createElement("div", {className: "form-group"}, React.createElement("input", {name: this.props.name, type: this.props.type, placeholder: this.props.placeholder, onChange: this.handleChange, className: "form-control", required: true}));
	        }
	    }
	    exports.Form = Form;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    class IndexDB {
	        constructor() {
	            this.db = null;
	            this.request = indexedDB.open("dekidata");
	            this.connect();
	        }
	        connect() {
	            this.request.onupgradeneeded = (event) => {
	                this.db = event.target.result;
	                let store = this.db.createObjectStore("lineinfo", { keyPath: "linename" });
	                store.createIndex("linename", "linename", { unique: false });
	            };
	            this.request.onsuccess = (event) => {
	                this.db = event.target.result;
	            };
	            this.request.onerror = (event) => {
	                console.log(event.message);
	            };
	        }
	        getAllData(target) {
	            let trans = this.db.transaction(target, "readonly");
	            let store = trans.objectStore(target);
	            let request = store.openCursor();
	            request.onsuccess = (event) => {
	                let cursor = event.target.result;
	                if (cursor) {
	                    this.readsuccess(cursor.value);
	                    cursor.continue();
	                }
	            };
	        }
	        readsuccess(data) {
	            this.onReadEvent("success", data);
	        }
	        readerror() {
	            this.onReadEvent("error");
	        }
	        writesuccess() {
	            this.onWriteEvent("success");
	        }
	        writeerror() {
	            this.onWriteEvent("error");
	        }
	    }
	    exports.IndexDB = IndexDB;
	    class LineData extends IndexDB {
	        constructor() {
	            super();
	        }
	        addData(data) {
	            let trans = this.db.transaction("lineinfo", "readwrite");
	            let store = trans.objectStore("lineinfo");
	            let request = store.put(data);
	            request.onsuccess = (event) => {
	                this.writesuccess();
	            };
	            request.onerror = () => {
	                this.writeerror();
	            };
	        }
	    }
	    exports.LineData = LineData;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map