async function fromDb() {
    const result = await fetch('http://127.0.0.1:9000/users')

    const json = await result.json()
    json.forEach(element => {
        const { name, surname, email, age, _id } = element;
        const card = document.createElement('div');
        card.className = "card";
        const np = document.createElement('h3');
        const mail = document.createElement('p');
        const howOld = document.createElement('p');
        const cards = document.querySelector('div.cards');
        const deletebtn = document.createElement('button');
        const editbtn = document.createElement('button');

        cards.appendChild(card);
        card.appendChild(np).innerHTML = name + ' ' + surname;
        card.appendChild(howOld).innerHTML = age;
        card.appendChild(mail).innerHTML = email;
        card.appendChild(deletebtn).innerHTML = 'Delete';
        card.appendChild(editbtn).innerHTML = 'Edit';
        deletebtn.addEventListener('click', async function () {
            await btDelete(_id); card.remove()
        })
        editbtn.addEventListener('click', async function () {
            card.innerHTML = '';
            card.className = "card-input";
            const np = document.createElement('input');
            const ln = document.createElement('input');
            const mail = document.createElement('input');
            const howOld = document.createElement('input');
            const deletebtn = document.createElement('button');
            const editbtn = document.createElement('button');

            card.appendChild(np).innerHTML = name;
            card.appendChild(ln).innerHTML = surname;
            card.appendChild(howOld).innerHTML = age;
            card.appendChild(mail).innerHTML = email;
            card.appendChild(deletebtn).innerHTML = 'Delete';
            card.appendChild(editbtn).innerHTML = 'Edit';
            deletebtn.addEventListener('click', async function () {
                await btDelete(_id); card.remove()
            })
            np.setAttribute('value', name);
            ln.setAttribute('value', surname)
            howOld.setAttribute('value', age)
            mail.setAttribute('value', email);
            editbtn.addEventListener('click', async function () {
                const newName = document.getElementById('name').value;
                const newSurname = document.getElementById('surname').value;
                const newAge = document.getElementById('age').value
                const newEmail = document.getElementById('email').value;
                if (
                    newName !== ''
                    && newSurname !== ''
                    && newEmail !== ''
                    && newName.length > 2
                    && newSurname.length > 2
                    && newEmail.indexOf('@') > -1
                    && newAge > 0
                ) {
                    await updateUser(_id, newName, newSurname, newAge, newEmail);
                    document.location.reload()
                } else {
                    alert('Klaidingai įrašyti duomenys')
                }
            })
            np.id = 'name'
            ln.id = 'surname'
            howOld.id = 'age'
            mail.id = 'email'
            mail.type = 'email'
        })
    });
}
fromDb()

async function btDelete(users_id) {
    const url = 'http://127.0.0.1:9000/users/' + users_id
    const deleted = await fetch(url, { method: 'DELETE' })
}

async function updateUser(id, newName, newSurname, newAge, newEmail) {

    const fetchBody = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            _id: id,
            name: newName,
            surname: newSurname,
            email: newEmail,
            age: newAge
        })
    };
    const response = await fetch('http://127.0.0.1:9000/users', fetchBody);
    const data = await response.json();

}

async function editDb() {
    const result = await fetch('http://127.0.0.1:9000/users')

    const json = await result.json()
    json.forEach(element => {
        const { name, surname, email, age, _id } = element;
        const card = document.createElement('div');
        card.className = "card";
        const np = document.createElement('input');
        const mail = document.createElement('input');
        const howOld = document.createElement('input');
        const cards = document.querySelector('div.cards');
        const deletebtn = document.createElement('button');
        const editbtn = document.createElement('button');

        cards.appendChild(card);
        card.appendChild(np).innerHTML = name + ' ' + surname;
        card.appendChild(howOld).innerHTML = age;
        card.appendChild(mail).innerHTML = email;
        card.appendChild(deletebtn).innerHTML = 'Delete';
        card.appendChild(editbtn).innerHTML = 'Edit';
        deletebtn.addEventListener('click', async function () {
            await btDelete(_id); card.remove()
        })
        np.setAttribute('value', name + ' ' + surname)
        howOld.setAttribute('value', age)
        mail.setAttribute('value', email);
        editbtn.addEventListener('click', async function () {
            await updateUser(_id, name, surname, age, email);
        })
        np.id = 'name'
        howOld.id = 'age'
        mail.id = 'email'
    });
}

