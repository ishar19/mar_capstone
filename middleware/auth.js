const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {   // check if token is present in header
        return res.status(401).send('Access Denied');
    }
    try {   // if it is present, verify the token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (e) {   // if token is invalid, return 400
        return res.status(400).send('Invalid Token');
    }
}

module.exports = authMiddleware;