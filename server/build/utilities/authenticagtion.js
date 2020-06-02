"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.author = exports.authen = void 0;

require("regenerator-runtime/runtime");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Product = _interopRequireDefault(require("../models/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authen = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(auth) {
    var token, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (auth) {
              _context.next = 2;
              break;
            }

            throw new Error('You have to login!');

          case 2:
            token = auth;
            _context.next = 5;
            return _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, decoded) {
              if (err) throw new Error('Invalid token!');
              return decoded;
            });

          case 5:
            user = _context.sent;
            return _context.abrupt("return", user);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function authen(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.authen = authen;

var author = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
    var userId, prodId, product;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = _ref2.userId, prodId = _ref2.prodId;

            if (userId) {
              _context2.next = 3;
              break;
            }

            throw new Error('You have to login!');

          case 3:
            if (prodId) {
              _context2.next = 5;
              break;
            }

            throw new Error('Product not found!');

          case 5:
            _context2.next = 7;
            return _Product["default"].findById(prodId);

          case 7:
            product = _context2.sent;

            if (!(product.userId != userId)) {
              _context2.next = 10;
              break;
            }

            throw new Error('You are not authorized!');

          case 10:
            return _context2.abrupt("return", true);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function author(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.author = author;
//# sourceMappingURL=authenticagtion.js.map