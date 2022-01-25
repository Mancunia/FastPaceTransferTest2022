const {Question,Users} = require('../models');
const {genRandCode,decode_JWT} = require('../utils/util');

/*NEW TEST
1.get user Id via username
2.get body
3.check test title
4.create test
5.return test id
*/

const newQuestion = async (req, res) => {
    try{
        if(!req.cookies.user){
            throw 'User not logged in';
        }
        const user = (await decode_JWT(req.cookies.user))._id;
         console.log(user)
        const thisUser = await Users.findOne({where:{username:user}})
       if(thisUser.account!==1){//1 is for Admin
        throw 'Can not create question'
       }

        let {question} = req.body;
        

        let thisTest; 
        let ref
        
        do {
            ref = genRandCode(6);
            thisTest= await Question.findOne({where:{ref}});
            
        } while (thisTest!==null);

        const NewTest = Question.build({
            question,
            ref,
            creatorID:thisUser.id,
            active:1

        });

        const done = await NewTest.save();

        if(!done){
            throw 'Error creating test'
        }

        res.status(200).json({status: 'success',test:{
            id: done.id,
            title: done.title,
            by:{
               username:thisUser.username,
               id:thisUser.id
            }
        }});


    }
    catch(error){
        console.log(error);
        res.status(403).json({error});
    }
}

/*GET TEST
1.get test Id via req.body
3.check test title,id
4.attempting  to get test
5.return test id
*/

const getQuestions = async(req,res)=>{
    try{

        const thisTest = await Question.findAll({where:{active:1}});
        // if(!thisTest){
        //     throw 'Error getting tests';
        // }
        res.status(200).json({tests:thisTest});

    }
    catch(error){
        res.status(403).json({error});
    }
}

const updateQuestion = async(req,res) => {
    try{
        if(!req.cookies.user){
            throw 'No user logged in'
        }   
        const {questionID,question} = req.body;
        const user = (await decode_JWT(req.cookies.user))._id;
        const thisUser = await Users.locate(user);

        const updateState = await Question.OverRide({
            question,
            user:thisUser.id,
            questionID
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

const deleteQuestion = async(req,res) => {
    try{
        if(!req.cookies.user){
            throw 'No user logged in'
        }  
        const {questionID} = req.body;
        const user = (await decode_JWT(req.cookies.user))._id;
        const thisUser = await Users.locate(user);

       const state= await Question.Drop({questionID,user:thisUser.id});
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
    newQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion
}