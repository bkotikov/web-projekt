
$.ajax({
    type: "GET",
    url: '/archiv',
    encode: true,

    success: function (response) {
        console.log("suc");
        console.log(response);
        console.log(Object.keys(response).length);
        if (Object.keys(response).length > 0) {
            nameasd(Object.keys(response).length, response);
        } else {
            asda();
        }
    },
    error: function (xhr) {
        console.log(xhr);
        //Do Something to handle error
    }
});

$(document).on('click', '.btn-card', function () {
    //alert(this.name);
    window.location.href = "/download/" + this.name;
})

function asda() {
    const container = document.getElementById('container');
    container.style.flexDirection = "column";
    const imag = document.getElementById('mig');
    imag.style.display = "block";
}

function nameasd(params, param) {
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
        para.value = '' + item.name;
        para.id = "dateiname" + params;
        para.innerText = "" + item.name;

        const btn = document.createElement("button");
        btn.type = "submit";
        btn.innerText = "download-" + params;
        btn.id = "download" + params;
        btn.name = item.name;
        btn.classList.add("btn-card");

        box.appendChild(content);
        content.appendChild(input);
        content.appendChild(image);
        content.appendChild(para);
        content.appendChild(btn);

        card.appendChild(box);

        container.appendChild(card);

        console.log(item);
    });

}

