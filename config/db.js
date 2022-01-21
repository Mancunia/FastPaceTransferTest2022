const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
  'fastPace_test',
  'root',
  '',{
      host:'localhost',
      dialet:'mysql',
      operatorsAliases:false,//

      pool:{
        max:5, 
        min:0,
        acquire:30000,
        idle:10000
  }
      }
  
);

// module.exports= {

//       DB:'fastPace_test',
//       HOST:'localhost',
//       USER:'root',
//       PASSWORD:'',
//       dialect:'mysql',

//       pool:{
//         max:5, 
//         min:0,
//         acquire:30000,
//         idle:10000
//   }
// }


module.exports=sequelize