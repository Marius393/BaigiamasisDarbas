addBtn = document.getElementById('submit');

form = document.querySelector('form');

const usersName = document.querySelector('input[name="Name"]');
const usersSurname = document.querySelector('input[name="Last-Name"]');
const usersEmail = document.querySelector('input[name="Email-Address"]');
const usersAge = document.querySelector('input[name="Age"]');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = createInputObject();
    login(formData);
});

function createInputObject() {
    const formData = {
        usersName: usersName.value,
        usersSurname: usersSurname.value,
        usersAge: usersAge.value,
        usersEmail: usersEmail.value
    }
    return formData;
}

async function login(data) {

    if (
        data.usersName !== ''
        && data.usersSurname !== ''
        && data.usersEmail !== ''
        && data.usersName.length > 2
        && data.usersSurname.length > 2
        && data.usersEmail.indexOf('@') > -1
        && data.usersAge > 0
    ) {
        const formDataString = JSON.stringify(data)
        const result = await fetch('http://127.0.0.1:9000/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: formDataString
        })
        if (result.ok) {
            window.location.replace("http://127.0.0.1:9000/users.html");
        } else {
            alert('Blogai');
        }
    }
    else {
        alert('Klaidingai įrašyti duomenys')
    }
}