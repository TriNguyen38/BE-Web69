import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config()
const { SECRET_CODE } = process.env

export const checkPermission = async (req,res,next)=>{
    try {
        const bearToken = req.headers.authorization
        if(!bearToken){
            throw new Error ("Ban chua dang nhap")
        }
        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            throw new Error ("undefined token")
        }
    

        const decoded = jwt.verify(token,SECRET_CODE)

        const user = await User.findById(decoded._id)
        if (!user || user.role !== 'admin') {
            throw new Error ("Ban khong co quyen")
        }
        next()
        
    } catch (error) {
        res.status(401).json({
            message: error.message || "Ban khong co quyen"
        })
    }
}