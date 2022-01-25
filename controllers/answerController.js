const {Question,Users,Answer} = require('../models');
const {genRandCode,decode_JWT} = require('../utils/util');

/*ANSWER QUESTIONS
1.check if user is logged in
2.get answer
3.get question reference
4.get question Id
5.answer question

*/
const questionAnswer = async(req,res)=>{
    try{
        if(!req.cookies.jwt){
            throw 'Login required'
        }
        const user = (await decode_JWT(req.cookies.jwt))._id;
        const {answer,questionRef}=req.body;

        if(!answer||!questionRef){
            throw 'Missing some details';
        }

        const thisQuestion = await Question.findOne({where:{ref:questionRef}});
        console.log(questionRef,thisQuestion.dataValues);
        if(!thisQuestion){
            throw "Question not found"
        }

        const thisUser = await Users.locate(user);
        
        const thisAnswer = await Answer.newAnswer({
            user:thisUser.id,
            answer,
            questionID:thisQuestion.id
        })

        if(!thisAnswer){
            throw 'Error attempting to answer';
        }

        res.status(200).json({state:"success"});



    }
    catch(error){
        console.log(error);
        res.status(403).json({error});
    }
}

const getAnswers = async(req,res) => {
    try {
        const questionID= req.query.question;

        const thisQuestion = await Question.findOne({where:{ref:questionID}}); 

        await Answer.getAnswers(thisQuestion.id);

        res.end();
        
    } 
    catch (error) {
        
    }
}

//Update Answer
const updateAnswer = async(req,res) => {
    try{
        if(!req.cookies.jwt){
            throw 'No user logged in'
        }   
        const {answerID,answer} = req.body;
        const user = (await decode_JWT(req.cookies.jwt))._id;
        const thisUser = await Users.locate(user);

        const updateState = await Answer.OverRide({
            answer,
            user:thisUser.id,
            answerID
        });
        if(!updateState){
            throw "Error performing action"
        }
        res.status(200).json({state:"Success"});
    }
    catch(error){
        console.log(error);
        res.status(403).json({error});
    }
}

//Delete an answer
const deleteAnswer = async(req,res) => {
    try{
        if(!req.cookies.jwt){
            throw 'No user logged in'
        }  
        const {answerID} = req.body;
        const user = (await decode_JWT(req.cookies.jwt))._id;
        const thisUser = await Users.locate(user);

       const state= await Answer.Drop({answerID,user:thisUser.id});
        if(!state){
            throw "Error performing action"
        }
         res.status(200).json({state:"Success"})


    }
    catch(error){
        console.log(error);
        res.status(403).json({error});
    }
}


module.exports={
    questionAnswer,
    getAnswers,
    updateAnswer,
    deleteAnswer
}