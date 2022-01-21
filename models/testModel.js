module.exports=(sequelize,DataTypes)=>{

    const Test = sequelize.define('test',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        createdBy: { 
              type:DataTypes.INTEGER,
              allowNull:false
        },
        duration: { 
            type: DataTypes.FLOAT,
            allowNull:false,
        },
        title:{
            type: DataTypes.TEXT,
            defaultValue:'Unknown test'
        },
        active:{
            type: DataTypes.BOOLEAN,

        }
    })

    return Test;
}