var http = require('http')
var fs=require('fs')

var server=http.createServer((req,res)=>{
    // res.write('hello sun of beach')
    // res.end(()=>{
    //     console.log('有一个傻比访问了')
    // }) 
    if(req.url === '/'){
        res.writeHead(
            200,                    //状态码
            {
                "Content-Type":"text/html"  //mime标准 传输某物
            }
        )
        fs.readFile('../index.html',{encoding:'UTF-8'},(err,data)=>{
            res.write(data)
            res.end()
        })
    }

})


server.listen(3000) 