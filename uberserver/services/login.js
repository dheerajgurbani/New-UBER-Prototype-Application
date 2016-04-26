var mongo = require("./mongo");
var mysql = require("./mysql");
var redis = require('redis');
var redisresults;
var username_global;
var client = redis.createClient(6379,'127.0.0.1');
client.on('connect', function() {
    console.log('REDIS connected');
});


function handle_request1(msg, callback){
console.log("stage2");


console.log("In handle request:"+ msg.email);

console.log("In handle request:"+ msg.password);

var crypto = require('crypto'),

algorithm = 'aes-256-ctr',

password = 'd6F3Efeq';







function decrypt(text){

var decipher = crypto.createDecipher(algorithm,password);

var dec = decipher.update(text,'hex','utf8');

dec += decipher.final('utf8');

return dec;

}

console.log("decrypted password"+msg.password);





query = "select uid,ufname from nodejsserver.users where uemail='"+msg.email+"' and upassword='"+decrypt(msg.password)+"'";
console.log(query);
var res = {};
client.hmget('userlogindetails', msg.email,function(err,reply) {
	console.log(reply);
	
    if (reply == msg.password) {
   
    
            res.code = "200";
            res.value = "Succes Login";
            client.hmget('userlogindetails', 'uid',function(err,uid){
            res.uid=uid;
            var ufirstname;
            client.hmget('userlogindetails','ufname',function(err,fname){
            	ufirstname=fname;
            	 res.ufname=ufirstname;
            });
           
            
query2 = "select d_name,b_amount,r_destination,dateoftravel,timeoftravel,r_source,rating from nodejsserver.rides where u_id='"+res.uid+"'";
    
    mysql.fetchData(function(err,results1){
    
    if(results1.length > 0){
    

res.data = results1;
callback(null,res);
   }
    else{
    
res.data = "no rides available";
  callback(null,res);
    }
    
   
    }, query2);
            });

           
   
    
    
    
    
    }
 else {
        console.log('doesn\'t exist in redis so fetching from redis');
mysql.fetchData(function(err,results){

if(err){
console.log("i am in error")
throw err;
}
else 
{   
if(results){
   // console.log(re[0]); 
    query1 = "select d_name,b_amount,r_destination,dateoftravel,timeoftravel,r_source,rating from nodejsserver.rides where u_id='"+results[0].uid+"'";
    res.uid=results[0].uid;
    mysql.fetchData(function(err,results1){
    console.log(results1);
    if(results1.length > 0){
    console.log("in server uid is ");
   // res.records = results;
res.code = "200";
res.value = "Succes Login"
res.data = results1;
res.ufname=results[0].ufname;
client.hmset('userlogindetails',[ msg.email,msg.password,'uid',results[0].uid,'ufname',results[0].ufname]);
   }

    else{
    
res.data = "no rides available";
client.hmset('userlogindetails',[ msg.email,msg.password,'uid',results[0].uid,'ufname',results[0].ufname]);    
    }
    
    callback(null,res);
    }, query1);

    }
    else{
    res.code = "401";
res.value = "Failure Login";
callback(null,res);
    }
}
   

}, query);

    }
});
}



function signup_rider(msg, callback){

var res = {};

console.log("In handle signup_rider:"+ msg.uemail);

console.log("In handle signup_rider:"+ msg.upassword);


var query1="insert into nodejsserver.users values ('','"+msg.ufname+"', '"+msg.ulname+"','"+msg.uemail+"','"+msg.upassword+"','"+msg.umobile+"')";
mysql.fetchData(function(err,results){
console.log(query1.sql);
if(err){
console.error(err);
//console.log("4rr");
res = {"code" : 401};
   
callback(null,res);
}
else{
console.log('no error');
res = {"code" : 200};

callback(null,res);
}
},query1);
}





exports.signup_rider = signup_rider;
exports.handle_request1 = handle_request1;