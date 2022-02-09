let url  	= require('url');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
var cors=require('cors');


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.raw({limit: '50mb'}));
app.use(bodyParser.text({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false ,limit: '50mb'}));
app.use(cors({origin:true,credentials: true}));
let q;
exports.setup = function(handles, onerr ) {
    if(!handles){
        return;
    }
    this.handles = handles;
    app.get('/*', async function(req, res){
        q = url.parse(req.url, true);
        Object.assign(q.query,req.body);
        q["method"]="get";
        try {
            await processRequest(q,handles,res);
        } catch (error) {
            r = {"status":500,"massage":"Call funtion list error.", "data":error};
            res.write(JSON.stringify(r));
            res.end();
            return;
        }
        res.end();
        return
        // res.status(200).send("Get Hello World.");
    });
    app.post('/*',async function(req, res){
        q = url.parse(req.url, true);
        Object.assign(q.query,req.body);
        q["method"]="post";
        try {
            await processRequest(q,handles,res);
        } catch (error) {
            r = {"status":500,"massage":"Call funtion list error.", "data":error.toString()};
            res.write(JSON.stringify(r));
            res.end();
            return;
        }
        // res.status(200).send("Post Hello World.");
    });
    app.patch('/*',async function(req, res){
        q = url.parse(req.url, true);
        Object.assign(q.query,req.body);
        q["method"]="patch";
        try {
            await processRequest(q,handles,res);
        } catch (error) {
            r = {"status":500,"massage":"Call funtion list error.", "data":error};
            res.write(JSON.stringify(r));
            res.end();
            return;
        }
        // res.status(200).send("Patch Hello World.");
    });
    app.delete('/*',async function(req, res){
        q = url.parse(req.url, true);
        Object.assign(q.query,req.body);
        q["method"]="delete";
        try {
            await processRequest(q,handles,res);
        } catch (error) {
            r = {"status":500,"massage":"Call funtion list error.", "data":error};
            res.write(JSON.stringify(r));
            res.end();
            return;
        }
        
        // res.status(200).send("Delete Hello World.");
    });
    this.server = app.listen(process.env.NODE_PORT, () => console.log(" ajaxserver.js - opening server ajax port = "+process.env.NODE_PORT+"."));
}

async function processRequest(q, handles, res) {
    let path = q.pathname.substring(1);
    res.writeHead(200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
    if (handles!=undefined&&handles.length>0){
		for(let i=0; i<handles.length; i++) {
			if ( (handles[i].path!==undefined?(handles[i].path==path):true) && handles[i].method==q.method) {
                await handles[i].handle(q.query,function(r){
                    res.write(JSON.stringify(r));
                    res.end();
                });
                return;
			}
		}
	}
    r = {"status":500,"massage":"Path not found.", "data":"Path:"+path+" not found."};
	res.write(JSON.stringify(r));
	res.end();
	return;
};

