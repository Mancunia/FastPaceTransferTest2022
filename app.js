const express = require('express');
const app = express();
const sequelize = require('./config/db');

const port = process.env.PORT||3000;


app.use(express.urlencoded({extended:true}));
app.use(express.json());




 
     sequelize.authenticate().then(()=>{
         console.log('Connection has been established successfully.');
    app.emit('ready');
     }).    
   catch ((error)=>{
    console.error('Unable to connect to the database:', error);
    app.emit('Error');
  })


app.on('ready',()=>{
    app.listen(port,()=>{

        console.log(`Connection established on port ${port} `);
    })
}).on('Error',()=>console.log('Connection error'));
    



app.use('/user',require('./routes/user'))



