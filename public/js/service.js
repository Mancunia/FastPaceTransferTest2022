//API connections via HTTP requests


//..............................................................USERS................................................................
const signUp = async(body)=>{//SIGN UP for new a user
    try{
        const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                        const raw = JSON.stringify(body);

                      const requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                      };

                let result = await fetch(`/user/new`,requestOptions);    

                if(result.status>=400){
                        let res = await result.json();
                        throw res.error;
                }
                        let res = await result.json();
                return res;

    }
    catch(error){
        throw error;
    }
}


const signIn = async(body)=>{//SIGN IN for current user
    try{
        const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                        const raw = JSON.stringify(body);

                      const requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                      };

                let result = await fetch(`/user/login`,requestOptions);    

                if(result.status>=400){
                        let res = await result.json();
                        throw res.error;
                }
                        let res = await result.json();
                return res;
        

    }
    catch(error){
        throw error;
    }
}



// ..........................................................TESTS.............................................................
// const newTest = async(body)=>{//add new test
//     try{
        

//     }
//     catch(error){
//         throw error;
//     }
// }

// const getTests = async(body)=>{//GET ALL TESTS
//     try{
        

//     }
//     catch(error){
//         throw error;
//     }
// }


// const getTest = async(body)=>{//GET A SINGLE TEST
//     try{
        

//     }
//     catch(error){
//         throw error;
//     }
// }
//........................................................QUESTIONS.......................................................
const newQuestion = async(body)=>{//ADD A NEW QUESTION VIA A TEST ID
    try{
        

    }
    catch(error){
        throw error;
    }
}

const getQuestions = async(body)=>{//GET ALL QUESTIONS VIA A TEST ID
    try{
        const requestOptions={
            method:'GET'
        }
        let result = await fetch(`/question/questions`,requestOptions);
        if(result.status>=400){
            let res = result.json()
            throw res.error;
        }    

        return result.json();

    }
    catch(error){
        throw error;
    }
}

// const signUp = async(body)=>{
//     try{
        

//     }
//     catch(error){
//         throw error;
//     }
// }

// ...................................................................ANSWERS................................................................................
const postAnswer = async(body)=>{//POST A NEW ANSWER FOR A QUESTION
    try{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify(body);

              const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };

        let result = await fetch(`/question/answer`,requestOptions);    

        if(result.status>=400){
                let res = await result.json();
                throw res.error;
        }
                let res = await result.json();
        return res;

    }
    catch(error){
        throw error;
    }
}