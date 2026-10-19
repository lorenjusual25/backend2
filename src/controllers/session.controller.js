import {generateToken} from '../utils/jwt.js'
import { UserDTO } from '../dto/userDTO.js'
export async function register(req,res,next) {
    try {
        return res.status(201).json({
            status:"success",
            payload:req.user
        })
    } 
    catch (error) {
        next(error)
    }
}
export async function login (req,res,next) {
   try {
    const user = req.user
    const payload = {
        id: user._id.toString(),
        email:user.email,
        role: user.role
    }
    const token = generateToken(payload)
    res.cookie("currentUser",token,{
        httpOnly: true,
        secure:process.env.NODE_ENV ==="production",
        sameSite: "lax",
        maxAge:60 * 60 * 1000
    })
    return res.status(200).json({
        status: "success",
        message: "Login correcto"
    })
    } catch (error) {
        next(error)
    }
}
export function getCurrentUser (req, res, next) {
    try {
        const user = req.user;
        const userDTO = new UserDTO(user);
        return res.status(200).json({
            status: "success",
            payload: userDTO
        })
    }catch (error) {
        next(error)
    }
}
export async function logout (req,res) {
    res.clearCookie("currentUser")
    return res.status(200).json({
        status:"success",
        message:"Logout exitoso"
    })
}
export async function githubCallback (req,res,next) {
    try {
        const user = req.user
        const payload = {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        }
        const token = generateToken(payload)
        res.cookie("currentUser",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })
        return res.json({
            status:"success",
            message:"Login con GitHub exitoso"
        })
    }
    catch(error) {
        error.message = "Error durante la autenticación"
        next(error)
    }
}