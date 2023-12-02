import jwt from 'jsonwebtoken';

const jwtScrtKey = "abcdef";
const generateToken = (res,userId) => {
    const token = jwt.sign({userId},jwtScrtKey,{
        expiresIn : '1d'
     });

     res.cookie('jwt',token,{
        httpOnly : true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // // 1 day in milliseconds
     })
}

export default generateToken;