module.exports=(sequelize,DataTypes)=>{//user model

    const Answer = sequelize.define('answer',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        questionID:{
            type:DataTypes.INTEGER,
            allowNull:false     
        },
        answer:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        user: { 
              type:DataTypes.INTEGER,
              allowNull:false   
        },
        state:{
            type: DataTypes.STRING,
            default:"Incomplete"
        }

    })

    Answer.newAnswer = async function(data){
        try {
            console.log(data);
            const {user,answer,questionID} = data;

            const checkAnswer = await this.findOne({where:{user,questionID}});
            console.log(checkAnswer);
            if(checkAnswer!=null){
                throw "Answered already"
            }

            const answered = this.build({
                questionID,
                answer,
                user,
                state:"Answered"
            }) 
            const done = await answered.save();
            if(!done){
                throw `Counldn't answer question`;
            }

            return done;
        } 
        catch (error) {
            throw error;
        }
    }

    Answer.getAnswers = async function(data){//get all answers via question ID
        try {
            if(!data){
                throw 'Question Reference required'
            }
            const allAnswers = await this.findAll({where:{questionID:data}});
            console.log(allAnswers);

            return allAnswers
            

        } 
        catch (error) {
            throw error;
        }
    }

    Answer.OverRide = async function(data){//update answer
        try{
            const {answerID,user,answer}=data;

            const thisAnswer = await this.findOne({where:{id:answerID}});
            if(!thisAnswer){//look for answer
                throw "Not found";
            }
            console.log(user,thisAnswer.user)
            if(user!==thisAnswer.user){//check if user is correct
                throw "Unauthorized access";
            }

            //updateAnswer...................................................................
            const updateAnswer = await this.update({answer},{where:{id:thisAnswer.id}});
            if(!updateAnswer){
                throw "Error updating"
            }

            return updateAnswer;
        }
        catch(error){
            throw error;
        }
    }

    Answer.Drop = async function(data){//Delete an answer
        try{
            const {answerID,user}=data;
            if(!user||!answerID){
                throw "ID missing";
            }

            const thisAnswer = await this.findOne({where:{id:answerID}});
            if(!thisAnswer){//look for answer
                throw "Not found";
            }
            console.log(user,thisAnswer.user)
            if(user!==thisAnswer.user){//check if user is correct
                throw "Unauthorized access";
            }
            
            const deleteState = await this.destroy({where:{id:thisAnswer.id}});

            console.log(deleteState);


        }
        catch(error){
            throw error;
        }
    }


    return Answer

}