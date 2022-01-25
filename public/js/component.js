const addQuestion = (data,loc)=>{
    // const position = $(loc);

    loc.append(`
    <div class="card">
    <div class="card-body">
        <h3>
            ${data.question}
        </h3>
        
        <input class="form-control" type="text" placeholder="Type answer here" id="${data.ref}">

        <button class="btn btn-dark text-white" data-target="${data.ref}" id="answer">Answer</button>
        

    </div>
    <div class="card-footer bg-dark text-white"></div>
</div>
    `);
}


























//toasts holder
const toastHolder = ()=>{
    $('body').append(`
    <!-- notifications -->
    <div class="floatingDivToasts" id="toasting">

      

    </div>
    `);
}

//toasts
const toast = (msg)=>{
    // console.log(msg.bg)
    $('#toasting').append(`
    <div role="alert" aria-live="assertive" aria-atomic="true" onload="attemptClose(this)" class="toast ${msg.bg}" data-bs-autohide="false">
    <div class="toast-header">
     
      <strong class="me-auto">${msg.title}</strong>
      
      <button type="button" class="btn btn-light" id="closeToast" onclick="closeToast(this)">X</button>
    </div>
    <div class="toast-body">
      ${msg.message}
    </div>
  </div>

    `);
}
const closeToast = (e)=>{
    e.parentElement.parentElement.style.display='none';
}