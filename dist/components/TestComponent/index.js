"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TestComponent() {
  var users = ["user1", "user2", "user3"];
  var final = [];

  for (var _i = 0, _users = users; _i < _users.length; _i++) {
    var user = _users[_i];
    final.push( /*#__PURE__*/_react.default.createElement("li", {
      key: user
    }, user));
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement("ul", null, final));
}

var _default = TestComponent;
exports.default = _default;