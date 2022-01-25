const {Users,Person} = require('../models');
const {jstBcrypt,genRandCode,createToken} = require('../utils/util');

// const User = db.Users;
const maxAge = 3*24*60*60;

// User.login('Emmauel','1233445');

const newUser = async(req,res)=>{
    try{
        /*
        1.get body from request
        2.check and assign account type
        3.check if username exists 
        4. attempt to create account
        5. show success message
        */
       let {username,email,password,account} = req.body.account;
       const {firstname,lastname,phone} = req.body.person;


        if(account =='Admin'){// step 2
            account=1
        }
        else{
            account=0
        }

            const newUsername = `${username}-${genRandCode(4)}`
        const userName = await Users.findOne({ where: { username:newUsername } });//step 3 check for username
        if(userName !== null){
            throw 'Username taken'
        }
        
        const userEmail = await Users.findOne({ where: { email } });//step 3 check for username
        if(userEmail !== null){
            throw 'Email already used'
        }

        const thisPerson = await Person.newPerson({firstname,lastname,phone});
        if(thisPerson ==null){
            throw 'Error creating Account'
        }

        const hasedPassword = await jstBcrypt(password);
        



        const NewUser = Users.build({ 
            username:newUsername,
            email,
            password:hasedPassword,
            account,
            personID:thisPerson.id

        });

        const done = await NewUser.save();

        if(!done){
            throw 'Error creating account'
        }

        res.status(200).json({status: 'success'});

    }
    catch(error){
        console.log(error);
        res.status(403).json({error:error});
    }
}


const login = async(req,res) => {
    try{
        // console.log(req.cookies)
        if(req.cookies.jwt){
            throw 'A User is logged in already'
        }

        const {email,password} =req.body;
      console.log(email,password);
      const thisUser = await Users.login(email,password);
      if(!thisUser){
          throw 'Error attempting login';
      }
      console.log(thisUser.username);
      const token = createToken(thisUser.username);

      let user ={
        username: thisUser.username,
        email: thisUser.email

    }

      res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});

      res.status(200).json({user});



    }
    catch(error){
        console.log(error);
        res.status(404).json({error});
    }
}



module.exports ={
    newUser,
    login
}