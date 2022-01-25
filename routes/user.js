const {Router}  = require('express');
const {newUser,login,page,logout}=require('../controllers/userController')


const router = Router();


router.post('/new',newUser);
router.post('/login',login);


router.get('/',page);
router.get('/logout',logout);





module.exports=router