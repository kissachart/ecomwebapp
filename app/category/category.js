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
        // database error set error code to 99999
            reject(-99);
        }
    })
}

ajaxHandle.push({
    method:"post",
    path: "category",
    handle: async function (q, res) {
        if(!q.NAME){
            res({status:400,message:"Can not found NAME in request", data:q});
            return
        }
        let queryText,checkDuplicateName,insertCategory;
        queryText = "select * from ecomwebapp.category c where c.Name ='"+q.NAME+"';"
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
        queryText = `insert into ecomwebapp.category (NAME) values ('`+q.NAME+`');`;
        try {
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
    path: "category",
    handle: async function (q, res) {
        if(!q.ID||q.NAME==undefined){
            res({status:400,message:"Can not found ID/NAME in request", data:q});
            return
        }
        let queryText,checkData,checkDuplicateName,updateCategory;
        queryText = "select * from ecomwebapp.category c where c.ID ='"+q.ID+"';";
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
        queryText = "select * from ecomwebapp.category c where c.Name ='"+q.NAME+"';"
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
            queryText = `update ecomwebapp.category set NAME = '`+q.NAME+`' where ID = `+q.ID+`;`;
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
        path: "category",
        handle: async function (q, res) {
            if(!q.ID){
                res({status:400,message:"Can not found ID in request", data:q});
                return
            }
            let queryText,checkData,deleteCategory;
            queryText = "select * from ecomwebapp.category c where c.ID ='"+q.ID+"';";
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
                queryText = `delete from ecomwebapp.category where ID = `+q.ID+`;`;
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
    path: "category",
    handle: async function (q, res) {
        let queryText,getCategory,limit;
        try {
            if(q.LIMIT){
                limit = ` limit `+q.LIMIT ;
            }
            queryText = `select * from ecomwebapp.category `+limit;
            getCategory = await query_database(queryText);
            res({status:200,message:"success",data:getCategory}); 
            return;
        } catch (error) {
            res({status:500,message:"Call Database error", data:err.message});
            return;
        }        
    }});

