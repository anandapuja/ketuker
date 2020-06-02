"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.join");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var puppeteer = require('puppeteer');

function getTokoPedia(_x) {
  return _getTokoPedia.apply(this, arguments);
}

function _getTokoPedia() {
  _getTokoPedia = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
    var processedItem, browser, page, productNames;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            processedItem = item.split(' ').join('%20');
            _context.next = 3;
            return puppeteer.launch({
              headless: false
            });

          case 3:
            browser = _context.sent;
            _context.next = 6;
            return browser.newPage();

          case 6:
            page = _context.sent;
            _context.next = 9;
            return page.setDefaultNavigationTimeout(0);

          case 9:
            _context.next = 11;
            return page.setViewport({
              width: 1000,
              height: 926
            });

          case 11:
            _context.next = 13;
            return page["goto"]("https://www.tokopedia.com/search?st=product&q=".concat(processedItem), {
              waitUntil: 'networkidle2'
            });

          case 13:
            _context.next = 15;
            return page.evaluate(function () {
              var div = document.querySelectorAll('#zeus-root > div > div.css-jau1bt > div > div.css-rjanld > div.css-jza1fo > div.css-1g20a2m');
              var productnames = [];
              div.forEach(function (element) {
                var titleelem = element.querySelector('.css-1bjwylw').textContent;
                var priceitem = element.querySelector('.css-1beg0o7').textContent;

                if (priceitem != null && titleelem != null) {
                  productnames.push({
                    title: titleelem,
                    price: priceitem
                  });
                }
              }); // titleelem != null &&

              return productnames;
            });

          case 15:
            productNames = _context.sent;
            // console.log(productNames);
            browser.close();
            return _context.abrupt("return", productNames);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getTokoPedia.apply(this, arguments);
}

var _default = getTokoPedia;
exports["default"] = _default;
//# sourceMappingURL=scraping.js.map