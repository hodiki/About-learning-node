// pipe() 方法类似下面的代码，在可读流与可写流之间连接一个管道

const fs = require('fs');

//创建一个可读流
let rs = fs.createReadStream('./1.txt',{
    highWaterMark: 3
})

//创建一个可写流
let ws = fs.createWriteStream('./2.txt',{
    highWaterMark:3
})

//第二个可写流
let ws2 = fs.createWriteStream('./3.txt', {
    highWaterMark: 3
});

//原版实现+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// rs.on('data',(data)=>{
//     let flag = ws.write(data);
//     console.log(`往可写流中写入${data.length}字节的数据`)
//     //如果写入缓冲区已满，则暂停可读流的读取
//     if(!flag){
//         rs.pause();
//         console.log('暂停可读流')
//     }
// })

// //监控可读流数据是否读完
// rs.on('end',()=>{
//     console.log('数据已读完');
//     //读完了就调用end()
//     ws.end();
// })

// //如果可写流缓冲区已清空，可以再次写入，则重新打开可读流
// ws.on('drain',()=>{
//     rs.resume();
//     console.log('重新开启可读流')
// })

//pipe()实现+++++++++++++++++++++++++++++++++++++++++++++++++++++++

//绑定可写流到可读流，自动将可读流切换到流动模式，将可读流的所有数据推送到可写流。
rs.pipe(ws);

//也可以绑定多个可写流
rs.pipe(ws2);

//解绑可写流，如果参数没写，则解绑所有管道
setTimeout(function () {

    rs.unpipe(ws2);

}, 0);