
$.ajax({
    type: "GET",
    url: '/archiv',
    encode: true,

    success: function (response) {
        if (Object.keys(response).length > 0) {
            nameasd(response);
        } else {
            asda();
        }
    },
    error: function (xhr) {
        asda();
    }
});

$(document).on('click', '.btn-card', function () {
    $.ajax({
        type: "POST",
        url: "/pdf",
        data: {pdfid: this.value},
        encode: true
    }).done(data => {
      
                    var egal = new Uint8Array(Object.values(data));
                    console.log("egal: " + egal)
                    var blob = new Blob([egal], { type: "application/octetstream" });
 
                    //Check the Browser type and download the File.
                    var isIE = false || !!document.documentMode;
                    if (isIE) {
                        window.navigator.msSaveBlob(blob, this.name + ".pdf");
                    } else {
                        var url = window.URL || window.webkitURL;
                        link = url.createObjectURL(blob);
                        var a = $("<a />");
                        a.attr("download", this.name + ".pdf");
                        a.attr("href", link);
                        $("body").append(a);
                        a[0].click();
                        $("body").remove(a);
                    }
                    
      
    }).fail(fail => {
        
    });
})

function asda() {
    const container = document.getElementById('container');
    container.style.flexDirection = "column";
    const imag = document.getElementById('mig');
    imag.style.display = "block";
}

function nameasd(param) {
    const container = document.getElementById('container');

    param.forEach(function (item, params) {
        const card = document.createElement("div");
        card.id = "card" + params;
        card.classList.add("card");

        const box = document.createElement("div");
        box.classList.add("box");

        const content = document.createElement("div");
        content.classList.add("content");

        const input = document.createElement("input");
        input.type = "text";
        input.value = "text";
        input.hidden = true;

        const image = document.createElement("img");
        image.src = "/static/images/8681331601536080157.svg"
        image.classList.add("content-img");

        const para = document.createElement("p");
        para.type = "text";
        para.disabled = true;
        para.classList.add("dateiname");
        var data = new Date(item.createdate);
        para.id = "dateiname" + params;
        para.innerText = '' + ('0' + data.getDate()).slice(-2) + "-" + ('0' + (data.getMonth()+1)).slice(-2) + "-" + data.getFullYear() + " " + ('0' + data.getHours()).slice(-2) + ":" + ('0' + data.getMinutes()).slice(-2);

        const btn = document.createElement("button");
        btn.type = "submit";
        var lang = window.location.pathname.split('/')[1];
        if (lang === "de") {
            btn.innerText = "Herunterladen";
        } else if(lang === "en"){
            btn.innerText = "Download";
        } else if(lang === "ru"){
            btn.innerText = "Скачать";
        } else if(lang === "bg"){
            btn.innerText = "Изтегли";
        }
        btn.id = item.id;
        btn.name = '' + ('0' + data.getDate()).slice(-2) + "-" + ('0' + (data.getMonth()+1)).slice(-2) + "-" + data.getFullYear() + " " + ('0' + data.getHours()).slice(-2) + "-" + ('0' + data.getMinutes()).slice(-2);
        btn.value = item.id;
        btn.classList.add("btn-card");

        box.appendChild(content);
        content.appendChild(input);
        content.appendChild(image);
        content.appendChild(para);
        content.appendChild(btn);

        card.appendChild(box);

        container.appendChild(card);
    });

}


/* 
db.getpdfdata(sess.benutzer_id).then(res =>{
    response.status(201).send(new Uint8Array(res.pdfdata.buffer));
  }).catch(err => {
    console.log(err);
  }); 
*/