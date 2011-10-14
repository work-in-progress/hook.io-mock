(function() {
  var Hook, Mock, colors, fs, path, util, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Hook = require('hook.io').Hook;
  util = require('util');
  colors = require('colors');
  path = require('path');
  fs = require("fs");
  _ = require('underscore');
  require('pkginfo')(module, 'version', 'hook');
  Mock = exports.Mock = function(options) {
    var self;
    this.mocks = [];
    self = this;
    Hook.call(self, options);
    return self.on("hook::ready", function() {
      var item, _i, _len, _ref, _results;
      self.onAny(__bind(function(data) {
        return self._anyCalled(self.event, data);
      }, this));
      self.on("mock::add", function(data) {
        return self._addMock(data);
      });
      self.on("mock::remove", function(data) {
        return self._removeMock(data);
      });
      _ref = self.mocks || [];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(self.emit("mock::add", {
          mock: item
        }));
      }
      return _results;
    });
  };
  util.inherits(Mock, Hook);
  Mock.prototype._isMatch = function(eventName, mock) {
    var trigger, _i, _len, _ref;
    _ref = mock.triggers || [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      trigger = _ref[_i];
      if (trigger.event === eventName) {
        return true;
      }
    }
    return null;
  };
  Mock.prototype._fireActions = function(mock) {
    var action, _i, _len, _ref, _results;
    _ref = mock.actions || [];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      action = _ref[_i];
      _results.push(this.emit(action.event, action.data || {}));
    }
    return _results;
  };
  Mock.prototype._anyCalled = function(eventName, data) {
    var mock, _i, _len, _ref, _results;
    _ref = this.mocks || [];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      mock = _ref[_i];
      _results.push(this._isMatch(eventName, mock) ? this._fireActions(mock) : void 0);
    }
    return _results;
  };
  Mock.prototype._addMock = function(data) {
    this.mocks.push(data.mock);
    return this.emit("mock::added", {
      name: data.mock.name
    });
  };
  Mock.prototype._removeMock = function(data) {
    return this.emit("mock::removed", {
      name: data.name
    });
  };
}).call(this);
