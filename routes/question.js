const {Router}  = require('express');
const {newQuestion,getQuestions,updateQuestion,deleteQuestion}=require('../controllers/questionController')
const {questionAnswer,getAnswers,updateAnswer,deleteAnswer}=require('../controllers/answerController')


const router = Router();


router.post('/new',newQuestion);
router.post('/answer',questionAnswer);


router.put('/answer',updateAnswer);
router.put('/update',updateQuestion);


router.get('/questions',getQuestions);
router.get('/answers',getAnswers);



router.delete('/delete',deleteQuestion);
router.delete('/answer',deleteAnswer);



module.exports=router;