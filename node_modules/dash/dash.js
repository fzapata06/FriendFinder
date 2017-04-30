// Dash.js v0.3.0
// (c) 2011 Paul Colton
// See LICENSE file for licensing information or 
// visit http://dashjs.com

var	fs	= require("fs"),
	connect	= require("connect"),
	nowjs	= require("now");

module.exports = new function()
{
	var root = this;

	var _templatesPath = "templates";
	var _httpServer;
	var _templates;
	var _templatesExtension = {};
	var _onDashlinkLoadCallback = [];
	var _onDashlinkSaveCallback = [];

	// Version number.
	this.version = "0.3.0";

	// Create a reference to the connect module.
	this.connect = connect;

	this.initialize = function(options)
	{
		if(options && options.templatesPath)
		{
			_templatesPath = options.templatesPath;
		}

		_httpServer = connect.createServer();
		_templates = _loadTemplates(_templatesPath);

		root.io = nowjs.initialize(_httpServer);

		root.io.dashlinkLoad = _onDashlinkLoad;
		root.io.dashlinkSave = _onDashlinkSave;

		root.io.now._getTemplates = _getTemplates;
		root.io.now._dashlinkLoad = _dashlinkLoad;
		root.io.now._dashlinkSave = _dashlinkSave;
	}

	this.listen = function(port)
	{
		var _port = parseInt(port, 10);

		if(_httpServer) 
		{
			_httpServer.listen(_port);
			console.log("Dash.js v" + this.version + " listening on port " + _port);
		}
	}

	this.getServer = function()
	{
		return _httpServer;
	}

	// Private functions.

	var _onDashlinkLoad = function(callback)
	{
		_onDashlinkLoadCallback.push(callback);	
	}

	var _onDashlinkSave = function(callback)
	{
		_onDashlinkSaveCallback.push(callback);	
	}

	var _dashlinkLoad = function(name, data)
	{
		for(var i=0; i<_onDashlinkLoadCallback.length; i++)
		{
			var callback = _onDashlinkLoadCallback[i];
			callback(name, data);
		}
	}

	var _dashlinkSave = function(name, data)
	{
		for(var i=0; i<_onDashlinkSaveCallback.length; i++)
		{
			var callback = _onDashlinkSaveCallback[i];
			callback(name, data);
		}
	}

	var _onUserConnected = function()
	{
		for(var i=0; i<_onUserConnectedCallback.length; i++)
		{
			var callback = _onUserConnectedCallback[i];
			callback(this.now);
		}
	}

	var _onUserDisconnected = function()
	{
		for(var i=0; i<_onUserDisconnectedCallback.length; i++)
		{
			var callback = _onUserDisconnectedCallback[i];
			callback(this.now);
		}
	}

	var _getTemplates = function(callback)
	{
		callback(_templates);
	}

	var _loadTemplates = function(path)
	{
		var _templatesExtension = _makeSuffixRegExp(".html");
		var results = {};
		var files = fs.readdirSync(path);
	
		for(f in files)
		{
			var filename = files[f];

			if(_templatesExtension.test(filename))
			{
				var data = fs.readFileSync(path + '/' + filename, "utf8");
				var templateName = filename.substring(0, filename.indexOf('.'));
				results[templateName] = data;
				console.log("Loaded template: '" + templateName + 
					"' from '" + path + '/' + filename + "'");
			}
		}
	
		return results;
	}

	var _makeSuffixRegExp = function(suffix, caseInsensitive)
	{
	  return new RegExp(
		  String(suffix).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&") + "$",
		  caseInsensitive ? "i" : "");
	}
}
