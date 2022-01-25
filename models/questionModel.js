module.exports=(sequelize,DataTypes)=>{

    const Question = sequelize.define('question',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        question:{
            type:DataTypes.TEXT,
            allowNull:false     
        },
        ref:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        creatorID: { 
              type:DataTypes.INTEGER,
              allowNull:false   
        },
        active:{
            type: DataTypes.BOOLEAN,
            default:true
        }
    })

    Question.OverRide = async function(data){
        try{
            const {questionID,user,question}=data;

            const thisQuestion = await this.findOne({where:{id:questionID}});
            if(!thisQuestion){//look for answer
                throw "Not found";
            }
            console.log(user,thisQuestion.creatorID)
            if(user!==thisQuestion.creatorID){//check if user is correct
                throw "Unauthorized access";
            }

            //updateAnswer...................................................................
            const updateQuestion = await this.update({question},{where:{id:thisQuestion.id}});
            if(!updateQuestion){
                throw "Error updating"
            }

            return updateQuestion;
        }
        catch(error){
            throw error;
        }
    }

    Question.Drop = async function(data){
        try{
            const {questionID,user}=data;
            if(!user||!questionID){
                throw "ID missing";
            }

            const thisQuestion = await this.findOne({where:{id:questionID}});
            if(!thisQuestion){//look for answer
                throw "Not found";
            }
            console.log(user,thisQuestion.creatorID)
            if(user!==thisQuestion.creatorID){//check if user is correct
                throw "Unauthorized access";
            }
            
            const deleteState = await this.destroy({where:{id:thisQuestion.id}});

            return deleteState;


        }
        catch(error){
            throw error;
        }
    }

    return Question;
}