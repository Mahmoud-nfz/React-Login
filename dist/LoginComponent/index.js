import React from "react";
import { useState } from "react";
import bcrypt from "bcryptjs";
import './style.css'; // import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../assets/fontawesome-free-6.1.1-web/css/all.css'

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const salt = bcrypt.genSaltSync(10);

  const handleSubmit = () => {
    // event.preventDefault();
    console.log(email, pass);
    const hashedPass = bcrypt.hashSync(pass, '$2a$10$CwTycUXWue0Thq9StjUM0u');
    console.log(hashedPass);

    if (pass !== "123") {
      // Invalid password
      setErrorMessages({
        name: "pass",
        message: "invalid pass"
      });
    }
  };

  const renderErrorMessage = name => name === errorMessages.name && /*#__PURE__*/React.createElement("div", {
    className: "error alert-danger"
  }, errorMessages.message);

  return /*#__PURE__*/React.createElement("div", {
    className: "container p-3"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-outline mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "form2Example1"
  }, "Email address : "), /*#__PURE__*/React.createElement("input", {
    value: email,
    type: "email",
    name: "email",
    id: "form2Example1",
    className: "form-control",
    onChange: e => setEmail(e.target.value)
  })), renderErrorMessage("email"), /*#__PURE__*/React.createElement("div", {
    className: "form-outline mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "form2Example2"
  }, "Password : "), /*#__PURE__*/React.createElement("input", {
    value: pass,
    type: "password",
    name: "pass",
    id: "form2Example2",
    className: "form-control",
    onChange: e => setPass(e.target.value)
  })), renderErrorMessage("pass"), /*#__PURE__*/React.createElement("div", {
    className: "row mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-check"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-check-input",
    type: "checkbox",
    value: "",
    id: "form2Example31",
    checked: true
  }), /*#__PURE__*/React.createElement("label", {
    className: "form-check-label",
    htmlFor: "form2Example31"
  }, " Remember me "))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#!"
  }, "Forgot password?"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary btn-block mb-4",
    onClick: handleSubmit
  }, "Sign in"), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("p", null, "Not a member? ", /*#__PURE__*/React.createElement("a", {
    href: "#!"
  }, "Register")), /*#__PURE__*/React.createElement("p", null, "or sign up with:"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-link btn-floating mx-1"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-facebook-f"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-link btn-floating mx-1"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-google"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-link btn-floating mx-1"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-twitter"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-link btn-floating mx-1"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-github"
  })))));
}

export default LoginComponent;