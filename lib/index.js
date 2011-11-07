(function() {
  var Hook, colors, fs, path, util, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Hook = require('hook.io').Hook;
  util = require('util');
  colors = require('colors');
  path = require('path');
  fs = require("fs");
  _ = require('underscore');
  require('pkginfo')(module, 'version', 'hook');
  exports.Mock = (function() {
    __extends(Mock, Hook);
    function Mock(options) {
      this._removeMock = __bind(this._removeMock, this);
      this._addMock = __bind(this._addMock, this);
      this._anyCalled = __bind(this._anyCalled, this);
      this._fireActions = __bind(this._fireActions, this);
      this._isMatch = __bind(this._isMatch, this);
      var self;
      this.mocks = [];
      self = this;
      Hook.call(self, options);
      self.on("hook::ready", function() {
        var item, _i, _len, _ref, _results;
        self.onAny(__bind(function(data) {
          return self._anyCalled(self.event, data);
        }, this));
        self.on("mock::add", function(data) {
          return self._addMock(data.mock);
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
    }
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
    Mock.prototype._addMock = function(mock) {
      this.mocks.push(mock);
      return this.emit("mock::added", {
        name: mock.name
      });
    };
    Mock.prototype._removeMock = function(data) {
      var toRemove;
      toRemove = _.select(this.mocks, function(x) {
        return x.name === data.name;
      });
      this.mocks = _.reject(this.mocks, function(x) {
        return x.name === data.name;
      });
      return this.emit("mock::removed", {
        name: data.name,
        removed: toRemove
      });
    };
    return Mock;
  })();
}).call(this);
