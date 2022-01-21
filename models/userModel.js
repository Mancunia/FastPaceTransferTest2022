module.exports=(sequelize,DataTypes)=>{

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
        password: { 
            type: DataTypes.STRING,
            allowNull:false,
        },
        account:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        active:{
            type: DataTypes.BOOLEAN,
            default:true

        }
    })


    return User
}