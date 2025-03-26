const express = require('express')
require('dotenv').config()
const cors = require('cors')

const AiRoutes = require('./Routes/ai.routes')

const app = express()
app.use(express.json())
app.use(cors())

// ai routes
app.use("/ai",AiRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app
