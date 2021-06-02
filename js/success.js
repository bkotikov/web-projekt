 async function showSuccess() {
    const success = document.getElementById("success-div");
    success.style.display = "block";
    hideSuccess();
}

 async function hideSuccess() {
    const success = document.getElementById("success-div");
    setTimeout(() => { success.style.display = "none"; }, 3000);
}

 async function showError() {
    const error = document.getElementById("error-div");
    error.style.display = "block";
    hideError();
}

 async function hideError() {
    const error = document.getElementById("error-div");
    setTimeout(() => { error.style.display = "none"; }, 3000);
}