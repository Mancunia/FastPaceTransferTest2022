
const postQuestion = async(data)=>{
    try {
        if(!data){
            throw "Type question"
        }

        const state = await newQuestion(data);
        if(!state){
            throw "Error posting question";
        }

        return state;

    } 
    catch (error) {
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
        const addQuestion = $('#addQuestion');

        addQuestion.on('click',async ()=>{
            let question = $('#question').val();
            const  newQuest= await postQuestion(question);

            if(!newQuest){
                throw "Error "
            }
            location.reload();

        });

    }
    catch(error){
        throw error;
    }
}