//Duplex(双工)流
//实际上是继承了Readable和Writable的一类流
//一个Duplex对象既可当成可读流来使用，也可以当做可写流来使用
//Duplex流中，可读流中的数据和可写流中的数据是分开的。

// 1.继承 Duplex 类
// 2.实现 _read() 方法
// 3.实现 _write() 方法

// 实现了_read()方法后，可以监听data事件来消耗Duplex产生的数据
// 实现了_write()方法后，便可以作为下游去消耗数据

//read()、write() 方法的实现和 Readable、Writable 完全一样

const Duplex = require('stream').Duplex;

const myDuplex = new Duplex({
    read(size){
        //...
    },
    write(chunk,encoding,calllback){
        //...
    }
})