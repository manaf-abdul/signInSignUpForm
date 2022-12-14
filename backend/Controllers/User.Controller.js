import User from '../Models/User.model.js'
import { comparePassword, hashPassword } from '../utils/auth.js'
import jwt from 'jsonwebtoken'

// @desc    Register a new User
// @rout    POST /api/users/signup
// @acce    Public
export const register = async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password } = req.body
        let userExist = await User.findOne({ email }).exec()
        if (userExist) return res.status(400).send("Email is taken")
        const hashedpassword = await hashPassword(password)

        const user = await new User({
            name, email, password: hashedpassword
        }).save()
        return res.status(200).json({ Success: "true" })
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message)
    }
}

// @desc    Login a User
// @rout    POST /api/users/signin
// @acce    Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).exec()
        if (!user) return res.status(400).send("No User Found")
        //check password
        const match = await comparePassword(password, user.password)
        if(!match) return res.status(401).send("Entered password is wrong")
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        user={...user._doc,token,password:null}
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message)
    }
}

// @desc    user LogOut
// @rout    POST /api/users/logout"
// @acce    Private
export const logout = async (req, res) => {
    try {
       res.clearCookie("token")
       return res.json({message:"SignOut Success"})
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error,logout")
    }
}