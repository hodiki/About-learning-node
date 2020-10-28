const fs=require('fs');

//创建一个文件可写流
let ws =fs.createWriteStream('./1.txt',{
    highWaterMark:3
})

//往流中写入数据
//参数一表示要写入的数据
//参数二表示编码方式
//参数三表示写入成功的回调?
//缓冲区满时返回false，未满时返回true。
//由于上面我们设置的缓冲区大小为 3字节，所以到写入第3个时，就返回了false。
console.log(ws.write('1','utf-8'));
console.log(ws.write('2','utf-8'));
console.log(ws.write('3','utf-8'));
console.log(ws.write('4','utf-8'));

//cork()
//调用 cork() 后，会强制把所有写入的数据缓冲到内存中。
//不会因为写入的数据超过了 highWaterMark 的设置而写入到文件中。
// ws.cork();
// ws.write('1');
// console.log(ws.writableLength);
// ws.write('2');
// console.log(ws.writableLength);
// ws.write('3');
// console.log(ws.writableLength);
// ws.write('4');
// console.log(ws.writableLength);
// ws.write('5');
// console.log(ws.writableLength);

// //将调用 cork() 后的缓冲数据都输出到目标，也就是写入文件中。
//注意 cork() 的调用次数要与 uncork() 一致。
// ws.uncork();


function writeData(){
    let cnt = 9;
    return ()=>{
        let flag = true;
        while(cnt && flag){
            flag = ws.write(`${cnt}`);
            console.log('缓冲区中写入的字节数',ws.writableLength);
            cnt--;
        }
    }
}

let wd = new writeData
wd()

//当缓冲区中的数据满的时候，应停止写入数据，
//一旦缓冲区中的数据写入文件了，并清空了，则会触发 'drain' 事件，告诉生产者可以继续写数据了。
ws.on('drain',()=>{
    console.log('可以继续写数据了');
    console.log('缓冲区中写入的字节数',ws.writableLength);
    wd();
});

//调用end()表面已经没有数据要被写入，在关闭流之前再写一块数据。
//如果传入了回调函数，则将作为 'finish' 事件的回调函数
ws.end('最后一点数据','utf-8');

//调用 end() 且缓冲区数据都已传给底层系统时触发
ws.on('finish',()=>{
    console.log('写入完成');
})

//当流或底层资源关闭时触发
ws.on('close',()=>{
    console.log('文件被关闭')
});

//错误监听
ws.on('error',(error)=>{
    console.log(`写入数据错误${error}`);
})