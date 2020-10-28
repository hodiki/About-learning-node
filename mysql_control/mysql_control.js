var mysql = require('mysql');

//连接库
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'zhy438165064',
    database : 'hodiki_web'
    });

var mysql_back='@';      //此变量储存查询结果

var mysql_toback=function(err,result){
    if(err){
        console.log(err);
        mysql_back=err;
    }else{
        //console.log(result);
        mysql_back=result;
    }
}   //回调函数，取出查询结果

var mysql_control = function(sql,callback){
    var sql = sql;
    var callback=mysql_toback;

    //直接注入sql语句
    //var sql = 'SELECT * FROM abc';

    connection.connect();   //连接数据库

    tb(sql,callback);
    
    connection.end();  //释放连接

}


        
var tb=function(sql,callback){
    if(mysql_back!='@'){
        console.log(mysql_back);
        return;
    }else{
        connection.query(sql,callback);
            setTimeout(function(){
                tb();
            },20);
        }    
    }

// tb();   //调试用

//使用举例

//mysql_control('show tables',mysql_toback);   //('sql语句','mysql_toback')

//引用举例
//const Mc = require('./db/mysql_control')
//Mc('show tables')

module.exports = mysql_control
module.exports = mysql_back


