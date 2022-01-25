const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');





const myMail = {"mail":"anansesem.fie@thepostghana.com","password":"nanaasabere1992#"};

const mailer=(mail)=>{
  let status;
   var transporter = nodemailer.createTransport({
    host: 'mail.thepostghana.com',
    port: 465,
    secure: true,
    // secureConnection: false, // TLS requires secureConnection to be false
    auth: {
      user: myMail.mail,
      pass: myMail.password
    },
    tls: {
      ciphers:'SSLv3', 
      rejectUnauthorized: false,
  }
  
  });
  
  var mailOptions = {
    from: myMail.mail,
    to: mail.receiver,
    subject: mail.subject,
    text: mail.text,
    html:mail.html

  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      status= false;
    } else {
      console.log('Email info: ' +info.response );
      status=true;
      // return {Email_info:,Email_sent:true};
    }
  }); 

  return status;

}


const service={
    "port":process.env.PORT|| 5000,
    "host":process.env.HOST/*||"localhost"*/,
    "DB":process.env.DB/*||"mongodb://localhost:27017/Ananse_fie"*/,
    "secret":"symbiosis"
}





const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$#~*';
const genRandCode= (length)=>{
    length = parseInt(length);
    let result = ""
    let charactersLength = characters.length;
    for ( var i = 0; i < length ; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}




const jstBcrypt = async (word)=>{
    try{

        const salt = await bcrypt.genSalt();

        const newWord = await bcrypt.hash(word,salt);

        return newWord;


    }
    catch(error){
        throw error;
    }
}


const maxAge = 3*24*60*60;
//JWT
const createToken =(id)=>{
    return jwt.sign({id},service.secret,{
        expiresIn: maxAge
    });
}


const decode_JWT=async (code)=>{
    const token = code;
    //check token
    if(token){
        let back = {_id:""};
  
        try{
          
            await jwt.verify(token,service.secret,(err,decodedToken)=>{
            if(err){
                throw err;
            }
            else{
               
                back._id=decodedToken.id;
            }
            });
  
            return back;
        }
        catch(err){
            throw err;
        }
  
        }
        
        
   
  }

  module.exports={
    genRandCode,
    jstBcrypt,
    createToken,
    service,
    decode_JWT,
}