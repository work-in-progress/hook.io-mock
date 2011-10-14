Hook = require('hook.io').Hook
util = require 'util'
colors = require 'colors'
path = require 'path'
fs = require "fs"

require('pkginfo')(module,'version','hook')
  
Mock = exports.Mock = (options) ->
  self = @
  Hook.call self, options
  
  self.on "hook::ready", ->  
  
    self.on "mock::add", (data)->
      self._addMock(data)

    self.on "mock::remove", (data)->
      self._removeMock(data)
      
    for item in (self.mocks || [])
      self.emit "mock::add",
        mock : item
    
util.inherits Mock, Hook


Mock.prototype._addMock = (data) ->
  ##@emit "mock::error", data
  
  @emit "mock::added", 
    name : null
    
###
  console.log "Archiving #{data.source.length} files to #{data.mockget}".cyan

  params = [ "-cf", data.mockget ]
  params.push fileName for fileName in data.source

  data.mockget = path.normalize data.mockget
  @_runCommand "mock",params,"mock::archive-complete",data
###
      
Mock.prototype._removeMock = (data) ->
#data.mockgetPath = path.normalize data.mockgetPath if data.MockgetPath
  ##@emit "mock::error", data

  @emit "mock::removed", 
    name : data.name
  
  