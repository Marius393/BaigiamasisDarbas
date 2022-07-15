addBtn = document.getElementById('submit');

form = document.querySelector('form');

const usersName = document.querySelector('input[name="Name"]');
const usersSurname = document.querySelector('input[name="Last-Name"]');
const usersEmail = document.querySelector('input[name="Email-Address"]');
const usersAge = document.querySelector('input[name="Age"]');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = createInputObject();
    const formDataString = JSON.stringify(formData);
    login(formDataString);
});

function createInputObject() {
    const formData = {
        usersName:usersName.value,
        usersSurname:usersSurname.value,
        usersAge:usersAge.value,
        usersEmail:usersEmail.value,
        
    }
    return formData;
}
async function login(formDataString) {
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