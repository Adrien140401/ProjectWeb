function getInputs() {
    console.log('test');
    const firstname = document.getElementsByClassName("firstname").item(0).value;
    const name = document.getElementsByClassName("name").item(0).value;
    const email = document.getElementsByClassName("email").item(0).value;
    const password = document.getElementsByClassName("password").item(0).value;
    const phone = document.getElementsByClassName("phone").item(0).value;
    console.log(firstname);
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(phone);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://127.0.0.1:5500/register', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(`firstname=${firstname}&name=${name}&email=${email}&password=${password}&phone=${phone}`);
}