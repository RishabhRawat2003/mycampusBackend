import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        await User.create({ fullName, email, password })

        res.status(201).json({
            success: true,
            message: "User created successfully",
        })
    } catch (error) {
        console.log("Error while signing up user: ", error)
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isPasswordValid = await user.comparePassword(password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user._id, email: user.email, name: user.fullName }, process.env.JWT_SECRET,)

        res.status(200).json({
            success: true,
            token,
            message: "User logged in successfully",
        })

    } catch (error) {
        console.log("Error while logging in user: ", error)
    }
}


export const packageBought = async (req, res) => {
    try {
        const { name } = req.body
    } catch (error) {
        console.log("Error while buying package: ", error)
    }
}