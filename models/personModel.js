module.exports=(sequelize,DataTypes)=>{//user model

    const Person = sequelize.define('person',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        firstname:{
            type:DataTypes.STRING,
            allowNull:false     
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        phone: { 
              type:DataTypes.STRING,
              allowNull:false,   
              unique:true
        },
        active:{
            type: DataTypes.BOOLEAN,
            default:1,
            allowNull:false  
        }

    })

    Person.newPerson=async function(person){
        try{
            const myPhone = await this.findOne({phone:person.phone});
            if(myPhone !==null){
                throw 'Phone number already exists'
            }
            const thisPerson = this.build({
                firstname:person.firstname,
                lastname:person.lastname,
                phone: person.phone,
                active:1
            })

            const done=await thisPerson.save()

            return done;

        }
        catch(error){
            throw error
        }
    }


    return Person

}