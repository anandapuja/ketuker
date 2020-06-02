"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transactionSchema = new _mongoose["default"].Schema({
  userOriginal: {
    type: String,
    required: true
  },
  userTarget: {
    type: String,
    required: true
  },
  productOriginal: {
    type: Array,
    required: true
  },
  productTarget: {
    type: Array,
    required: true
  },
  status: {
    type: Boolean,
    "default": false
  }
});

var Transaction = _mongoose["default"].model('Transaction', transactionSchema);

var _default = Transaction;
exports["default"] = _default;
//# sourceMappingURL=Transaction.js.map