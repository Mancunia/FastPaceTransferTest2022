const {Router}  = require('express');
const {newUser,login,page}=require('../controllers/userController')


const router = Router();


router.post('/new',newUser);
router.post('/login',login);


router.get('/',page);





module.exports=router