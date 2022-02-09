function query_database(query_text){
    return new Promise(function (fulfill, reject){
        db.query(query_text
        , onresult, onerr);
        //
        function onresult(result) {
            if (result.length >0){
                fulfill(result);
            }
            else{
                fulfill("");
            }
        }
        function onerr(err) {
            console.log("start function error");
            console.log(err);
        // database error set error code to 99999
            reject(-99);
        }
    })
}
let moment = require('moment');

ajaxHandle.push({
    method:"post",
    path: "order",
    handle: async function (q, res) {
        if(!q.PRODUCE_ID||!q.ADDRESS){
            res({status:400,message:"Can not found PRODUCE_ID/ADDRESS in request", data:q});
            return
        }
        let queryText,insertCategory,feildName="",valueInsert="";
        try {
            if(q.STAMP_DATETIME){
                feildName = `STAMP_DATETIME`;valueInsert = `'`+q.STAMP_DATETIME+`'`;
            }
            else{
                feildName = `STAMP_DATETIME`;valueInsert = `'`+moment(new Date()).format("YYYY-MM-DD HH:mm:ss")+`'`;
            }
            if(q.PRODUCE_ID){
                feildName=(feildName)?feildName+`,PRODUCE_ID`:`PRODUCE_ID`;valueInsert=(valueInsert)?valueInsert+`,'`+q.PRODUCE_ID+`'`:`'`+q.PRODUCE_ID+`'`;
            }
            if(q.STATUS){
                if(q.STATUS!='Y'&&q.STATUS!='N'){
                    res({status:400,message:"STATUS must use Y/N"});
                    return;
                }
                feildName=(feildName)?feildName+`,STATUS`:`STATUS`;valueInsert=(valueInsert)?valueInsert+`,'`+q.STATUS+`'`:`'`+q.STATUS+`'`;
            }
            else{
                feildName=(feildName)?feildName+`,STATUS`:`STATUS`;valueInsert=(valueInsert)?valueInsert+`,'N'`:`'N'`;
            }
            if(q.ADDRESS){
                feildName=(feildName)?feildName+`,ADDRESS`:`ADDRESS`;valueInsert=(valueInsert)?valueInsert+`,'`+q.ADDRESS+`'`:`'`+q.ADDRESS+`'`;
            }
           
            queryText = `insert into ecomwebapp.order (`+feildName+`) values (`+valueInsert+`);`;
            insertCategory = await query_database(queryText);
            res({status:200,message:"success"});
            return;
        } catch (error) {
            res({status:500,message:"Call Database error", data:err.message});
            return;
        }
        
    }});

ajaxHandle.push({
    method:"patch",
    path: "order",
    handle: async function (q, res) {
        if(!q.ID){
            res({status:400,message:"Can not found ID in request", data:q});
            return
        }
        let queryText,checkData,updateCategory,set="";
        queryText = "select * from ecomwebapp.order o where o.ID ='"+q.ID+"';"
        try {
            checkData = await query_database(queryText);
            if (!checkData||checkData.length==0){
                res({status:200,message:"Order not found"});
                return;
            }
        } catch (error) {
            res({status:500,message:"Call Database error", data:err.message});
            return;
        }
        
        try {
            if(q.STAMP_DATETIME){
                set = ` STAMP_DATETIME = '`+q.STAMP_DATETIME+`' `;
            }
            if(q.PRODUCE_ID){
                set = (set)?set+`, PRODUCE_ID = '`+q.PRODUCE_ID+`' `:` PRODUCE_ID = '`+q.PRODUCE_ID+`' `;
            }
            if(q.STATUS){
                if(q.STATUS!='Y'&&q.STATUS!='N'){
                    res({status:400,message:"STATUS must use Y/N"});
                    return;
                }
                set = (set)?set+`, STATUS = '`+q.STATUS+`' `:` STATUS = '`+q.STATUS+`' `;
            }
            if(q.ADDRESS){
                set = (set)?set+`, ADDRESS = '`+q.ADDRESS+`' `:` ADDRESS = '`+q.ADDRESS+`' `;
            }
            
            queryText = `update ecomwebapp.order set `+set+` where ID = `+q.ID+`;`;
            updateCategory = await query_database(queryText);
            res({status:200,message:"success"});
            return;
        } catch (error) {
            res({status:500,message:"Call Database error", data:err.message});
            return;
        }
        
    }});

ajaxHandle.push({
    method:"delete",
    path: "order",
    handle: async function (q, res) {
        if(!q.ID){
            res({status:400,message:"Can not found ID in request", data:q});
            return
        }
        let queryText,checkData,deleteCategory;
        queryText = "select * from ecomwebapp.order o where o.ID ='"+q.ID+"';";
        try {
            checkData = await query_database(queryText);
            if (!checkData||checkData.length==0){
                res({status:404,message:"Id not found"});
                return;
            }
        } catch (error) {
            res({status:500,message:"Call Database error", data:err.message});
            return;
        }       
        try {
            queryText = `delete from ecomwebapp.order where ID = `+q.ID+`;`;
            deleteCategory = await query_database(queryText);
            res({status:200,message:"success"}); 
            return;
        } catch (error) {
            res({status:500,message:"Call Database error", data:err.message});
            return;
        }        
    }});

ajaxHandle.push({
    method:"get",
    path: "order",
    handle: async function (q, res) {
        let queryText,get,page=0,limit,andwhere=``,maxpage=0,index=0,getAllrecord,dataReturn;
        try {
            if(q.LIMIT){
                limit = ` limit `+q.LIMIT ;
            }
            if(q.PAGE!=""&&q.PAGE!=undefined){
                q.PAGE = ((q.PAGE-1)<0)?0:q.PAGE-1;
                var pageNumber = q.PAGE*q.LIMIT;
                limit = " limit "+pageNumber+","+q.LIMIT+" "; 
            }
            if((q.START_DATETIME&&!q.STOP_DATETIME)||(!q.START_DATETIME&&q.STOP_DATETIME)){
                res({status:400,message:"DATETIME must have START_DATETIME and STOP_DATETIME."});
                return;
            }
            if(q.START_DATETIME&&q.STOP_DATETIME){
                andwhere = ` where o.STAMP_DATETIME between '`+q.START_DATETIME+`' and '`+q.STOP_DATETIME+`'`;
            }
            if(q.PRODUCE_ID){
                andwhere = (andwhere)?andwhere+` and o.PRODUCE_ID = '`+q.PRODUCE_ID+`' `:` where o.PRODUCE_ID = '`+q.PRODUCE_ID+`' `;
            }
            if(q.STATUS){
                andwhere = (andwhere)?andwhere+` and o.STATUS = '`+q.STATUS+`' `:` where o.STATUS = '`+q.STATUS+`' `;
            }
            if(q.ADDRESS){
                andwhere = (andwhere)?andwhere+` and o.ADDRESS = '`+q.ADDRESS+`' `:` where o.ADDRESS = '`+q.ADDRESS+`' `;
            }
            queryText = `select * from ecomwebapp.order o `+andwhere+limit;
            get = await query_database(queryText);
            if(!get||get.length==0){
                res({status:200,message:"success",data:"Data not found."});
                return;
            }
            queryText = `select count(o.ID) as 'all' from ecomwebapp.order o `+andwhere;
            getAllrecord = await query_database(queryText);
            maxPage = Math.ceil(getAllrecord[0].all/q.LIMIT);
            dataReturn = {allRecord:getAllrecord[0].all,maxPage:maxPage,PAGE:page.PAGE,limit:q.LIMIT,numInpage:get.length
                ,data:get}
            res({status:200,message:"success",data:dataReturn}); 
            return;
        } catch (error) {
            res({status:500,message:"Call Database error", data:err.message});
            return;
        }        
    }});