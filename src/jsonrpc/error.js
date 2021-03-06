// Copyright 2015 Michael Bürge <mib@orino.ch>
// All rights reserved.


goog.provide('jsonrpc.ErrorCode');
goog.provide('jsonrpc.Error');



/**
 * @enum {number}
 * http://xmlrpc-epi.sourceforge.net/specs/rfc.fault_codes.php
 */
jsonrpc.ErrorCode = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
  TRANSPORT_ERROR: -32300,

  APPLICATION_ERROR: -32000,
};


/**
 * @type {Object.<number,string>}
 */
jsonrpc.errorMessages = (function() {
  var o = {};
  o[jsonrpc.ErrorCode.PARSE_ERROR] = 'Parse error.';
  o[jsonrpc.ErrorCode.INVALID_REQUEST] = 'Invalid request.';
  o[jsonrpc.ErrorCode.METHOD_NOT_FOUND] = 'Method not found.';
  o[jsonrpc.ErrorCode.INVALID_PARAMS] = 'Invalid params.';
  o[jsonrpc.ErrorCode.INTERNAL_ERROR] = 'Internal error.';
  o[jsonrpc.ErrorCode.TRANSPORT_ERROR] = 'Transport error.';
  o[jsonrpc.ErrorCode.APPLICATION_ERROR] = 'Application error.';
  return o;
})();



/**
 * @param {number} code
 * @param {string=} opt_msg
 * @param {*=} opt_data
 * @constructor
 */
jsonrpc.Error = function(code, opt_msg, opt_data) {
  /** @type {number} */
  this.code = code;

  /** @type {string} */
  this.message = opt_msg || jsonrpc.errorMessages[code] || '';

  /** @type {*} */
  this.data = opt_data;
};


/**
 * @param {Object} jsonError
 * @return {jsonrpc.Error}
 */
jsonrpc.Error.fromJson = function(jsonError) {
  return new jsonrpc.Error(jsonError['code'], jsonError['message'], jsonError['data']);
};


/**
 * NOTE: No need to actually do something. The JSON.stringify() handles
 * jsonrpc.Error-instances just fine.
 * This is left here to illustrate that jsonrpc.Error-instances end up being
 * passed JSON.stringify().
 * @return {!Object}
 */
jsonrpc.Error.prototype.toJSON = function() {
  return this;
};


/** @return {string} */
jsonrpc.Error.prototype.toString = function() {
  return this.message;
};



