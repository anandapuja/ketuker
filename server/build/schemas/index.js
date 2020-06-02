"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = void 0;

require("regenerator-runtime/runtime");

var _apolloServer = require("apollo-server");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _scraping = _interopRequireDefault(require("../utilities/scraping"));

var _nodemailer2 = _interopRequireDefault(require("../utilities/nodemailer"));

var _redis = _interopRequireDefault(require("../utilities/redis"));

var _User = _interopRequireDefault(require("../models/User"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _authenticagtion = require("../utilities/authenticagtion");

var _Transaction = _interopRequireDefault(require("../models/Transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type User {\n    _id: ID!\n    username: String!\n    email: String!\n    password: String!\n    avatar: String!\n    address: String!\n    phone: String!\n    city: String\n    token: String\n  }\n\n  input UserLogin {\n    email: String!\n    password: String!\n  }\n\n  input UserRegister {\n    username: String!\n    email: String!\n    password: String!\n    avatar: String!\n    address: String!\n    city: String!\n    phone: String!\n  }\n\n  type Product {\n    _id: ID!\n    userId: String!\n    title: String!\n    description: String!\n    price: Int!\n    whislist: String!\n    category: String!\n    image: String!\n    submit: Boolean!\n  }\n\n  input InputProduct {\n    title: String!\n    description: String!\n    price: Int!\n    whislist: String!\n    category: String!\n    image: String!\n    submit: Boolean!\n  }\n\n  type Item {\n    title: String!\n    price: String!\n  }\n\n  type Output {\n    result: String!\n  }\n\n  type Transaction {\n    _id: ID!\n    userOriginal: String!\n    userTarget: String!\n    productOriginal: [Product]!\n    productTarget: [Product]!\n    status: Boolean\n  }\n\n  input InputProdTrans {\n    _id: ID!\n    userId: String!\n    title: String!\n    description: String!\n    price: Int!\n    whislist: String!\n    category: String!\n    image: String!\n    submit: Boolean!\n  }\n\n  input InputTransaction {\n    userTarget: String!\n    productOriginal: [InputProdTrans]!\n    productTarget: [InputProdTrans]!\n  }\n\n  type Query {\n    getUsers: [User]!\n    getUser(id: ID!): User!\n\n    getProducts: [Product]!\n    getProduct(id: ID!): Product!\n\n    ##### nodemailer\n    nodemailer: Output!\n\n    ##### scrapping\n    getScrap(item: String!): [Item]!\n\n    productByUser(userId: ID!): [Product]!\n    productByCategory(category: String): [Product]!\n\n    transactionById(id: ID!): Transaction\n    transactionByOriginal(userId: ID!): [Transaction]\n    transactionByTarget(userId: ID!): [Transaction]\n  }\n\n  type Mutation {\n    register(input: UserRegister): User!\n    login(input: UserLogin): User!\n\n    addProduct(input: InputProduct!): Product!\n    updateProduct(id: ID!, input: InputProduct!): Output!\n    deleteProduct(id: ID!): Output!\n\n    addTransaction(input: InputTransaction!): Transaction\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
var resolvers = {
  Query: {
    getUsers: function () {
      var _getUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var checkUsers, getAllUsers;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = JSON;
                _context.next = 3;
                return _redis["default"].get('users');

              case 3:
                _context.t1 = _context.sent;
                checkUsers = _context.t0.parse.call(_context.t0, _context.t1);

                if (!checkUsers) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", checkUsers);

              case 9:
                _context.next = 11;
                return _User["default"].find();

              case 11:
                getAllUsers = _context.sent;
                _context.next = 14;
                return _redis["default"].set('users', JSON.stringify(getAllUsers));

              case 14:
                return _context.abrupt("return", getAllUsers);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getUsers() {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }(),
    getUser: function () {
      var _getUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref) {
        var id, users, user, _user, data, getOneUser;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref.id;
                _context2.prev = 1;
                _context2.t0 = JSON;
                _context2.next = 5;
                return _redis["default"].get('users');

              case 5:
                _context2.t1 = _context2.sent;
                users = _context2.t0.parse.call(_context2.t0, _context2.t1);
                user = users.filter(function (el) {
                  return el._id == id;
                });

                if (!user.length) {
                  _context2.next = 13;
                  break;
                }

                _user = _slicedToArray(user, 1), data = _user[0];
                return _context2.abrupt("return", data);

              case 13:
                _context2.next = 15;
                return _User["default"].findOne({
                  _id: id
                });

              case 15:
                getOneUser = _context2.sent;
                users.push(getOneUser);
                _context2.next = 19;
                return _redis["default"].set('users', JSON.stringify(users));

              case 19:
                return _context2.abrupt("return", getOneUser);

              case 20:
                _context2.next = 25;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t2 = _context2["catch"](1);
                return _context2.abrupt("return", new Error('User not found!'));

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 22]]);
      }));

      function getUser(_x, _x2) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }(),
    getProducts: function () {
      var _getProducts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var getProducts, getAllProducts;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = JSON;
                _context3.next = 3;
                return _redis["default"].get('products');

              case 3:
                _context3.t1 = _context3.sent;
                getProducts = _context3.t0.parse.call(_context3.t0, _context3.t1);

                if (!getProducts) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", getProducts);

              case 9:
                _context3.next = 11;
                return _Product["default"].find();

              case 11:
                getAllProducts = _context3.sent;
                _context3.next = 14;
                return _redis["default"].set('products', JSON.stringify(getAllProducts));

              case 14:
                return _context3.abrupt("return", getAllProducts);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getProducts() {
        return _getProducts.apply(this, arguments);
      }

      return getProducts;
    }(),
    getProduct: function () {
      var _getProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref2) {
        var id, products, _products$filter, _products$filter2, product, getOneProduct, productsDb, _getOneProduct;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref2.id;
                _context4.prev = 1;
                _context4.t0 = JSON;
                _context4.next = 5;
                return _redis["default"].get('products');

              case 5:
                _context4.t1 = _context4.sent;
                products = _context4.t0.parse.call(_context4.t0, _context4.t1);

                if (!products) {
                  _context4.next = 22;
                  break;
                }

                _products$filter = products.filter(function (el) {
                  return el._id == id;
                }), _products$filter2 = _slicedToArray(_products$filter, 1), product = _products$filter2[0];

                if (!product) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return", product);

              case 13:
                _context4.next = 15;
                return _Product["default"].findOne({
                  _id: id
                });

              case 15:
                getOneProduct = _context4.sent;
                product.push(getOneProduct);
                _context4.next = 19;
                return _redis["default"].set('products', JSON.stringify(products));

              case 19:
                return _context4.abrupt("return", getOneProduct);

              case 20:
                _context4.next = 31;
                break;

              case 22:
                _context4.next = 24;
                return _Product["default"].find();

              case 24:
                productsDb = _context4.sent;
                _context4.next = 27;
                return _Product["default"].findOne({
                  _id: id
                });

              case 27:
                _getOneProduct = _context4.sent;
                _context4.next = 30;
                return _redis["default"].set('products', JSON.stringify(productsDb));

              case 30:
                return _context4.abrupt("return", _getOneProduct);

              case 31:
                _context4.next = 36;
                break;

              case 33:
                _context4.prev = 33;
                _context4.t2 = _context4["catch"](1);
                console.log(_context4.t2);

              case 36:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 33]]);
      }));

      function getProduct(_x3, _x4) {
        return _getProduct.apply(this, arguments);
      }

      return getProduct;
    }(),
    productByUser: function () {
      var _productByUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref3) {
        var userId, products, newProducts, product, getProduct;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userId = _ref3.userId;
                _context5.prev = 1;
                _context5.t0 = JSON;
                _context5.next = 5;
                return _redis["default"].get('products');

              case 5:
                _context5.t1 = _context5.sent;
                products = _context5.t0.parse.call(_context5.t0, _context5.t1);

                if (!products) {
                  _context5.next = 11;
                  break;
                }

                product = products.filter(function (el) {
                  return el.userId == userId;
                });

                if (!product) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt("return", product);

              case 11:
                _context5.next = 13;
                return _Product["default"].findOne({
                  userId: userId
                });

              case 13:
                getProduct = _context5.sent;

                if (!products) {
                  _context5.next = 18;
                  break;
                }

                newProducts = [].concat(_toConsumableArray(products), [getProduct]);
                _context5.next = 21;
                break;

              case 18:
                _context5.next = 20;
                return _Product["default"].find();

              case 20:
                newProducts = _context5.sent;

              case 21:
                _context5.next = 23;
                return _redis["default"].set('products', JSON.stringify(newProducts));

              case 23:
                return _context5.abrupt("return", getProduct);

              case 26:
                _context5.prev = 26;
                _context5.t2 = _context5["catch"](1);
                console.log(_context5.t2, '>>>>>>>2');

              case 29:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 26]]);
      }));

      function productByUser(_x5, _x6) {
        return _productByUser.apply(this, arguments);
      }

      return productByUser;
    }(),
    productByCategory: function () {
      var _productByCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref4) {
        var category, products, product, getProduct, getProducts, getAllProducts;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                category = _ref4.category;
                _context6.prev = 1;

                if (!category) {
                  _context6.next = 20;
                  break;
                }

                _context6.t0 = JSON;
                _context6.next = 6;
                return _redis["default"].get('products');

              case 6:
                _context6.t1 = _context6.sent;
                products = _context6.t0.parse.call(_context6.t0, _context6.t1);

                if (!products) {
                  _context6.next = 14;
                  break;
                }

                _context6.next = 11;
                return products.filter(function (el) {
                  return el.category == category;
                });

              case 11:
                product = _context6.sent;

                if (!product.length) {
                  _context6.next = 14;
                  break;
                }

                return _context6.abrupt("return", product);

              case 14:
                _context6.next = 16;
                return _Product["default"].find({
                  category: category
                });

              case 16:
                getProduct = _context6.sent;
                return _context6.abrupt("return", getProduct);

              case 20:
                _context6.t2 = JSON;
                _context6.next = 23;
                return _redis["default"].get('products');

              case 23:
                _context6.t3 = _context6.sent;
                getProducts = _context6.t2.parse.call(_context6.t2, _context6.t3);

                if (!getProducts) {
                  _context6.next = 29;
                  break;
                }

                return _context6.abrupt("return", getProducts);

              case 29:
                _context6.next = 31;
                return _Product["default"].find();

              case 31:
                getAllProducts = _context6.sent;
                _context6.next = 34;
                return _redis["default"].set('products', JSON.stringify(getAllProducts));

              case 34:
                return _context6.abrupt("return", getAllProducts);

              case 35:
                _context6.next = 40;
                break;

              case 37:
                _context6.prev = 37;
                _context6.t4 = _context6["catch"](1);
                return _context6.abrupt("return", _context6.t4);

              case 40:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 37]]);
      }));

      function productByCategory(_x7, _x8) {
        return _productByCategory.apply(this, arguments);
      }

      return productByCategory;
    }(),
    transactionById: function () {
      var _transactionById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_, _ref5) {
        var id, transaction;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                id = _ref5.id;
                _context7.prev = 1;
                _context7.next = 4;
                return _Transaction["default"].findById(id);

              case 4:
                transaction = _context7.sent;
                return _context7.abrupt("return", transaction);

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](1);
                console.log(_context7.t0);
                return _context7.abrupt("return", _context7.t0);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[1, 8]]);
      }));

      function transactionById(_x9, _x10) {
        return _transactionById.apply(this, arguments);
      }

      return transactionById;
    }(),
    transactionByOriginal: function () {
      var _transactionByOriginal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref6) {
        var userId, transactions;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                userId = _ref6.userId;
                _context8.prev = 1;
                _context8.next = 4;
                return _Transaction["default"].find({
                  userOriginal: userId
                });

              case 4:
                transactions = _context8.sent;
                return _context8.abrupt("return", transactions);

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](1);
                console.log(_context8.t0);
                return _context8.abrupt("return", _context8.t0);

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[1, 8]]);
      }));

      function transactionByOriginal(_x11, _x12) {
        return _transactionByOriginal.apply(this, arguments);
      }

      return transactionByOriginal;
    }(),
    transactionByTarget: function () {
      var _transactionByTarget = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, _ref7) {
        var userId, transactions;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                userId = _ref7.userId;
                _context9.prev = 1;
                _context9.next = 4;
                return _Transaction["default"].find({
                  userTarget: userId
                });

              case 4:
                transactions = _context9.sent;
                return _context9.abrupt("return", transactions);

              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](1);
                console.log(_context9.t0);
                return _context9.abrupt("return", _context9.t0);

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[1, 8]]);
      }));

      function transactionByTarget(_x13, _x14) {
        return _transactionByTarget.apply(this, arguments);
      }

      return transactionByTarget;
    }(),
    nodemailer: function () {
      var _nodemailer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var mail, subs, text;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                mail = 'smpoern4mild@gmail.com';
                subs = 'Invitation bartering goods';
                text = ' Hai, I would like to barter my goods with your goods. give me reaction if you are interesting or we can talk first before get deal :)';
                _context10.next = 6;
                return (0, _nodemailer2["default"])(mail, subs, text);

              case 6:
                return _context10.abrupt("return", {
                  result: 'Succesfully sent email to our lovely client!'
                });

              case 9:
                _context10.prev = 9;
                _context10.t0 = _context10["catch"](0);
                console.log(_context10.t0);

              case 12:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 9]]);
      }));

      function nodemailer() {
        return _nodemailer.apply(this, arguments);
      }

      return nodemailer;
    }(),
    getScrap: function () {
      var _getScrap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_, _ref8) {
        var item, scrappedData;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                item = _ref8.item;
                _context11.next = 3;
                return (0, _scraping["default"])(item);

              case 3:
                scrappedData = _context11.sent;
                return _context11.abrupt("return", scrappedData);

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function getScrap(_x15, _x16) {
        return _getScrap.apply(this, arguments);
      }

      return getScrap;
    }()
  },
  Mutation: {
    register: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_, _ref9) {
        var input, newUser, error, res, token, users;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                input = _ref9.input;
                newUser = new _User["default"](input);
                error = newUser.validateSync();

                if (!error) {
                  _context12.next = 11;
                  break;
                }

                if (!error.errors.password) {
                  _context12.next = 8;
                  break;
                }

                throw new Error(error.errors.password.properties.message);

              case 8:
                throw new Error(error.errors.phone.properties.message);

              case 9:
                _context12.next = 29;
                break;

              case 11:
                _context12.next = 13;
                return newUser.save();

              case 13:
                res = _context12.sent;
                token = _jsonwebtoken["default"].sign({
                  id: newUser._id
                }, process.env.JWT_SECRET);
                _context12.t0 = JSON;
                _context12.next = 18;
                return _redis["default"].get('users');

              case 18:
                _context12.t1 = _context12.sent;
                users = _context12.t0.parse.call(_context12.t0, _context12.t1);

                if (!users) {
                  _context12.next = 26;
                  break;
                }

                users.push(newUser);
                _context12.next = 24;
                return _redis["default"].set('users', JSON.stringify(users));

              case 24:
                _context12.next = 28;
                break;

              case 26:
                _context12.next = 28;
                return _redis["default"].set('users', JSON.stringify([res]));

              case 28:
                return _context12.abrupt("return", _objectSpread(_objectSpread({
                  _id: res._id
                }, res._doc), {}, {
                  token: token
                }));

              case 29:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function register(_x17, _x18) {
        return _register.apply(this, arguments);
      }

      return register;
    }(),
    login: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_, _ref10) {
        var input, email, password, getUser, compare, token, _id, username, _email, avatar, address, phone;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                input = _ref10.input;
                email = input.email, password = input.password;
                _context13.next = 4;
                return _User["default"].findOne({
                  email: email
                });

              case 4:
                getUser = _context13.sent;

                if (!getUser) {
                  _context13.next = 18;
                  break;
                }

                _context13.next = 8;
                return _bcrypt["default"].compare(password, getUser.password);

              case 8:
                compare = _context13.sent;

                if (compare) {
                  _context13.next = 13;
                  break;
                }

                throw new Error('Wrong Password / Wrong Email');

              case 13:
                //kalo secretPrivateKey gw taruh di .env masih error. sementara gtu.
                token = _jsonwebtoken["default"].sign({
                  id: getUser._id
                }, process.env.JWT_SECRET);
                _id = getUser._id, username = getUser.username, _email = getUser.email, avatar = getUser.avatar, address = getUser.address, phone = getUser.phone;
                return _context13.abrupt("return", {
                  _id: _id,
                  username: username,
                  avatar: avatar,
                  address: address,
                  phone: phone,
                  email: _email,
                  password: password,
                  token: token
                });

              case 16:
                _context13.next = 19;
                break;

              case 18:
                throw new Error('Wrong Password / Wrong Email');

              case 19:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function login(_x19, _x20) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    addProduct: function () {
      var _addProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(_, _ref11, _ref12) {
        var input, token, title, description, price, whislist, category, image, submit, userAuth, user, newProduct, savedProduct, getProducts, getAllProducts;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                input = _ref11.input;
                token = _ref12.req.headers.token;
                title = input.title, description = input.description, price = input.price, whislist = input.whislist, category = input.category, image = input.image, submit = input.submit;
                _context14.next = 5;
                return (0, _authenticagtion.authen)(token);

              case 5:
                userAuth = _context14.sent;
                _context14.next = 8;
                return _User["default"].findOne({
                  _id: userAuth.id
                });

              case 8:
                user = _context14.sent;

                if (user) {
                  _context14.next = 11;
                  break;
                }

                throw new Error('You have to login!');

              case 11:
                newProduct = new _Product["default"]({
                  title: title,
                  description: description,
                  price: price,
                  whislist: whislist,
                  category: category,
                  image: image,
                  submit: submit
                });
                newProduct.userId = user._id;
                _context14.next = 15;
                return newProduct.save();

              case 15:
                savedProduct = _context14.sent;
                _context14.t0 = JSON;
                _context14.next = 19;
                return _redis["default"].get('products');

              case 19:
                _context14.t1 = _context14.sent;
                getProducts = _context14.t0.parse.call(_context14.t0, _context14.t1);

                if (!getProducts) {
                  _context14.next = 27;
                  break;
                }

                getProducts.push(savedProduct);
                _context14.next = 25;
                return _redis["default"].set('products', JSON.stringify(getProducts));

              case 25:
                _context14.next = 32;
                break;

              case 27:
                _context14.next = 29;
                return _Product["default"].find();

              case 29:
                getAllProducts = _context14.sent;
                _context14.next = 32;
                return _redis["default"].set('products', JSON.stringify(getAllProducts));

              case 32:
                return _context14.abrupt("return", newProduct);

              case 33:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function addProduct(_x21, _x22, _x23) {
        return _addProduct.apply(this, arguments);
      }

      return addProduct;
    }(),
    updateProduct: function () {
      var _updateProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(_, _ref13, _ref14) {
        var id, input, token, title, description, price, whislist, category, image, submit, userAuth, user, updateProduct, products, newProducts, allProducst;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                id = _ref13.id, input = _ref13.input;
                token = _ref14.req.headers.token;
                title = input.title, description = input.description, price = input.price, whislist = input.whislist, category = input.category, image = input.image, submit = input.submit;
                _context15.next = 5;
                return (0, _authenticagtion.authen)(token);

              case 5:
                userAuth = _context15.sent;
                _context15.next = 8;
                return _User["default"].findOne({
                  _id: userAuth.id
                });

              case 8:
                user = _context15.sent;

                if (user) {
                  _context15.next = 11;
                  break;
                }

                throw new Error('You have to login!');

              case 11:
                if ((0, _authenticagtion.author)({
                  userId: user._id,
                  prodId: id
                })) {
                  _context15.next = 13;
                  break;
                }

                throw new Error('You are not authorized!');

              case 13:
                _context15.next = 15;
                return _Product["default"].findOne({
                  _id: id
                });

              case 15:
                updateProduct = _context15.sent;
                updateProduct.title = title;
                updateProduct.description = description;
                updateProduct.price = price;
                updateProduct.whislist = whislist;
                updateProduct.category = category;
                updateProduct.image = image;
                updateProduct.submit = submit;
                _context15.next = 25;
                return updateProduct.save();

              case 25:
                _context15.t0 = JSON;
                _context15.next = 28;
                return _redis["default"].get('products');

              case 28:
                _context15.t1 = _context15.sent;
                products = _context15.t0.parse.call(_context15.t0, _context15.t1);
                newProducts = products.filter(function (el) {
                  return el._id != id;
                });

                if (!newProducts.length) {
                  _context15.next = 37;
                  break;
                }

                newProducts.push(updateProduct);
                _context15.next = 35;
                return _redis["default"].set('products', JSON.stringify(newProducts));

              case 35:
                _context15.next = 42;
                break;

              case 37:
                _context15.next = 39;
                return _Product["default"].find();

              case 39:
                allProducst = _context15.sent;
                _context15.next = 42;
                return _redis["default"].set('products', JSON.stringify(allProducst));

              case 42:
                return _context15.abrupt("return", {
                  result: 'Succesfully updated product!'
                });

              case 43:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function updateProduct(_x24, _x25, _x26) {
        return _updateProduct.apply(this, arguments);
      }

      return updateProduct;
    }(),
    deleteProduct: function () {
      var _deleteProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_, _ref15, _ref16) {
        var id, token, userAuth, user, products, newProducts, getAllProducts;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                id = _ref15.id;
                token = _ref16.req.headers.token;
                _context16.next = 4;
                return (0, _authenticagtion.authen)(token);

              case 4:
                userAuth = _context16.sent;
                _context16.next = 7;
                return _User["default"].findOne({
                  _id: userAuth.id
                });

              case 7:
                user = _context16.sent;

                if (user) {
                  _context16.next = 10;
                  break;
                }

                throw new Error('You have to login!');

              case 10:
                if (!(0, _authenticagtion.author)({
                  userId: user._id,
                  prodId: id
                })) ;
                _context16.next = 13;
                return _Product["default"].deleteOne({
                  _id: id
                });

              case 13:
                _context16.t0 = JSON;
                _context16.next = 16;
                return _redis["default"].get('products');

              case 16:
                _context16.t1 = _context16.sent;
                products = _context16.t0.parse.call(_context16.t0, _context16.t1);
                newProducts = products.filter(function (el) {
                  return el._id != id;
                });

                if (!newProducts.length) {
                  _context16.next = 24;
                  break;
                }

                _context16.next = 22;
                return _redis["default"].set('products', JSON.stringify(newProducts));

              case 22:
                _context16.next = 29;
                break;

              case 24:
                _context16.next = 26;
                return _Product["default"].find();

              case 26:
                getAllProducts = _context16.sent;
                _context16.next = 29;
                return _redis["default"].set('products', JSON.stringify(getAllProducts));

              case 29:
                return _context16.abrupt("return", {
                  result: 'Successfully deleted product!'
                });

              case 30:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function deleteProduct(_x27, _x28, _x29) {
        return _deleteProduct.apply(this, arguments);
      }

      return deleteProduct;
    }(),
    addTransaction: function () {
      var _addTransaction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(_, _ref17, _ref18) {
        var input, token, userAuth, user, userTarget, productOriginal, productTarget, transaction, newTrans;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                input = _ref17.input;
                token = _ref18.req.headers.token;
                _context17.prev = 2;
                _context17.next = 5;
                return (0, _authenticagtion.authen)(token);

              case 5:
                userAuth = _context17.sent;
                _context17.next = 8;
                return _User["default"].findOne({
                  _id: userAuth.id
                });

              case 8:
                user = _context17.sent;
                userTarget = input.userTarget, productOriginal = input.productOriginal, productTarget = input.productTarget;

                if (user) {
                  _context17.next = 12;
                  break;
                }

                throw new Error('You have to login!');

              case 12:
                transaction = new _Transaction["default"]({
                  userOriginal: userAuth.id,
                  userTarget: userTarget,
                  productOriginal: productOriginal,
                  productTarget: productTarget
                });
                _context17.next = 15;
                return transaction.save();

              case 15:
                newTrans = _context17.sent;
                return _context17.abrupt("return", newTrans);

              case 19:
                _context17.prev = 19;
                _context17.t0 = _context17["catch"](2);
                console.log(_context17.t0);
                return _context17.abrupt("return", _context17.t0);

              case 23:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, null, [[2, 19]]);
      }));

      function addTransaction(_x30, _x31, _x32) {
        return _addTransaction.apply(this, arguments);
      }

      return addTransaction;
    }()
  }
};
exports.resolvers = resolvers;
//# sourceMappingURL=index.js.map