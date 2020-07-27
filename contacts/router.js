const router = require('express').Router()
const adminAuthenticator = require('../auth/admin-authenticator.js')
const Contacts = require('./model.js')

router.get('/', adminAuthenticator, (req, res) => {
    Contacts.get()
    .then(contacts => {
        res.status(200).json(contacts)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.post('/', verifyContact, (req, res) => {
    Contacts.add(req.body)
    .then(message => {
        res.status(201).json(message)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

router.delete('/:id', adminAuthenticator, verifyExisting, (req, res) => {
    Contacts.remove(id)
    .then(_ => {
        res.status(200).json({user: res.locals.user, deleted: true})
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

function verifyContact(req, res, next){
    if(req.body.first_name && req.body.last_name && req.body.email){
        next()
    } else {
        res.status(400).json({message: 'Please fill out first name, last name, and email fields'})
    }
}

function verifyExisting(req, res, next){
    id = req.params.id
    Contacts.getBy({id})
    .then(user => {
        if(user){
            res.locals.user = user
            next()
        }else{
            res.status(404).json({message: 'User not found.'})
        }
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
}

module.exports = router