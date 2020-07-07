const router = require('express').Router()
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const Users = require('../users/model.js')

router.post('/register', verifyUser, (req, res) => {
    const newUser = req.body;
    delete newUser.rememberMe
    const hash = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hash;
    Users.add(newUser)
    .then(user => {
        const token = generateToken(user, req.body.rememberMe)
        res.status(201).json({user, token})
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

module.exports = router