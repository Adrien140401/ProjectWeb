const fields = ["email", "password", "firstName", "name", "phone"];

if (localStorage.getItem("id") == null) window.location = "./login.html";

if (localStorage.getItem("id") !== null) {
    let userData = JSON.parse(localStorage.getItem("userData"));

    for (let i = 0; i < fields.length; i++) {
        console.log(userData[fields[i]]);

        const element = document.getElementById(fields[i]);
        element.value = userData[fields[i]];
    }
}

function update() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("firstName").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    var xmlhr = new XMLHttpRequest();
    xmlhr.open("PUT", 'http://127.0.0.1:8080/update', true);
    //xmlhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhr.send(`
                email=${email}&
                password=${password}&
                firstName=${firstName}&
                name=${name}&
                phone=${phone}`);
}

function suppr() {

}