const sequelize = require('../config/db');

const {Sequelize,DataTypes} = require('sequelize');
// console.log(dbConfig);

// const sequelize = new Sequelize(
//     dbConfig.DB,
//     dbConfig.USER,
//     dbConfig.PASSWORD,{
//         host:dbConfig.HOST,
//         dialet:dbConfig.dialet,
//         operatorsAliases:false,//


//         pool:{
//             max:dbConfig.pool.max,
//             min:dbConfig.pool.min,
//             acquire:dbConfig.pool.acquire,
//             idle:dbConfig.pool.idle,
//              }
//         }
    
//  );
//  sequelize.authenticate().then(()=>{
//      console.log('Authentication successful');
//  }).catch(error=>console.log(error));

 const db={};

 db.Sequelize = Sequelize;
 db.sequelize = sequelize;

 //table models
 db.Users = require('./userModel')(sequelize,DataTypes);// User table model
 db.Test = require('./testModel')(sequelize,DataTypes);// test table model
 db.Question = require('./questionModel')(sequelize,DataTypes);// test table model


db.sequelize.sync({force:false}).then(()=>{//to prevent overriding of data and unauthorized tables
    console.log('Synced')
}).catch((error)=>{
    console.log('error while syncing',error)
})

module.exports=db;





