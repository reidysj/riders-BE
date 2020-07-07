const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()

const authRouter = require('../auth/router.js')
const contactsRouter = require('../contacts/router.js')

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use('/contacts', contactsRouter )
server.use('/auth', authRouter)

server.get('/', (req, res) => {
    res.status(200).json({api: 'API server is up and running'})
})

module.exports = server;