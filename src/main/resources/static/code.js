$(async function () {
    // await getAuthUser();
    await getAllUsers();
    await newUser();
    // removeUser();
    // updateUser();

});

// Получение списка пользователей 
const url = 'http://localhost:8080/api/admin'
const container = document.querySelector('tbody')
let resultData = ''

const id = document.getElementById('id')
const userName = document.getElementById('username')
const name = document.getElementById('name')
const surname = document.getElementById('surname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const roles = document.getElementById('roles')
let option = ''

async function getAllUsers() {
const dataShow = (elements) => {
    elements.forEach(element => {

        const rolesName = element.roles.map(role => role.role.replace('ROLE_', ' ')).join(', ')
        resultData += `
    <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.surname}</td>
        <td>${element.username}</td>
        <td>${element.email}</td>
        <td>${rolesName}</td>
        <td>
            <a id="btnEdit" class="btnEdit btn btn-primary" data-action="Edit" data-bs-toggle="modal" data-bs-target="#editUserModal">Edit</a>
            </td>
        <td>
            <a id="btnDel" class="btnDelete btn btn-danger" data-userid="${element.id}" data-action="Delete" data-bs-toggle="modal" data-bs-target="#delUserModal">Delete</a>
            
            </td>
    </tr>`
    });
    container.innerHTML = resultData
}

fetch(url)
    .then(response => response.json())
    .then(data => dataShow(data))
    .catch(error => console.log(error))

}

async function getUser(id) {
    let url = "http://localhost:8080/api/admin/" + id;
    let response = await fetch(url);
    return await response.json();
}

// Создание нового пользователя
async function getRolesOption() {
    await fetch("http://localhost:8080/api/admin/roles")
        .then(response => response.json())
        .then(roles => {
            roles.forEach(role => {
                let el = document.createElement("option");
                el.value = role.id;
                el.text = role.role.substring(5);
                $('#rolesNew')[0].appendChild(el);
            })
        })
}

async function newUser() {
    await getRolesOption();
    
    const createForm = document.forms["createForm"];
    const createLink = document.querySelector('#addNewUser');
    const createButton = document.querySelector('#createUserButton');
    
    // Добавляем обработчик событий на нажатие ссылки
    createLink.addEventListener('click', (event) => {
    event.preventDefault();                   
    console.log("  нажал на кнопку")
    createForm.style.display = 'block';       
});
    createForm.addEventListener('submit', addNewUser)
    createButton.addEventListener('click', addNewUser);

    async function addNewUser(e) {
        e.preventDefault();
        let newUserRoles = [];
        for (let i = 0; i < createForm.role.options.length; i++) {
            if (createForm.role.options[i].selected) newUserRoles.push({
                id: createForm.role.options[i].value,
                roles: createForm.role.options[i].text
            })
        }

        fetch("http://localhost:8080/api/admin/new", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: createForm.usernameNew.value,
                name: createForm.nameNew.value, 
                surname: createForm.surnameNew.value, 
                email: createForm.emailNew.value,
                password: createForm.passwordNew.value,
                roles: newUserRoles
            })
        }).then(() => {
                console.log("создан пользователь: ");
                createForm.reset();
                $('#btnCloseForm').click();
                getAllUsers();
            })
    }
}

function removeUser(){
    
    const deleteForm = document.forms["deleteForm"];
    const id = deleteForm.id.value;
    const hrefDel = `http://localhost:8080/api/admin/delete/${id}`;

    deleteForm.addEventListener("submit", ev => {
        ev.preventDefault();
        fetch(hrefDel, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
                getAllUsers();
                $('#deleteFormCloseButton').click();

            })
    })
}

$('#delUserModal').on('show.bs.modal', ev => {
    let button = $(ev.relatedTarget);
    let id = button.data('userid');
    showDeleteModal(id);
})
//

async function showDeleteModal(id) {
    let user = await getUser(id)
    let form = document.forms["formDeleteUser"];
     
    form.id.value = user.id;
    form.username.value = user.username;
    form.name.value = user.name;
    form.surname.value = user.surname;
    form.email.value = user.email;
    form.password.value = user.password;

    $('#rolesDel').empty();

    user.role.forEach(role => {
        let el = document.createElement("option");
        el.text = role.roleName.substring(5);
        el.value = role.id;
        $('#rolesDel')[0].appendChild(el);
    });
}


