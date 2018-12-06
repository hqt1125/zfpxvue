let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
let sliders = ['//aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg', '//gw.alicdn.com/imgextra/i1/138/O1CN01J7ZLL91CtF8i27CqN_!!138-0-lubanu.jpg', '//gw.alicdn.com/imgextra/i3/43/O1CN01J7WSAz1CBjVo6o7xa_!!43-0-lubanu.jpg'];
function read(cb) {
    fs.readFile(path.join(__dirname, './book.json'), 'utf8', function (err, data) {
        if (err || data.length == 0) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })

}
function write(data, cb) {
    fs.writeFile(path.join(__dirname, './book.json'), JSON.stringify(data), cb)
}
http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") return res.end();
    let { pathname, query } = url.parse(req.url, true);
    if (pathname == '/sliders') {
        res.setHeader('Content-Type', 'application/json;charset=utf8');
        return res.end(JSON.stringify(sliders));
    }
    if (pathname == '/hot') {
        read(function (books) {
            let hot = books.reverse().slice(0, 6);
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(hot))
        })
        return
    }
    if (pathname == '/book') {
        let id = parseInt(query.id);
        switch (req.method) {
            case "GET":
                if (id) { } else {
                    read(function (books) {
                        let hot = books.reverse();
                        res.setHeader('Content-Type', 'application/json;charset=utf8');
                        res.end(JSON.stringify(hot))
                    })
                }
                break;
            case "POST":
                break;
            case "PUT":
                break;
            case "DELETE":
                read(function (books) {
                    books = books.filter((i) => { i.bookId !== id })
                    res.setHeader('Content-Type', 'application/json;charset=utf8');
                    write(books, function () {
                        res.end(JSON.stringify({}))
                    })
                })
                break;
        }
        return
    }
}).listen(8809)