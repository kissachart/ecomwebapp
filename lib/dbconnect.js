var mysql = require('mysql');

exports.dbconfig =  {
	host 	: '',
	port 	: '',
	user 	: '',
	password: '',
	database: '',
	connectTimeout: 30000
	
};

exports.setup = function (Database) {
    this.dbconfig.host = process.env.DB_HOST;
    this.dbconfig.port = process.env.DB_PORT;
    this.dbconfig.user = process.env.DB_USER;
	this.dbconfig.password = process.env.DB_PASSWORD;
	return this;
}

exports.connected = 0;		// 0=disconnected, 1=connected, -1=connecting.
//
exports.reconnect = function (cb,ecb) {
	// connect to database and performs automatically reconnect if the connection is tear down.
	console.log("start db connect");
	if (db==undefined) db = this;
	db.connected = -1;		// connecting.
	//this.conn = mysql.createConnection( db.dbconfig );
        this.conn = mysql.createPool( db.dbconfig );	
}
//
exports.end	  = function(){
	this.conn.destroy();
}
exports.query = function (sql,onresult,onerr) {
	this.conn.query(sql,function(err, result, fields){ 
		if (err) {
			if (onerr !== undefined) onerr(err);		// perform ecb function when  detected error.
			return;
		}
		onresult(result)
	})
}