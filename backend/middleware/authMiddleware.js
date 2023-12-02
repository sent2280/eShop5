import jwt from 'jsonwebtoken';
import asnycHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// const jwtScrtKey = "abcdef";

// User must be authenticated
const protect = asnycHandler(async(req,res,next)=>{
    let token;

    // Read JWT from the 'jwt cookie
    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            // user details are assinged excluding password, bcoz this was later used in admin methid
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch(error){
            console.error(error);
            res.status(401);
            throw new Error('Not autorized, token failed');
        }
      
    } else {
           res.status(401);
           throw new Error('Not autorized, no token');

    }
});

// User must be an admin
const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export {protect,admin};