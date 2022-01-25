const express = require('express');
const app = express();
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser');

const {checkAccount}=require('./middleware/authUser')


const port = process.env.PORT||3000;

app.set('view engine','ejs');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));




 
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
    
//routes
app.get('*',checkAccount);

app.get('/',(req,res)=>{
    res.render('index');
})



app.use('/user',require('./routes/user'));
app.use('/question',require('./routes/question'));





app.use('',(req,res)=>{
    res.render("notFound");
    });