


$("#submit").on("click", function (event) {
    event.preventDefault();
    var fdata = new FormData();
    var files = $('#fileUpload')[0].files[0];
    fdata.append( 'file', files );

    $.ajax({
        url: '/scan',
        data: fdata,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', 
    }).fail(fail => {
        console.log(fail.responseJSON.fail);
        showError();
        
        
    });
  
  });