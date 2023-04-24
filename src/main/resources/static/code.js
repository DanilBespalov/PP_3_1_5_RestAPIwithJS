console.log("TEST")
console.log("TEST")
console.log("TEST")
console.log("TEST")


const url = 'http://localhost:8080/api/admin'
const container = document.querySelector('tbody')
let resultData = ''

const formCreate = document.querySelector('.createForm')
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
            <a class="btnEdit btn btn-primary">Edit</a>
            </td>
        <td>
            <a class="btnDelete btn btn-danger">Delete</a>
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


  