// url API
const url = 'http://localhost:8080/api/admin'
const container = document.querySelector('tbody')
let resultData = ''

const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const formEdit = document.querySelector('.form')
const idUpdate = document.getElementById('idUpdate')
const userNameUpdate = document.getElementById('userNameUpdate')
const nameUpdate = document.getElementById('nameUpdate')
const lastnameUpdate = document.getElementById('lastnameUpdate')
const emailUpdate = document.getElementById('emailUpdate')
const passwordUpdate = document.getElementById('passwordUpdate')
const selectUpdateRole = document.getElementById('selectUpdateRole')
let option = ''

// Edit button event
btnEdit.addEventListener('click', ()=>{
    // idUpdate.value = ''
    userNameUpdate.value = ''
    nameUpdate.value = ''
    lastnameUpdate.value = ''
    emailUpdate.value = ''
    passwordUpdate.value = ''  
    selectUpdateRole.value = ''
    modalEdit.show()
    option = "edit"
})

//function dataShow
const dataShow = (elements) => {
    elements.forEach(element => {
        resultData +=`
    <tr>
        <td>${element.idUpdate}</td>
        <td>${element.userNameUpdate}</td>
        <td>${element.nameUpdate}</td>
        <td>${element.lastnameUpdate}</td>
        <td>${element.emailUpdate}</td>
        <td>${element.passwordUpdate}</td>
        <td>${element.selectUpdateRole}</td>
    </tr>`
    });
    container.innerHTML = resultData
} 

//Process
fetch(url)
    .then(response => response.json())
    .then(data => dataShow(data))
    .catch(eror => console.log(eror))

