"use strict";

function validateEmail(input) {
  var res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var checks = {};
  checks["is a valid email adress"] = res.test(String(input).toLowerCase());
  var verdict = res.test(String(input).toLowerCase());
  return {
    verdict: verdict,
    checks: checks
  };
}

function validatePass(input) {
  var checks = {};
  checks["minimum 8 characters"] = input.length >= 8;
  checks["at least one lowercase letter"] = input.toUpperCase() !== input;
  checks["at least one uppercase letter"] = input.toLowerCase() !== input;
  checks["at least one number"] = /\d/.test(input);
  var verdict = true;

  for (var key in verdict) {
    verdict &= checks[key];
  }

  return {
    verdict: verdict,
    checks: checks
  };
}

module.exports = {
  validateEmail: validateEmail,
  validatePass: validatePass
};