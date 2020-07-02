const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())


server.get('/', (req, res) => {
    res.status(200).json({api: 'API server is up and running'})
})

module.exports = server;