
const Login = async (data) => {
    try{
        const {email,password}=data;
        if(!email||!password){
            throw "Incomplete";
        }

        const log = await signIn({email,password});
        if(!log){
            throw "Error logginf in";
        }
        return true

    }
    catch(error){
        throw error;
    }
}

const Sign_Up = async (data) => {
    try{
        const {email,password}=data;
        if(!email||!password){
            throw "Incomplete";
        }

        const log = await signIn({email,password});
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

        signup.on('click',()=>{
            
        })



    }
    catch(error){
        throw error;
    }
}