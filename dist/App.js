"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logo = _interopRequireDefault(require("./logo.svg"));

require("./App.css");

var _reactRouterDom = require("react-router-dom");

var _LoginComponent = _interopRequireDefault(require("./components/LoginComponent"));

var _SignUpComponent = _interopRequireDefault(require("./components/SignUpComponent"));

var _TestComponent = _interopRequireDefault(require("./components/TestComponent"));

var _useToken2 = _interopRequireDefault(require("./hooks/useToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  var tokenString = sessionStorage.getItem('token');
  var userToken = JSON.parse(tokenString);
  return userToken === null || userToken === void 0 ? void 0 : userToken.token;
}

function App() {
  var _useToken = (0, _useToken2.default)(localStorage),
      token = _useToken.token,
      setToken = _useToken.setToken;

  console.log(token);
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card w-50 mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/React.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/login",
    element: /*#__PURE__*/React.createElement(_LoginComponent.default, {
      setToken: setToken,
      loginUrl: "http://localhost:8001/login",
      callbackOnSignIn: function callbackOnSignIn() {}
    })
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/signup",
    element: /*#__PURE__*/React.createElement(_SignUpComponent.default, {
      setToken: setToken,
      loginUrl: "http://localhost:8000/register",
      callbackOnSignUp: function callbackOnSignUp() {}
    })
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "/test",
    element: /*#__PURE__*/React.createElement(_TestComponent.default, null)
  }), /*#__PURE__*/React.createElement(_reactRouterDom.Route, {
    path: "*",
    element: /*#__PURE__*/React.createElement(_reactRouterDom.Navigate, {
      to: "/signup",
      replace: true
    })
  })))))));
}

var _default = App; // module.exports = {
//   LoginComponent,
//   App
// }

exports.default = _default;