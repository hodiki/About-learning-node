const fs= require('fs');

//创建一个文件可读流
let rs = fs.createReadStream('./1.txt',{
    //文件系统标志
    flags:'r',
    //数据编码，如果调置了该参数，则读取的数据会自动解析
    //如果没调置，则读取的数据会是Buffer
    //也可以通过 rs.setEncoding() 进行设置
    encoding:'utf-8',
    //文件描述符，默认为null
    fd:null,
    //文件权限,
    mode:0o666,
    //文件读取的开始位置
    start:0,
    //文件读取的结束位置
    end:Infinity,
    //读取缓冲区的大小，默认64k
    highWaterMark:3
})


//监听文件被打开时
rs.on('open',()=>{
    console.log('文件打开')
})

//************ 若on('data')，on('readable')，pipe() 混合使用，会导致不明确的行为。

//监听data事件
//会让当前流切换到流动模式
//当流中将数据传给消费者后触发
//由于配置highWaterMark为3字节，所以会多次打印
rs.on('data',(data)=>{
    console.log(`读取了${data.length}字节数据:${data.toString()}`)
    // console.log(data);

    //使流动模式的流停止触发'data'事件，切换出流动模式，数据都会保留再内部缓存中。
    //暂停
    rs.pause();

    //等待3秒后，再恢复触发'data'事件，将切换回流动模式。
    setTimeout(()=>{
        //继续
        rs.resume();
    },3000);
})

//可读流的readable事件
//当流中有数据可供读取时就触发
//当监听 readable 事件后，会导致流停止流动，需调用 read() 方法读取数据
rs.on('readable',()=>{
    let data;
    //循环读取数据
    //参数表示要读取的字节数
    //如果可读的数据不足字节数，则返回缓冲区剩余数据?
    //如果没有指定字节数，则返回缓冲区中所有数据?
    while(data=rs.read()){
        console.log(`读取到${data.length}字节的数据`);
        console.log(data.toString());
    }
})

rs.on('end',()=>{
    console.log('数据读取完毕')
})

rs.on('error',(error)=>{
    console.log('读取错误:'+error)
})

rs.on('close',()=>{
    console.log('文件关闭')
})