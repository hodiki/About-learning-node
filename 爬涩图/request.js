var http = require('http')
var url = require('url')
var fs = require('fs')
var arr = []

//http://h.hiphotos.baidu.com/zhidao/pic/item/b3b7d0a20cf431ad0444eb3a4d36acaf2edd981b.jpg
//https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581515423592&di=565dd73c07d571132a552087bf9d45f1&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1642597909%2C1622375492%26fm%3D214%26gp%3D0.jpg
var request = http.request(
    {
        protocol: 'http:',
        host: 'timgsa.baidu.com',
        path: '/timg?image&quality=80&size=b9999_10000&sec=1581515423592&di=565dd73c07d571132a552087bf9d45f1&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1642597909%2C1622375492%26fm%3D214%26gp%3D0.jpg',
        port: 80
    }
)

request.on('response', function (res) {
    res.on('data', function (chunk) {
        arr.push(chunk)
    })
    res.on('end', function () {
        console.log(
            Buffer.concat(arr)
        )
        fs.writeFile('./涩图.jpg', Buffer.concat(arr), (err) => { })
    })
})

request.end()