
const Login = async (data) => {
    try{
        const {email,password}=data;
        if(!email||!password){
            throw "Incomplete";
        }

        const log = await signIn({email,password});
        if(!log){
            throw "Error logging in";
        }
        return true

    }
    catch(error){
        throw error;
    }
}

const Sign_Up = async (data) => {
    try{
        const {email,password,firstname,lastname,account,phone}=data;
        if(!email||!password){
            throw "Incomplete";
        }

        const log = await signUp({
            account:{
                email,
            username,
            password,
            account       
        },
            person:{
                firstname,
                lastname,
                phone
            }
        });
        if(!log){
            throw "Error logginf in";
        }
        return true
        

    }
    catch(error){
        throw error;
    }
}





$(document).ready(async ()=>{

    try{
        toastHolder(); // toast holder
        $('.toast').toast('show');

        await events()

    }
    catch(error){
        // console.log(error)
        toast({message:error,title:'Something went wrong',bg:'bg-warning'});

    }

});


const events = async()=>{
    try{
        const login = $('#loginBTN');

        login.on('click',async()=>{
            let email = $('#Uemail').val();
            let password = $('#Upassword').val();
           

            let loging = await Login({email,password});

            if(!loging){
                throw "Incomplete"
            }
            location.href = "/";

        })

        const signup = $('#signupBTN');

        signup.on('click',async ()=>{
            let email = $('#email').val();
            let password = $('#password').val();
            let username = $('#username').val();
            let firstname = $('#firstname').val();
            let lastname = $('#lastname').val();
            let account = $('#account').val();
            let phone = $('#phone').val();

            let loging = await Sign_Up({email,
                password,
                username,
                firstname,
                lastname,
                account,
                phone
            });

            if(!loging){
                throw "Incomplete"
            }
            location.href = "/";
            
        })



    }
    catch(error){
        throw error;
    }
}