const router = require('express').Router()
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const adminAuthenticator = require('../auth/admin-authenticator.js')
const Users = require('../users/model.js')

router.post('/register', adminAuthenticator, verifyUser, verifyUnique, (req, res) => {
    const newUser = req.body;
    console.log(req.body)
    const hash = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hash;
    Users.add(newUser)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.post('/login', verifyUser, (req, res) => {
    const {username, password, rememberMe} = req.body;
    Users.getBy({username})
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user, rememberMe)
            res.status(200).json({user, token})
        } else {
            res.status(401).json({message: 'Authentication failed'})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

function verifyUser(req, res, next){
    if(req.body.username && req.body.password){
        next()
    } else {
        res.status(400).json({message: 'Users must have a username and a password.'})
    }
}

function verifyUnique(req, res, next){
    Users.getBy({'username': req.body.username})
    .then(user => {
        if(user){
            res.status(400).json({message: "Username already exists."})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
}

module.exports = router