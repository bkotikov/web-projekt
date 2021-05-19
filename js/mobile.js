var mobile = document.getElementById("mobile")
if (mobile) {
        mobile.addEventListener("click", () => {
            var x = document.getElementById("myLinks");
            x.classList.toggle("block");
        });
}

