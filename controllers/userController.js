const {User} = require('../models/index');

const getUser = async(req,res)=>{
    try{
        let users = await User.findAll();
    if(!users){
        throw 'Error getting users';
    } 
    res.status(200).json({users});

    }
    catch(error){
        res.status(403).json({error});
    }
   
}



module.exports ={
    getUser
}