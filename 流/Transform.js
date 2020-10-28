//Transform流是一种特殊的Duplex流，继承自Duplex流
//其可写端的数据经变换后会自动添加到可读端

//stream.Transform类原型式地继承自stream.Duplex并且实现了自己的writable._write()和readable._read()

// 1.继承 Transform 类
// 2.实现 _transform() 方法
// 3.实现_flush() 方法（可以不实现）

// Transform 流有两个常用的事件:
// 1.来自 Writable 的 finish
// 2.来自 Readable 的 end

// 当调用 transform.end() 并且数据被 _transform() 处理完后会触发 finish
//调用_flush后，所有的数据输出完毕，触发end事件

const {
    Transform
} = require('stream')

//例：转换所有输入的字符变为大写
class myTransform extends Transform {
    constructor(options) {
        super(options);
    }

    //该方法是用于接受输入并产生输出的一个中转站，该方法内部实现对写入的字节进行操作
    //然后计算出一个输出
    //最后将输出使用readable.push()方法传递给可读流
    _transform(chunk,encoding,done){
        //例
        const upperChunk = chunk.toString().toUpperCase()
        this.push(upperChunk)
        done()
    }

    // 在一些情况下，当流关闭的时候一个Transform操作也许需要发射一些额外的数据，这个时候就需要调用_flush方法
    _flush(cb){
        //例
        this.push('this is flush data\n')
        cb(null, 'appending more data\n')
    }
}

const tss = new myTransform()

//例
tss.pipe(process.stdout)
tss.write('hello transform stream\n')
tss.write('another line\n')
tss.end()