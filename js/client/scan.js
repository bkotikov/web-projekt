var lang  = window.location.pathname.split('/')[1];


$("#submit").on("click", function (event) {
    event.preventDefault();
    var fdata = new FormData();
    var files = $('#fileUpload')[0].files[0];
    mimetype = files.type.split("/");
    if (!(mimetype[0] === "image" && (mimetype[1] === "bmp" || mimetype[1] === "jpg" || mimetype[1] === "png" || mimetype[1] === "pbm" || mimetype[1] === "jpeg"))) {
        console.log(mimetype);
        showError();
        return;
    } 
    
    fdata.append( 'file', files );
    showRegSuccess();
    $.ajax({
        url: '/scan',
        data: fdata,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', 
    })
    .done(res =>{
        if (res.form === "gez") {
            window.location = "/" + lang + "/gez";
        }
        if (res.form === "woan") {
            window.location = "/" + lang + "/woan";
        }
        if (res.form === "kind") { 
            window.location = "/" + lang + "/kind";
        }
    })
    .fail(res => {
        console.log(res.responseJSON.fehler);
        if (res.responseJSON.fehler === "type") {
            showError();
        }
        if (res.responseJSON.fehler === "reg") {
            hideRegSuccess()
            showRegError();
        }
        
    });
  
  });


  async function showRegSuccess() {
    const success = document.getElementById("success-div");
    success.style.display = "block";
}

async function hideRegSuccess() {
    const success = document.getElementById("success-div");
     success.style.display = "none";
}


  async function showRegError() {
    const error = document.getElementById("error-div-reg");
    error.style.display = "block";
    hideRegError();
}
async function hideRegError() {
    const error = document.getElementById("error-div-reg");
    setTimeout(() => { error.style.display = "none"; }, 10000);
}