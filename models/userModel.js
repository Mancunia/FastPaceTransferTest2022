
const bcrypt = require('bcrypt');
module.exports=(sequelize,DataTypes)=>{//user model

    const User = sequelize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          email: { 
              type:DataTypes.STRING,
              allowNull:false,
              unique: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        password: { 
            type: DataTypes.STRING,
            allowNull:false,
        },
        account:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        personID:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        active:{
            type: DataTypes.BOOLEAN,
            default:1

        }
    })

    //static method to login
User.login= async function(email,password){
    try{
        const user = await this.findOne({email});//search for email/username
    if(!user){
        throw 'incorrect email';
    }

    const auth = await bcrypt.compare(password,user.password);//compare received password with user.password
        if(!auth){
            throw 'Password is incorrect';
        }
        
        if(!user.active){
                throw 'Account is not Active';
            }

     return user;
    }
    catch(error){
        throw error;
    }
    
}

User.locate = async function(username){
    try {
        const user = this.findOne({username});//search for username
        if(!user){
            throw 'User not missing';
        }
        return user;
        
    } catch(error){
        throw error
    }
}



    return User
}





