Project - todolovin
===================

Goal
-----
Build a simple API for an awesome todo app

Requirements
------

* It should be able to call the API using http
* It should have the following features
	* Add a todo
	* Mark a todo as done
	* Add one or more tags to a todo
	* Remove a todo
* A very simple proof of concept web app, querying the api

Definitions
------------
A todo is made up of

* What needs to be done
* When it's added
* Tags
* Optional meta data

Other
-------
No auth required, let's just assume all requests are safe.

Tech
-------
The api would preferrably be written using either Node JS or Python. Data storage can be any commonly used store (mongodb, redis, mysql, postgres etc)