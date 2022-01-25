const allQuestions = async()=>{
    try{
        const position = $('#questions');
        const questions = await getQuestions();
        if(questions.questions.length<1){

            position.append(`
            <div class="card">
            <div class="card-body">
                <h3>
                   No questions Yet!
                </h3>

            </div>
        </div>
            `)

        }
        console.log(questions.questions)

        questions.questions.forEach(quest=>addQuestion(quest,position));
    }
    catch(error){
        // console.log(error)
        throw error;
    }
}


const answerQuestion = async(data)=>{
    try{
        const {answer,question} = data;
        if(!answer||!question){
            throw "Incomplete";
        }

        const thisAnswer = await postAnswer({answer:answer,questionRef:question});
        if(!thisAnswer){
            throw 'Something happened while posting answer'
        }
        else{
           return true; 
        }

        

    }
    catch(error){

        throw error;
    }
}



$(document).ready(async ()=>{

    try{
        toastHolder(); // toast holder
        $('.toast').toast('show');

        await allQuestions();
        await events()

    }
    catch(error){
        // console.log(error)
        toast({message:error,title:'Something went wrong',bg:'bg-warning'});

    }

});





const events = async ()=>{
    try{
        const answerBTN = document.querySelectorAll('#answer');
        console.log

        answerBTN.forEach(async (ans)=>{
            ans.addEventListener('click',async ()=>{
                try{
                   let target = ans.getAttribute("data-target");
                let answer = $(`#${target}`).val();

                let myAnswer = await answerQuestion({answer,question:target});
                if(!myAnswer){
                    throw 'Error'
                }
                // console.log(myAnswer);
                toast({message:'Answer Sent',title:'Notice',bg:'bg-success'});
                    $(`#${target}`).text('');
                // location.href =`/question/${target}` 
                }
                catch(error){
                    throw error;
                }
                
            })
        })

    }
    catch(error){
        throw error
    }
}