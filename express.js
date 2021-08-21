//loading http module
const express = require("express")
const expressHandlebars = require('express-handlebars')
const app = express()
const hostname = '127.0.0.1'
const port = 8000
const dice = require('./lib/fortune')

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    res.render('about', { dice : dice.getFortune })
})

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 not found Ex!')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error Ex!')
})

app.listen(port, () => console.log(
    `Express started : https://${hostname}:${port}`
))