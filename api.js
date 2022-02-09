
let config			= require('dotenv').config();
global.db		 	        = require('./lib/dbconnect').setup();
global.ajaxHandle	= [];
global.GETMethod	= [];
global.POSTMethod	= [];
global.PATHMethod	= [];
global.DELETEMethod	= [];

global.ajax			= require('./lib/express').setup(ajaxHandle,
    function onerr(err) {
        console.log(err);
        process.exit();
    }
  );

  global.category             = require("./app/category/category");
  global.gender             	= require("./app/gender/gender");
  global.size                 = require("./app/size/size");
  global.produce              = require("./app/produce/produce");
  global.order                = require("./app/order/order");
  function initdb() {
	db.reconnect( 
		function(){
			// application
			console.log(' connect to database successfully, process start.');
		},
		function(err) {
			// error handle.
            console.log(err);
			if (db.connected==0) setTimeout(function(){ initdb() }, 60000);
		}
    );
    
}
initdb();
