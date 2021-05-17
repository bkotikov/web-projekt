var first = document.getElementById("first");
var second = document.getElementById("second");
var third = document.getElementById("third");
first.addEventListener("click", () => {
    first.classList.add("trainOn");
    second.classList.remove("trainOn");
    third.classList.remove("trainOn");
    
});

second.addEventListener("click", () => {
    first.classList.add("trainOn");
    second.classList.add("trainOn");
    third.classList.remove("trainOn");
    
});


third.addEventListener("click", () => {
    
    first.classList.add("trainOn");
    second.classList.add("trainOn");
    third.classList.add("trainOn"); 
    
});