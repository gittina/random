//express lib
var express = require('express');
//general lib
var app = express();
//inspect
var util = require('util');
//Cross-Origin Resource Sharing (CORS), used for enabling pre-flight option
cors = require('cors');

//user manager
var userManager = require('./userManager.js');

//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());// JSON

//set up the server
app.set('port', (process.env.PORT || 5000));
//enable pre-flight authoriuzation
app.options('*', cors());

/**
 * @brief resource that returns the static page "Hello World".
 * @return the static pahe "Hello World".
 */
app.get('/world', function(request, response) 
{
      var headers = {};
      //answer
      headers["Content-Type"] = "text/html";
      response.writeHead(200, headers);

    response.end("hello world");

});

/**
 * @brief resource that returns the static page "Hello Planet".
 * @return the static pahe "Hello planet".
 */
app.get('/planet', function(request, response) 
{
      var headers = {};
      //answer
      headers["Content-Type"] = "text/html";
      response.writeHead(200, headers);

    response.end("hello planet");

});

/**
 * @brief resource that returns a page with the most used username.
 * @return a page with the name of the most used username.
 */
app.get('/pers/stat', function(request, response) 
{
      var headers = {};
      //answer
      headers["Content-Type"] = "text/html";
      response.writeHead(200, headers);

    response.end(userManager.mostUsed());

});

/**
 * @brief resource that returns greting for Sir.
 * @param string username the username for the greetings.
 * @return a static page with the greeting "hello, Mr" and the name of the user, if the parameter is missing a 406 code header is sent.
 */
app.post('/pers/male', function(request, response) 
{
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      //answer
      headers["Content-Type"] = "text/html";

	var username;

	if ( typeof request.body !== 'undefined' && request.body)
	{
		
		//do stuff if query is defined and not null
		if ( typeof request.body.username !== 'undefined' && request.body.username)
            {
			 username = request.body.username;
             userManager.storeUsername(username);   
            }
		else 
			username = "not defined";
	
	}
	else
	{
		username = "body undefined";
    
	}
    
    console.log(request.body);
    
    //test output and write the proper headers
    if (username!="not defined" && username!="body undefined")
        //aceptable input
        response.writeHead(200, headers);
    else    
        //unaceptable input
        response.writeHead(406, headers);
    
    response.end("hello, Mr " + username);

});

/**
 * @brief resource that returns greting for Ladys.
 * @param string username the username for the greetings.
 * @return a static page with the greeting "hello, Ms" and the name of the user, if the parameter is missing a 406 code header is sent.
 */
app.post('/pers/female', function(request, response) 
{
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      //answer
      headers["Content-Type"] = "text/html";
      

	var username;

	if ( typeof request.body !== 'undefined' && request.body)
	{
		
		//do stuff if query is defined and not null
		if ( typeof request.body.username !== 'undefined' && request.body.username)
            {
			 username = request.body.username;
             userManager.storeUsername(username);   
            }
		else 
			username = "not defined";

		
	}
	else
	{
		username = "body undefined";
	}

    //test output and write the proper headers
    if (username!="not defined" && username!="body undefined")
        //aceptable input
        response.writeHead(200, headers);
    else    
        //unaceptable input
        response.writeHead(406, headers);
    
    response.end("hello, Ms " + username);

});

/**
 * @brief resource that returns greting in JSON format.
 * @param string username the username for the greetings.
 * @return a JSON object with two parameter, the target (the user name) and the greetings
 */
app.post('/pers/json', function(request, response) 
{
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      //answer
      headers["Content-Type"] = "application/json";
      

	var username;

	if ( typeof request.body !== 'undefined' && request.body)
	{
		
		//do stuff if query is defined and not null
		if ( typeof request.body.username !== 'undefined' && request.body.username)
            {
			 username = request.body.username;
             userManager.storeUsername(username);   
            }
		else 
			username = "not defined";
		
	}
	else
	{
		username = "body undefined";
	}
    
    //test output and write the proper headers
    if (username!="not defined" && username!="body undefined")
        //aceptable input
        response.writeHead(200, headers);
    else    
        //unaceptable input
        response.writeHead(406, headers);
    
    //answer a JSON file
	var json = JSON.stringify({ 
    	greetings: "hello", 
    	target: username
	});
    
    response.end(json);

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});