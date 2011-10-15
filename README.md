## About hook.io-mock

A hook to mock messages to debug your composite hooks. It listens to messages and replies with messages and custom data if a match is found. VERY 0.0.1

This is the very first version, it is not feature complete. Look at the mock-spec.coffee and spec_helper.coffee files how it can be used.

![Mock Icon](http://github.com/scottyapp/hook.io-mock/raw/master/assets/mock114x114.png)

[![Build Status](https://secure.travis-ci.org/scottyapp/hook.io-mock.png)](http://travis-ci.org/scottyapp/hook.io-mock.png)


## Install

npm install -g hook.io-mock

## Usage

	./bin/hookio-mock 

This starts a hook and reads the local config.json. 

### Messages

mock::add [in]

	mock: the mock to add. Make sure it has a name to be able to remove it. Required

mock::remove [in]

	name: the name of the mock to remove. Required.

mock::error [out]


mock::added [out]

	name: the name, if available

mock::removed [out]

	name: the name
	
### Hook.io Schema support 

The package config contains experimental hook.io schema definitions. The definition is also exported as hook. Signatures will be served from a signature server (more to come).

### Coffeescript

	Mock = require("hook.io-mock").Mock
	hook = new Mock(name: 'mock')
 
### Javascript

	var Mock = require("hook.io-mock").Mock;
	var hook = new Mock({ name: 'mock' });

## Advertising :)

Check out 

* http://freshfugu.com 
* http://scottyapp.com

Follow us on Twitter at 

* @getscottyapp
* @freshfugu 
* @martin_sunset

and like us on Facebook please. Every mention is welcome and we follow back.

## Trivia

Listened to the Sucker Punch soundtrack while writing this. Not sure what to make of the movie, but I love the soundtrack.

## Release Notes

### 0.0.3

* Clarified example config ...

### 0.0.2

* The forgotten remove method has been added...

### 0.0.1

* First version

## Internal Stuff

* npm run-script watch

# Publish new version

* Change version in package.json
* git tag -a v0.0.3 -m 'version 0.0.3'
* git push --tags
* npm publish

## Contributing to hook.io-mock
 
* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Smockt a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* Please try not to mess with the package.json, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

## Copyright

Copyright (c) 2011 Martin Wawrusch. See LICENSE for
further details.


