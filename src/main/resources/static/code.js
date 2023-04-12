console.log("TEST")
console.log("TEST")
console.log("TEST")
console.log("TEST")


// url API
const url = 'http://localhost:8080/api/admin'
const container = document.querySelector('tbody')
let resultData = ''

// const modalNew = new bootstrap.Modal(document.getElementById('modalNew'))

const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))

const formCreate = document.querySelector('.form')
const id = document.getElementById('id')
const userName = document.getElementById('username')
const name = document.getElementById('name')
const surname = document.getElementById('surname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const roles = document.getElementById('roles')
let option = ''

// Edit button event 
btnEdit.addEventListener('click', ()=>{
    id.value = ''
    userName.value = ''
    name.value = ''
    surname.value = ''
    email.value = ''
    password.value = ''
    roles.value = ''
    modalEdit.show()
    option = 'edit'
})


//function dataShow
const dataShow = (elements) => {
    elements.forEach(element => {

        const rolesName = element.roles.map(role => role.role.replace('ROLE_', ' ')).join(', ')
        resultData +=`
    <tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.surname }</td>
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


//Edit button
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('btnEdit')) {
        const row = event.target.closest('tr')
        const id = row.querySelector('td:first-child').textContent
        
        alertify.confirm("This is a confirm dialog.",
        function(){
        alertify.success('Изменения сохранены')
        },
        function(){
        alertify.error('Cancel')
        })
    }
});

// Edit form
let idForm = 0
on(document, 'click', 'btnEdit', e =>{
    const row = e.target.parentNode.parentNode
    idForm = row.children[0].innerHTML
    const nameForm = row.children[1].innerHTML
    const surnameForm = row.children[3].innerHTML
    const usernameForm = row.children[4].innerHTML
    const emailForm = row.children[5].innerHTML
    const rolesForm = row.children[6].innerHTML
})



//Delete button
on(document, 'click', '.btnDelete', e =>{
    const row = e.target.parentNode.parentNode
    const id = row.firstElementChild.innerHTML

    alertify.confirm("This is a confirm dialog.",
        function(){
        alertify.success('Пользователь удален')
        },
        function(){
        alertify.error('Cancel')
        });    
})

// Funсtion for forms and buttons
function on(element, eventType, selector, handler) {
    element.addEventListener(eventType, function(event) {
        const targetElement = event.target.closest(selector);
        if (targetElement && element.contains(targetElement)) {
            handler(event);
        }
    });
}

  