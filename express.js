//loading http module
const express = require("express")
const expressHandlebars = require('express-handlebars')
const app = express()
const hostname = '127.0.0.1'
const port = 8000
const dice = require('./lib/fortune')
const handlers = require('./lib/handlers')

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)

app.get('/about',handlers.about )

app.use(handlers.notFound)
app.use(handlers.serverError)

app.listen(port, () => console.log(
    `Express started : https://${hostname}:${port}`
))