Hook = require('hook.io').Hook
util = require 'util'
colors = require 'colors'
path = require 'path'
fs = require "fs"
_ = require 'underscore'

require('pkginfo')(module,'version','hook')

class exports.Mock extends Hook

  constructor: (options) ->  
    @.mocks = []  # Array of mock operations
  
    self = @
    Hook.call self, options
  
    self.on "hook::ready", ->  
      self.onAny (data) =>
        self._anyCalled self.event,data
      
      self.on "mock::add", (data)->
        self._addMock(data.mock)

      self.on "mock::remove", (data)->
        self._removeMock(data)
      
      for item in (self.mocks || [])
        self.emit "mock::add",
          mock : item

  _isMatch : (eventName,mock) =>
    for trigger in mock.triggers || []
      if trigger.event == eventName
        return true

    null
    
  _fireActions : (mock) =>
    for action in mock.actions || []
      @emit action.event, action.data || {}

  _anyCalled : (eventName,data) =>
    for mock in @.mocks || []
      if @_isMatch(eventName,mock)
        @_fireActions(mock)

  _addMock : (mock) =>
    ##@emit "mock::error", data
  
    @mocks.push mock
  
    @emit "mock::added", 
      name : mock.name
          
  _removeMock : (data) =>
    ##@emit "mock::error", data

    toRemove = _.select @mocks, (x) -> x.name == data.name

    @mocks = _.reject @mocks, (x) -> x.name == data.name

    @emit "mock::removed", 
      name : data.name
      removed : toRemove
  
  