const http = require('http')
const fs = require('fs')
const port = 8000


function serveStaticFile(res, path, contentType, responseCode = 200) {

    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            return res.end('500 Internal Error')
        }
        res.writeHead(responseCode, { 'Content-Type': contentType })
        res.end(data)
    })
}

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch (path) {
        case "":
            serveStaticFile(res, '/public/LoginPage.html', 'text/html')
            break

        case "/main.html":
            serveStaticFile(res, '/public/main.html', 'text/html')
            break

        case "/img/fallpictures6.jpg":
            serveStaticFile(res, '/public/img/fallpictures6.jpg', 'image/jpg')

        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404)
            break

    }
})

server.listen(port, () => console.log(`server started : http://localhost:${port}`))