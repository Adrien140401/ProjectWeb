let button = document.querySelector('.btnlogin');
function getInputs(){
    const email = document.getElementsByClassName("email").item(0).value;
    const password = document.getElementsByClassName("password").item(0).value;
    var xmlhr = new XMLHttpRequest();
    xmlhr.open("POST", 'http://127.0.0.1:8080/login', true);
    xmlhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhr.send(`email=${email}&password=${password}`);
    xmlhr.onload = function () {
        if (xmlhr.status === 200) {
            let userData = JSON.parse(xmlhr.responseText);

            localStorage.setItem("id", userData["id"]);
            localStorage.setItem("userData", xmlhr.responseText);
            window.location.href = "/index.html";
        }
    }
}