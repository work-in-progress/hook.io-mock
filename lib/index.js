(function() {
  var Hook, Mock, colors, fs, path, util;
  Hook = require('hook.io').Hook;
  util = require('util');
  colors = require('colors');
  path = require('path');
  fs = require("fs");
  require('pkginfo')(module, 'version', 'hook');
  Mock = exports.Mock = function(options) {
    var self;
    self = this;
    Hook.call(self, options);
    return self.on("hook::ready", function() {
      var item, _i, _len, _ref, _results;
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
  Mock.prototype._addMock = function(data) {
    return this.emit("mock::added", {
      name: null
    });
  };
  /*
    console.log "Archiving #{data.source.length} files to #{data.mockget}".cyan
  
    params = [ "-cf", data.mockget ]
    params.push fileName for fileName in data.source
  
    data.mockget = path.normalize data.mockget
    @_runCommand "mock",params,"mock::archive-complete",data
  */
  Mock.prototype._removeMock = function(data) {
    return this.emit("mock::removed", {
      name: data.name
    });
  };
}).call(this);
