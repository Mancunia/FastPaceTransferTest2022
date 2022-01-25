const {Router}  = require('express');
const {newUser,login}=require('../controllers/userController')


const router = Router();


router.post('/new',newUser);
router.post('/login',login);





module.exports=router