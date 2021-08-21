//loading http module
const express = require("express")
const app = express()
const hostname = '127.0.0.1'
const port = 8000

app.get('/', (req, res) => {
    res.send('Hello World :)')
})

app.use(express.static("public"))

app.listen(port, hostname, () => {
    console.log(`Server Run : http://${hostname}:${port}/`)
})