import jwt from 'jsonwebtoken'
import User from '../Models/User.model.js'

const protect = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded._id).select('-password')
            // console.log(req.user);
            next()
        } catch (error) {
            console.error(error)
            return res.status(401).send('Not authorized, token failed')
        }
    }
    if (!token) {
        console.log(req.headers.authorization)
        return res.status(401).send('Not authorized,no token')
    }
}

export { protect }