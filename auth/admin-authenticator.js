const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET;
    if(token){
        jwt.verify(token, secret, (error, decodedToken) => {
            if(error){
                res.status(401).json({message: "Bad Token"})
            } else if(decodedToken.userType === 0) {
                next()
            } else{
                res.status(401).json({message: "User not authorized for access"})
            }
        })
    }
}
