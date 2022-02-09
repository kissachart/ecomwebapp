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

ajaxHandle.push({
    method:"post",
    path: "produce",
    handle: async function (q, res) {
        if(!q.NAME){
            res({status:400,message:"Can not found NAME in request", data:q});
            return
        }
        let queryText,checkDuplicateName,insertCategory,feildName="",valueInsert="";
        queryText = "select * from ecomwebapp.produce g where g.Name ='"+q.NAME+"';"
        try {
            checkDuplicateName = await query_database(queryText);
            if (checkDuplicateName.length>0){
                res({status:200,message:"Duplicate Name", data:checkDuplicateName[checkDuplicateName.length-1]});
                return;
            }
        } catch (error) {
            res({status:500,message:"Call Database error", data:err.message});
            return;
        }
       
        try {
            if(q.NAME){
                feildName = `NAME`;valueInsert = `'`+q.NAME+`'`;
            }
            if(q.GENDER){
                feildName=(feildName)?feildName+`,GENDER`:`GENDER`;valueInsert=(valueInsert)?valueInsert+`,'`+q.GENDER+`'`:`'`+q.GENDER+`'`;
            }
            if(q.CATEGORY){
                feildName=(feildName)?feildName+`,CATEGORY`:`CATEGORY`;valueInsert=(valueInsert)?valueInsert+`,'`+q.CATEGORY+`'`:`'`+q.CATEGORY+`'`;
            }
            if(q.SIZE){
                feildName=(feildName)?feildName+`,SIZE`:`SIZE`;valueInsert=(valueInsert)?valueInsert+`,'`+q.SIZE+`'`:`'`+q.SIZE+`'`;
            }
            if(q.PRICE){
                feildName=(feildName)?feildName+`,PRICE`:`PRICE`;valueInsert=(valueInsert)?valueInsert+`,'`+q.PRICE+`'`:`'`+q.PRICE+`'`;
            }
            if(q.NUMBER){
                feildName=(feildName)?feildName+`,NUMBER`:`NUMBER`;valueInsert=(valueInsert)?valueInsert+`,'`+q.NUMBER+`'`:`'`+q.NUMBER+`'`;
            }
            queryText = `insert into ecomwebapp.produce (`+feildName+`) values (`+valueInsert+`);`;
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
    path: "produce",
    handle: async function (q, res) {
        if(!q.ID){
            res({status:400,message:"Can not found ID in request", data:q});
            return
        }
        let queryText,checkData,updateCategory,set="";
        queryText = "select * from ecomwebapp.produce p where p.ID ='"+q.ID+"';"
        try {
            checkData = await query_database(queryText);
            if (!checkData||checkData.length==0){
                res({status:200,message:"Produce not found"});
                return;
            }
        } catch (error) {
            res({status:500,message:"Call Database error", data:err.message});
            return;
        }
        
        try {
            if(q.NAME){
                set = ` NAME = '`+q.NAME+`' `;
            }
            if(q.GENDER){
                set = (set)?set+`, GENDER = '`+q.GENDER+`' `:` GENDER = '`+q.GENDER+`' `;
            }
            if(q.CATEGORY){
                set = (set)?set+`, CATEGORY = '`+q.CATEGORY+`' `:` CATEGORY = '`+q.CATEGORY+`' `;
            }
            if(q.SIZE){
                set = (set)?set+`, SIZE = '`+q.SIZE+`' `:` SIZE = '`+q.SIZE+`' `;
            }
            if(q.PRICE){
                set = (set)?set+`, PRICE = '`+q.PRICE+`' `:` PRICE = '`+q.PRICE+`' `;
            }
            if(q.NUMBER){
                set = (set)?set+`, NUMBER = '`+q.NUMBER+`' `:` NUMBER = '`+q.NUMBER+`' `;
            }
            queryText = `update ecomwebapp.produce set `+set+` where ID = `+q.ID+`;`;
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
    path: "produce",
    handle: async function (q, res) {
        if(!q.ID){
            res({status:400,message:"Can not found ID in request", data:q});
            return
        }
        let queryText,checkData,deleteCategory;
        queryText = "select * from ecomwebapp.produce p where p.ID ='"+q.ID+"';";
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
            queryText = `delete from ecomwebapp.produce where ID = `+q.ID+`;`;
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
    path: "produce",
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
            if(q.NAME){
                andwhere = ` where p.NAME = '`+q.NAME+`' `;
            }
            if(q.GENDER){
                andwhere = (andwhere)?andwhere+` and p.GENDER = '`+q.GENDER+`' `:` where p.GENDER = '`+q.GENDER+`' `;
            }
            if(q.CATEGORY){
                andwhere = (andwhere)?andwhere+` and p.CATEGORY = '`+q.CATEGORY+`' `:` where p.CATEGORY = '`+q.CATEGORY+`' `;
            }
            if(q.SIZE){
                andwhere = (andwhere)?andwhere+` and p.SIZE = '`+q.SIZE+`' `:` where p.SIZE = '`+q.SIZE+`' `;
            }
            if(q.PRICE){
                andwhere = (andwhere)?andwhere+` and p.PRICE = '`+q.PRICE+`' `:` where p.PRICE = '`+q.PRICE+`' `;
            }
            if(q.NUMBER){
                andwhere = (andwhere)?andwhere+` and p.NUMBER = '`+q.NUMBER+`' `:` where p.NUMBER = '`+q.NUMBER+`' `;
            }
            queryText = `select * from ecomwebapp.produce p `+andwhere+limit;
            get = await query_database(queryText);
            if(!get||get.length==0){
                res({status:200,message:"success",data:"Data not found."});
                return;
            }
            queryText = `select count(p.ID) as 'all' from ecomwebapp.produce p `+andwhere;
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