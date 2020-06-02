"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

var _apolloServerExpress = require("apollo-server-express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = require("./schemas/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var express = require('express');

var session = require('express-session');

var startServer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var server, app;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            server = new _apolloServerExpress.ApolloServer({
              typeDefs: _index.typeDefs,
              resolvers: _index.resolvers,
              context: function context(_ref2) {
                var req = _ref2.req,
                    res = _ref2.res;
                return {
                  req: req,
                  res: res
                };
              }
            });

            _mongoose["default"].connect('mongodb://localhost:27017/ketuker', {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true
            });

            app = express();
            app.use(session({
              secret: 'asdjlfkaasdfkjlads',
              resave: false,
              saveUninitialized: false
            }));
            server.applyMiddleware({
              app: app,
              cors: {
                credentials: true,
                origin: 'http://localhost:3000'
              }
            });
            app.listen({
              port: 4000
            }, function () {
              return console.log("\uD83D\uDE80 Server ready at http://localhost:4000".concat(server.graphqlPath));
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

startServer();
//# sourceMappingURL=index.js.map