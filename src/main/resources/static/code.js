console.log("TEST")
console.log("TEST")
console.log("TEST")
console.log("TEST")


// url API
const url = 'http://localhost:8080/api/admin'
const container = document.querySelector('tbody')
let resultData = ''

const modalNew = new bootstrap.Modal(document.getElementById('modalNew'))
const formEdit = document.querySelector('.form')
const userName = document.getElementById('username')
const nameCreate = document.getElementById('name')
const lastName = document.getElementById('surname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const selectRole = document.getElementById('roles')
let option = ''

// Edit button event
btnCreate.addEventListener('click', ()=>{
    // idUpdate.value = ''
    userName.value = ''
    nameCreate.value = ''
    lastName.value = ''
    email.value = ''
    password.value = ''
    selectRole.value = ''
    modalNew.show()
    option = "create"
})

//function dataShow
const dataShow = (elements) => {
    elements.forEach(element => {
        resultData +=`
    <tr>
        <td>${element.userName}</td>
        <td>${element.nameCreate}</td>
        <td>${element.lastName}</td>
        <td>${element.email}</td>
        <td>${element.password}</td>
        <td class="text-center">
            <a class="btnEdit btn btn-primary">Edit</a>
            <a class="btnDelete btn btn-danger">Delete</a>
            </td>
        <td>${element.selectRole}</td>
    </tr>`
    });
    container.innerHTML = resultData
}

//Process
fetch(url)
    .then(response => response.json())
    .then(data => dataShow(data))
    .catch(eror => console.log(eror))

