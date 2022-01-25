const jwt = require('jsonwebtoken');
const {service} = require('../utils/util');
const {Users} = require('../models');




const checkAccount = async (req,res,next)=>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,service.secret,async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else{
                // console.log(decodedToken);

                let user = await Users.findOne({username:decodedToken.id});
                if(!user.active){
                    res.redirect('/user');
                }
                // console.log(user.dataValues);
                res.locals.user = user.dataValues;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();

    }
}



module.exports={
    checkAccount
};