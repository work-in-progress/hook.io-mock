vows = require 'vows'
assert = require 'assert'

main = require '../lib/index'
specHelper = require './spec_helper'

vows.describe("integration_task")
  .addBatch
    "CLEANUP TEMP":
      topic: () ->
        specHelper.cleanTmpFiles []
      "THEN IT SHOULD BE CLEAN :)": () ->
        assert.isTrue true        
  .addBatch
    "SETUP HOOK" :
      topic: () -> 
        specHelper.setup @callback
        return
      "THEN IT SHOULD SET UP :)": () ->
        assert.isTrue true
  .addBatch
    "WHEN mocking a single trigger that emits a bar::foo event":
      topic: () ->
        specHelper.setMock
          name: "mock1"
          triggers: [
            "event" : "foo::bar"
          ]
          actions: [
            "event" : "bar::foo"
            ]
          
        specHelper.hookMeUp @callback
        specHelper.hook.emit "foo::bar", {}
        return
      "THEN it must receive the bar::foo event": (err,event,data) ->
        assert.equal event,"bar::foo" 
  .export module
