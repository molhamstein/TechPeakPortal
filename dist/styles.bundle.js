webpackJsonp(["styles"],{

/***/ "../../../../../src/assets/images/backgrounds/header-bg.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "header-bg.114d593511446b9a4c6e.png";

/***/ }),

/***/ "../../../../../src/styles.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../sass-loader/lib/loader.js?{\"sourceMap\":false,\"precision\":8,\"includePaths\":[]}!../../../../../src/styles.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../../../../style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--8-1!../node_modules/postcss-loader/lib/index.js??postcss!../node_modules/sass-loader/lib/loader.js??ref--8-3!./styles.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--8-1!../node_modules/postcss-loader/lib/index.js??postcss!../node_modules/sass-loader/lib/loader.js??ref--8-3!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "../../../../@swimlane/ngx-datatable/release/assets/fonts/data-table.eot":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "data-table.bce071e976865da51100.eot";

/***/ }),

/***/ "../../../../@swimlane/ngx-datatable/release/assets/fonts/data-table.svg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "data-table.b0aebd744ce7adb780a9.svg";

/***/ }),

/***/ "../../../../@swimlane/ngx-datatable/release/assets/fonts/data-table.ttf":
/***/ (function(module, exports) {

module.exports = "data:font/ttf;base64,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"

/***/ }),

/***/ "../../../../@swimlane/ngx-datatable/release/assets/fonts/data-table.woff":
/***/ (function(module, exports) {

module.exports = "data:font/woff;base64,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"

/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"plugins\":[null,null,null],\"sourceMap\":false}!../../../../@swimlane/ngx-datatable/release/assets/icons.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n\n@font-face {\n  font-family: \"data-table\";\n  src:url(" + __webpack_require__("../../../../@swimlane/ngx-datatable/release/assets/fonts/data-table.eot") + ");\n  src:url(" + __webpack_require__("../../../../@swimlane/ngx-datatable/release/assets/fonts/data-table.eot") + "?#iefix) format(\"embedded-opentype\"),\n    url(" + __webpack_require__("../../../../@swimlane/ngx-datatable/release/assets/fonts/data-table.woff") + ") format(\"woff\"),\n    url(" + __webpack_require__("../../../../@swimlane/ngx-datatable/release/assets/fonts/data-table.ttf") + ") format(\"truetype\"),\n    url(" + __webpack_require__("../../../../@swimlane/ngx-datatable/release/assets/fonts/data-table.svg") + "#data-table) format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n\n}\n\n[data-icon]:before {\n  font-family: \"data-table\" !important;\n  content: attr(data-icon);\n  font-style: normal !important;\n  font-weight: normal !important;\n  font-variant: normal !important;\n  text-transform: none !important;\n  speak: none;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n[class^=\"datatable-icon-\"]:before,\n[class*=\" datatable-icon-\"]:before {\n  font-family: \"data-table\" !important;\n  font-style: normal !important;\n  font-weight: normal !important;\n  font-variant: normal !important;\n  text-transform: none !important;\n  speak: none;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.datatable-icon-filter:before {\n  content: \"b\";\n}\n.datatable-icon-collapse:before {\n  content: \"a\";\n}\n.datatable-icon-expand:before {\n  content: \"c\";\n}\n.datatable-icon-close:before {\n  content: \"d\";\n}\n.datatable-icon-up:before {\n  content: \"e\";\n}\n.datatable-icon-down:before {\n  content: \"f\";\n}\n.datatable-icon-sort:before {\n  content: \"g\";\n}\n.datatable-icon-done:before {\n  content: \"h\";\n}\n.datatable-icon-done-all:before {\n  content: \"i\";\n}\n.datatable-icon-search:before {\n  content: \"j\";\n}\n.datatable-icon-pin:before {\n  content: \"k\";\n}\n.datatable-icon-add:before {\n  content: \"m\";\n}\n.datatable-icon-left:before {\n  content: \"o\";\n}\n.datatable-icon-right:before {\n  content: \"p\";\n}\n.datatable-icon-skip:before {\n  content: \"q\";\n}\n.datatable-icon-prev:before {\n  content: \"r\";\n}\n", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"plugins\":[null,null,null],\"sourceMap\":false}!../../../../@swimlane/ngx-datatable/release/index.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * angular2-data-table v\"11.1.4\" (https://github.com/swimlane/angular2-data-table)\n * Copyright 2016\n * Licensed under MIT\n */\n.ngx-datatable {\n  display: block;\n  overflow: hidden;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  -webkit-transform: translate3d(0, 0, 0);\n  /**\n   * Vertical Scrolling Adjustments\n   */\n  /**\n   * Horizontal Scrolling Adjustments\n   */\n  /**\n   * Fixed Header Height Adjustments\n   */\n  /**\n   * Fixed row height adjustments\n   */\n  /**\n   * Shared Styles\n   */\n  /**\n   * Header Styles\n   */\n  /**\n   * Body Styles\n   */\n  /**\n   * Footer Styles\n   */ }\n  .ngx-datatable [hidden] {\n    display: none !important; }\n  .ngx-datatable *, .ngx-datatable *:before, .ngx-datatable *:after {\n    box-sizing: border-box; }\n  .ngx-datatable.scroll-vertical .datatable-body {\n    overflow-y: auto; }\n    .ngx-datatable.scroll-vertical .datatable-body .datatable-row-wrapper {\n      position: absolute; }\n  .ngx-datatable.scroll-horz .datatable-body {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n  .ngx-datatable.fixed-header .datatable-header .datatable-header-inner {\n    white-space: nowrap; }\n    .ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n  .ngx-datatable.fixed-row .datatable-scroll {\n    white-space: nowrap; }\n    .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row {\n      white-space: nowrap; }\n      .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; }\n      .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; }\n  .ngx-datatable .datatable-body-row,\n  .ngx-datatable .datatable-row-center,\n  .ngx-datatable .datatable-header-inner {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-flow: row;\n    -o-flex-flow: row;\n    flex-flow: row; }\n  .ngx-datatable .datatable-body-cell,\n  .ngx-datatable .datatable-header-cell {\n    overflow-x: hidden;\n    vertical-align: top;\n    display: inline-block;\n    line-height: 1.625; }\n    .ngx-datatable .datatable-body-cell:focus,\n    .ngx-datatable .datatable-header-cell:focus {\n      outline: none; }\n  .ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-right {\n    z-index: 9; }\n  .ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-center,\n  .ngx-datatable .datatable-row-group,\n  .ngx-datatable .datatable-row-right {\n    position: relative; }\n  .ngx-datatable .datatable-header {\n    display: block;\n    overflow: hidden; }\n    .ngx-datatable .datatable-header .datatable-header-inner {\n      -webkit-box-align: stretch;\n          -ms-flex-align: stretch;\n              align-items: stretch;\n      -webkit-align-items: stretch; }\n    .ngx-datatable .datatable-header .datatable-header-cell {\n      position: relative;\n      display: inline-block; }\n      .ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper {\n        cursor: pointer; }\n      .ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper {\n        cursor: move; }\n      .ngx-datatable .datatable-header .datatable-header-cell .sort-btn {\n        line-height: 100%;\n        vertical-align: middle;\n        display: inline-block;\n        cursor: pointer; }\n      .ngx-datatable .datatable-header .datatable-header-cell .resize-handle {\n        display: inline-block;\n        position: absolute;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        width: 5px;\n        padding: 0 4px;\n        visibility: hidden;\n        cursor: ew-resize; }\n      .ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle {\n        visibility: visible; }\n  .ngx-datatable .datatable-body {\n    position: relative;\n    z-index: 10;\n    display: block; }\n    .ngx-datatable .datatable-body .datatable-scroll {\n      display: inline-block; }\n    .ngx-datatable .datatable-body .datatable-row-detail {\n      overflow-y: hidden; }\n    .ngx-datatable .datatable-body .datatable-row-wrapper {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n    .ngx-datatable .datatable-body .datatable-body-row {\n      outline: none; }\n      .ngx-datatable .datatable-body .datatable-body-row > div {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n  .ngx-datatable .datatable-footer {\n    display: block;\n    width: 100%; }\n    .ngx-datatable .datatable-footer .datatable-footer-inner {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      width: 100%; }\n    .ngx-datatable .datatable-footer .selected-count .page-count {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 40%;\n              flex: 1 1 40%; }\n    .ngx-datatable .datatable-footer .selected-count .datatable-pager {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 60%;\n              flex: 1 1 60%; }\n    .ngx-datatable .datatable-footer .page-count {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 20%;\n              flex: 1 1 20%; }\n    .ngx-datatable .datatable-footer .datatable-pager {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 80%;\n              flex: 1 1 80%;\n      text-align: right; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager,\n      .ngx-datatable .datatable-footer .datatable-pager .pager li {\n        padding: 0;\n        margin: 0;\n        display: inline-block;\n        list-style: none; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li, .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        outline: none; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        cursor: pointer;\n        display: inline-block; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a {\n        cursor: not-allowed; }", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"plugins\":[null,null,null],\"sourceMap\":false}!../../../../@swimlane/ngx-datatable/release/themes/material.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ngx-datatable.material {\n  background: #FFF;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n  /**\n\t * Shared Styles\n\t */\n  /**\n\t * Global Row Styles\n\t */\n  /**\n\t * Header Styles\n\t */\n  /**\n\t * Body Styles\n\t */\n  /**\n\t * Footer Styles\n\t */ }\n  .ngx-datatable.material.striped .datatable-row-odd {\n    background: #eee; }\n  .ngx-datatable.material.single-selection .datatable-body-row.active,\n  .ngx-datatable.material.single-selection .datatable-body-row.active .datatable-row-group, .ngx-datatable.material.multi-selection .datatable-body-row.active,\n  .ngx-datatable.material.multi-selection .datatable-body-row.active .datatable-row-group, .ngx-datatable.material.multi-click-selection .datatable-body-row.active,\n  .ngx-datatable.material.multi-click-selection .datatable-body-row.active .datatable-row-group {\n    background-color: #304FFE;\n    color: #FFF; }\n  .ngx-datatable.material.single-selection .datatable-body-row.active:hover,\n  .ngx-datatable.material.single-selection .datatable-body-row.active:hover .datatable-row-group, .ngx-datatable.material.multi-selection .datatable-body-row.active:hover,\n  .ngx-datatable.material.multi-selection .datatable-body-row.active:hover .datatable-row-group, .ngx-datatable.material.multi-click-selection .datatable-body-row.active:hover,\n  .ngx-datatable.material.multi-click-selection .datatable-body-row.active:hover .datatable-row-group {\n    background-color: #193AE4;\n    color: #FFF; }\n  .ngx-datatable.material.single-selection .datatable-body-row.active:focus,\n  .ngx-datatable.material.single-selection .datatable-body-row.active:focus .datatable-row-group, .ngx-datatable.material.multi-selection .datatable-body-row.active:focus,\n  .ngx-datatable.material.multi-selection .datatable-body-row.active:focus .datatable-row-group, .ngx-datatable.material.multi-click-selection .datatable-body-row.active:focus,\n  .ngx-datatable.material.multi-click-selection .datatable-body-row.active:focus .datatable-row-group {\n    background-color: #2041EF;\n    color: #FFF; }\n  .ngx-datatable.material:not(.cell-selection) .datatable-body-row:hover,\n  .ngx-datatable.material:not(.cell-selection) .datatable-body-row:hover .datatable-row-group {\n    background-color: #eee;\n    transition-property: background;\n    transition-duration: .3s;\n    transition-timing-function: linear; }\n  .ngx-datatable.material:not(.cell-selection) .datatable-body-row:focus,\n  .ngx-datatable.material:not(.cell-selection) .datatable-body-row:focus .datatable-row-group {\n    background-color: #ddd; }\n  .ngx-datatable.material.cell-selection .datatable-body-cell:hover,\n  .ngx-datatable.material.cell-selection .datatable-body-cell:hover .datatable-row-group {\n    background-color: #eee;\n    transition-property: background;\n    transition-duration: .3s;\n    transition-timing-function: linear; }\n  .ngx-datatable.material.cell-selection .datatable-body-cell:focus,\n  .ngx-datatable.material.cell-selection .datatable-body-cell:focus .datatable-row-group {\n    background-color: #ddd; }\n  .ngx-datatable.material.cell-selection .datatable-body-cell.active,\n  .ngx-datatable.material.cell-selection .datatable-body-cell.active .datatable-row-group {\n    background-color: #304FFE;\n    color: #FFF; }\n  .ngx-datatable.material.cell-selection .datatable-body-cell.active:hover,\n  .ngx-datatable.material.cell-selection .datatable-body-cell.active:hover .datatable-row-group {\n    background-color: #193AE4;\n    color: #FFF; }\n  .ngx-datatable.material.cell-selection .datatable-body-cell.active:focus,\n  .ngx-datatable.material.cell-selection .datatable-body-cell.active:focus .datatable-row-group {\n    background-color: #2041EF;\n    color: #FFF; }\n  .ngx-datatable.material .empty-row {\n    height: 50px;\n    text-align: left;\n    padding: .5rem 1.2rem;\n    vertical-align: top;\n    border-top: 0; }\n  .ngx-datatable.material .loading-row {\n    text-align: left;\n    padding: .5rem 1.2rem;\n    vertical-align: top;\n    border-top: 0; }\n  .ngx-datatable.material .datatable-header .datatable-row-left,\n  .ngx-datatable.material .datatable-body .datatable-row-left {\n    background-color: #FFF;\n    background-position: 100% 0;\n    background-repeat: repeat-y;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAAFklEQVQIHWPSkNeSBmJhTQVtbiDNCgASagIIuJX8OgAAAABJRU5ErkJggg==); }\n  .ngx-datatable.material .datatable-header .datatable-row-right,\n  .ngx-datatable.material .datatable-body .datatable-row-right {\n    background-position: 0 0;\n    background-color: #fff;\n    background-repeat: repeat-y;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAAFklEQVQI12PQkNdi1VTQ5gbSwkAsDQARLAIGtOSFUAAAAABJRU5ErkJggg==); }\n  .ngx-datatable.material .datatable-header {\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n    .ngx-datatable.material .datatable-header .datatable-header-cell {\n      text-align: left;\n      padding: .9rem 1.2rem;\n      font-weight: 400;\n      color: rgba(0, 0, 0, 0.54);\n      vertical-align: bottom;\n      font-size: 12px;\n      font-weight: 500; }\n      .ngx-datatable.material .datatable-header .datatable-header-cell .datatable-header-cell-wrapper {\n        position: relative; }\n      .ngx-datatable.material .datatable-header .datatable-header-cell.longpress .draggable::after {\n        transition: opacity 400ms ease, -webkit-transform 400ms ease;\n        transition: transform 400ms ease, opacity 400ms ease;\n        transition: transform 400ms ease, opacity 400ms ease, -webkit-transform 400ms ease;\n        opacity: .5;\n        -webkit-transform: scale(1);\n                transform: scale(1); }\n      .ngx-datatable.material .datatable-header .datatable-header-cell .draggable::after {\n        content: \" \";\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin: -30px 0 0 -30px;\n        height: 60px;\n        width: 60px;\n        background: #eee;\n        border-radius: 100%;\n        opacity: 1;\n        -webkit-filter: none;\n                filter: none;\n        -webkit-transform: scale(0);\n                transform: scale(0);\n        z-index: 9999;\n        pointer-events: none; }\n      .ngx-datatable.material .datatable-header .datatable-header-cell.dragging .resize-handle {\n        border-right: none; }\n    .ngx-datatable.material .datatable-header .resize-handle {\n      border-right: solid 1px #eee; }\n  .ngx-datatable.material .datatable-body .datatable-row-detail {\n    background: #f5f5f5;\n    padding: 10px; }\n  .ngx-datatable.material .datatable-body .datatable-group-header {\n    background: #f5f5f5;\n    border-bottom: solid 1px #D9D8D9;\n    border-top: solid 1px #D9D8D9; }\n  .ngx-datatable.material .datatable-body .datatable-body-row .datatable-body-cell {\n    text-align: left;\n    padding: .9rem 1.2rem;\n    vertical-align: top;\n    border-top: 0;\n    color: rgba(0, 0, 0, 0.87);\n    transition: width 0.3s ease;\n    font-size: 14px;\n    font-weight: 400; }\n  .ngx-datatable.material .datatable-body .datatable-body-row .datatable-body-group-cell {\n    text-align: left;\n    padding: .9rem 1.2rem;\n    vertical-align: top;\n    border-top: 0;\n    color: rgba(0, 0, 0, 0.87);\n    transition: width 0.3s ease;\n    font-size: 14px;\n    font-weight: 400; }\n  .ngx-datatable.material .datatable-body .progress-linear {\n    display: block;\n    position: relative;\n    width: 100%;\n    height: 5px;\n    padding: 0;\n    margin: 0;\n    position: absolute; }\n    .ngx-datatable.material .datatable-body .progress-linear .container {\n      display: block;\n      position: relative;\n      overflow: hidden;\n      width: 100%;\n      height: 5px;\n      -webkit-transform: translate(0, 0) scale(1, 1);\n      transform: translate(0, 0) scale(1, 1);\n      background-color: #aad1f9; }\n      .ngx-datatable.material .datatable-body .progress-linear .container .bar {\n        transition: all .2s linear;\n        -webkit-animation: query 0.8s infinite cubic-bezier(0.39, 0.575, 0.565, 1);\n        animation: query 0.8s infinite cubic-bezier(0.39, 0.575, 0.565, 1);\n        transition: -webkit-transform .2s linear;\n        transition: transform .2s linear;\n        transition: transform .2s linear, -webkit-transform .2s linear;\n        background-color: #106cc8;\n        position: absolute;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        width: 100%;\n        height: 5px; }\n  .ngx-datatable.material .datatable-footer {\n    border-top: 1px solid rgba(0, 0, 0, 0.12);\n    font-size: 12px;\n    font-weight: 400;\n    color: rgba(0, 0, 0, 0.54); }\n    .ngx-datatable.material .datatable-footer .page-count {\n      line-height: 50px;\n      height: 50px;\n      padding: 0 1.2rem; }\n    .ngx-datatable.material .datatable-footer .datatable-pager {\n      margin: 0 10px; }\n      .ngx-datatable.material .datatable-footer .datatable-pager li {\n        vertical-align: middle; }\n        .ngx-datatable.material .datatable-footer .datatable-pager li.disabled a {\n          color: rgba(0, 0, 0, 0.26) !important;\n          background-color: transparent !important; }\n        .ngx-datatable.material .datatable-footer .datatable-pager li.active a {\n          background-color: rgba(158, 158, 158, 0.2);\n          font-weight: bold; }\n      .ngx-datatable.material .datatable-footer .datatable-pager a {\n        height: 22px;\n        min-width: 24px;\n        line-height: 22px;\n        padding: 0 6px;\n        border-radius: 3px;\n        margin: 6px 3px;\n        text-align: center;\n        vertical-align: top;\n        color: rgba(0, 0, 0, 0.54);\n        text-decoration: none;\n        vertical-align: bottom; }\n        .ngx-datatable.material .datatable-footer .datatable-pager a:hover {\n          color: rgba(0, 0, 0, 0.75);\n          background-color: rgba(158, 158, 158, 0.2); }\n      .ngx-datatable.material .datatable-footer .datatable-pager .datatable-icon-left,\n      .ngx-datatable.material .datatable-footer .datatable-pager .datatable-icon-skip,\n      .ngx-datatable.material .datatable-footer .datatable-pager .datatable-icon-right,\n      .ngx-datatable.material .datatable-footer .datatable-pager .datatable-icon-prev {\n        font-size: 20px;\n        line-height: 20px;\n        padding: 0 3px; }\n\n/**\n * Checkboxes\n**/\n.datatable-checkbox {\n  position: relative;\n  margin: 0;\n  cursor: pointer;\n  vertical-align: middle;\n  display: inline-block;\n  box-sizing: border-box;\n  padding: 0; }\n  .datatable-checkbox input[type='checkbox'] {\n    position: relative;\n    margin: 0 1rem 0 0;\n    cursor: pointer;\n    outline: none; }\n    .datatable-checkbox input[type='checkbox']:before {\n      transition: all 0.3s ease-in-out;\n      content: \"\";\n      position: absolute;\n      left: 0;\n      z-index: 1;\n      width: 1rem;\n      height: 1rem;\n      border: 2px solid #f2f2f2; }\n    .datatable-checkbox input[type='checkbox']:checked:before {\n      -webkit-transform: rotate(-45deg);\n      transform: rotate(-45deg);\n      height: .5rem;\n      border-color: #009688;\n      border-top-style: none;\n      border-right-style: none; }\n    .datatable-checkbox input[type='checkbox']:after {\n      content: \"\";\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 1rem;\n      height: 1rem;\n      background: #fff;\n      cursor: pointer; }\n\n/**\n * Progress bar animations\n */\n@-webkit-keyframes query {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(35%) scale(0.3, 1);\n            transform: translateX(35%) scale(0.3, 1); }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); } }\n@keyframes query {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(35%) scale(0.3, 1);\n            transform: translateX(35%) scale(0.3, 1); }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); } }\n", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"plugins\":[null,null,null],\"sourceMap\":false}!../../../../perfect-scrollbar/css/perfect-scrollbar.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\n * Container style\n */\n.ps {\n  overflow: hidden !important;\n  overflow-anchor: none;\n  -ms-overflow-style: none;\n  touch-action: auto;\n  -ms-touch-action: auto;\n}\n\n/*\n * Scrollbar rail styles\n */\n.ps__rail-x {\n  display: none;\n  opacity: 0;\n  transition: background-color .2s linear, opacity .2s linear;\n  -webkit-transition: background-color .2s linear, opacity .2s linear;\n  height: 15px;\n  /* there must be 'bottom' or 'top' for ps__rail-x */\n  bottom: 0px;\n  /* please don't change 'position' */\n  position: absolute;\n}\n\n.ps__rail-y {\n  display: none;\n  opacity: 0;\n  transition: background-color .2s linear, opacity .2s linear;\n  -webkit-transition: background-color .2s linear, opacity .2s linear;\n  width: 15px;\n  /* there must be 'right' or 'left' for ps__rail-y */\n  right: 0;\n  /* please don't change 'position' */\n  position: absolute;\n}\n\n.ps--active-x > .ps__rail-x,\n.ps--active-y > .ps__rail-y {\n  display: block;\n  background-color: transparent;\n}\n\n.ps:hover > .ps__rail-x,\n.ps:hover > .ps__rail-y,\n.ps--focus > .ps__rail-x,\n.ps--focus > .ps__rail-y,\n.ps--scrolling-x > .ps__rail-x,\n.ps--scrolling-y > .ps__rail-y {\n  opacity: 0.6;\n}\n\n.ps__rail-x:hover,\n.ps__rail-y:hover,\n.ps__rail-x:focus,\n.ps__rail-y:focus {\n  background-color: #eee;\n  opacity: 0.9;\n}\n\n/*\n * Scrollbar thumb styles\n */\n.ps__thumb-x {\n  background-color: #aaa;\n  border-radius: 6px;\n  transition: background-color .2s linear, height .2s ease-in-out;\n  -webkit-transition: background-color .2s linear, height .2s ease-in-out;\n  height: 6px;\n  /* there must be 'bottom' for ps__thumb-x */\n  bottom: 2px;\n  /* please don't change 'position' */\n  position: absolute;\n}\n\n.ps__thumb-y {\n  background-color: #aaa;\n  border-radius: 6px;\n  transition: background-color .2s linear, width .2s ease-in-out;\n  -webkit-transition: background-color .2s linear, width .2s ease-in-out;\n  width: 6px;\n  /* there must be 'right' for ps__thumb-y */\n  right: 2px;\n  /* please don't change 'position' */\n  position: absolute;\n}\n\n.ps__rail-x:hover > .ps__thumb-x,\n.ps__rail-x:focus > .ps__thumb-x {\n  background-color: #999;\n  height: 11px;\n}\n\n.ps__rail-y:hover > .ps__thumb-y,\n.ps__rail-y:focus > .ps__thumb-y {\n  background-color: #999;\n  width: 11px;\n}\n\n/* MS supports */\n@supports (-ms-overflow-style: none) {\n  .ps {\n    overflow: auto !important;\n  }\n}\n\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .ps {\n    overflow: auto !important;\n  }\n}\n", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../sass-loader/lib/loader.js?{\"sourceMap\":false,\"precision\":8,\"includePaths\":[]}!../../../../../src/styles.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"plugins\":[null,null,null],\"sourceMap\":false}!../../../../@swimlane/ngx-datatable/release/index.css"), "");
exports.i(__webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"plugins\":[null,null,null],\"sourceMap\":false}!../../../../@swimlane/ngx-datatable/release/themes/material.css"), "");
exports.i(__webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"plugins\":[null,null,null],\"sourceMap\":false}!../../../../@swimlane/ngx-datatable/release/assets/icons.css"), "");
exports.i(__webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"plugins\":[null,null,null],\"sourceMap\":false}!../../../../perfect-scrollbar/css/perfect-scrollbar.css"), "");

// module

// exports


/***/ }),

/***/ "../../../../css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../../../style-loader/addStyles.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/styles.scss");


/***/ })

},[3]);
//# sourceMappingURL=styles.bundle.js.map