//loading http module
const express = require("express")
const expressHandlebars = require('express-handlebars')
const app = express()
const hostname = '127.0.0.1'
const port = 8000
const handlers = require('./lib/handlers')
const fs = require('fs')
const tours =require ('./api/tours')

app.engine('hbs', expressHandlebars({
    extname:'hbs',
    defaultLayout: 'main',
}))
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false}))

app.post('/process-contact', (req,res)=> {
    console.log(`received contact from ${req.body.name} <${req.body.email}>`)
    res.redirect(303, '10-thank you')
})


app.get('/', handlers.home)
app.get('/about',handlers.about )
// read header
app.get('/headers',(req,res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

// content rendering sample
app.get('/greeting', (req, res)=> {
    res.render('greeting',{
        message: 'hellow?',
        style: req.query.style,
        userid: req.cookies.userid,
        username: req.session.username
    })
})
app.get('/no-layout', (req, res)=> res.render('custom-layout', {layout:null}))
app.get('/custom-layout', (req, res)=> res.render('custom-layout', {layout:'custom'}))
app.get('/text', (req, res)=> {
    res.type('text/plain')
    res.send('this is a test')
})

app.get('/create', (req, res) => {
})

app.get('/api/tours', (req, res) => res.json(tours.tours))

app.use((err, req, res, next)=> {
    console.error('SERVER ERROR: '+ err.message)
    res.status(500).render('08-error', {message : "dont click me its ERROR!!"})
})

app.use((req, res) => res.status(404).render('404'))
app.get('/error', (req, res)=>res.status(500).render('error'))

// content rendering end

app.get('*', (req, res) => res.send('Check out our <a href="/error">error</a> page!'))


app.disable('x-powered-by') // response header expunged
app.use(handlers.notFound)
app.use(handlers.serverError)

app.listen(port, () => console.log(
    `Express started : https://${hostname}:${port}`
))