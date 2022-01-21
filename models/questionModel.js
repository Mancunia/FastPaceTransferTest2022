module.exports=(sequelize,DataTypes)=>{

    const Question = sequelize.define('question',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        testID: { 
              type:DataTypes.INTEGER,
              allowNull:false   
        },
        multiple:{
            type: DataTypes.BOOLEAN,
            default:false
        },
        active:{
            type: DataTypes.BOOLEAN,
            default:true
        }
    })

    return Question;
}