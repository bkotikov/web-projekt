
$.ajax({
    type: "GET",
    url: '/archiv/',
    encode: true,

    success: function (response) {
        console.log("suc");
        console.log(response);
        console.log(Object.keys(response).length);
        nameasd(Object.keys(response).length, response);
    },
    error: function (xhr) {
        console.log(xhr);
        //Do Something to handle error
    }
});
console.log(12356);

function nameasd(params, param) {
    const container = document.getElementById('container');
    param.forEach(function(item, params) {
        console.log(item);
		container.innerHTML = container.innerHTML +  ' <div class="card" id="card"> <div class="box">  <div class="content"> <input type="text" hidden value="text"> <img class="content-img" src="/static/images/8681331601536080157.svg" alt=""> <p id="dateiname">'+ item.name + '</p> <button id="test" href="#">Download</button> </div> </div></div>';
	});
}