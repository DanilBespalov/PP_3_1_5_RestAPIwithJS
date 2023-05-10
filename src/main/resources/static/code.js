console.log("TEST")
console.log("TEST")
console.log("TEST")
console.log("TEST")


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


//function dataShow
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
            <a id="btnEdit" class="btnEdit btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUserModal">Edit</a>
            </td>
        <td>
            <a id="btnDel" class="btnDelete btn btn-danger" data-bs-toggle="modal" data-bs-target="#delUserModal">Delete</a>
            
            </td>
    </tr>`
    });
    container.innerHTML = resultData
}

//Process
fetch(url)
    .then(response => response.json())
    .then(data => dataShow(data))
    .catch(error => console.log(error))


  