// @ts-nocheck
let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
let sliders = ['//aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg', '//gw.alicdn.com/imgextra/i1/138/O1CN01J7ZLL91CtF8i27CqN_!!138-0-lubanu.jpg', '//gw.alicdn.com/imgextra/i3/43/O1CN01J7WSAz1CBjVo6o7xa_!!43-0-lubanu.jpg'];
let pageSize = 5;
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
    if (pathname == '/page') {
        let offset = parseInt(query.offset) || 0;
        read(function (books) {
            let result = books.reverse().slice(offset, offset + pageSize);
            let hasMore = true;
            if (books.length <= offset + pageSize) {
                hasMore = false;
            }
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify({ hasMore, books: result }));
        });
        return;
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
                if (typeof id !== 'undefined' && !isNaN(id)) {
                    read(function (books) {
                        let book = books.find((item) => item.bookId == id);
                        if (!book) book = {}
                        res.setHeader('Content-Type', 'application/json;charset=utf8');
                        res.end(JSON.stringify(book))
                    })
                } else {
                    read(function (books) {
                        res.setHeader('Content-Type', 'application/json;charset=utf8');
                        res.end(JSON.stringify(books.reverse()))
                    })
                }
                break;
            case "POST":
                let str = '';
                req.on('data', tuck => {
                    str += tuck;
                })
                req.on('end', () => {
                    let book = JSON.parse(str);
                    read(function (books) {
                        book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;
                        books.push(book);
                        write(books, function () {
                            res.end(JSON.stringify(book))
                        })
                    })
                })
                break;
            case "PUT":
                if (id) {
                    let str = '';
                    req.on('data', tuck => {
                        str += tuck;
                    })
                    req.on('end', () => {
                        let book = JSON.parse(str);
                        read(function (books) {
                            books = books.map(item => {
                                if (item.bookId == id) {
                                    return book
                                }
                                return item;
                            });
                            write(books, function () {
                                res.end(JSON.stringify(book))
                            })
                        })
                    })
                }
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