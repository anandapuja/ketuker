"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sendEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mail, sub, text) {
    var mailTransporter, mailDetails, isSuccess;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mailTransporter = _nodemailer["default"].createTransport({
              service: 'gmail',
              secure: false,
              port: 25,
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
              },
              tls: {
                rejectUnauthorized: false
              }
            });
            mailDetails = {
              from: process.env.EMAIL,
              to: mail,
              subject: sub,
              text: text
            };
            _context.next = 4;
            return mailTransporter.sendMail(mailDetails);

          case 4:
            isSuccess = _context.sent;
            console.log(isSuccess);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = sendEmail;
exports["default"] = _default;
//# sourceMappingURL=nodemailer.js.map