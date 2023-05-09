async function showAllRole() {
    let dbRoles = [];
    let roles = await fetch("http://localhost:8080/api/admin/roles")
    await roles.json().then(roles => {
        roles.forEach(role =>
            dbRoles.push(role))
    });
    return dbRoles;
}

async function showRole() {

    const inputRoles = document.getElementById('rolesNew');
    let dbRoles = await showAllRole();
    inputRoles.innerHTML = `
            <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
            `
}

// async function roleArray(options) {
//     let dbRoles = await showAllRole();
//     let array = []
//     for (let i = 0; i < options.length; i++) {
//         if (options[i].selected) {
//             let role = {
//                 id: options[i].value,
//                 name: dbRoles[i].name
//             }

//             array.push(role)
//         }
//     }
//     return array
// }



document.getElementById('profile-tab').addEventListener('click', showRole)

// Находим ссылку, форму и модальное окно с кнопкой createButton
const createLink = document.querySelector('#addNewUser');
const createForm = document.querySelector('#form-create');
const myModal = new bootstrap.Modal(document.getElementById('addUserModal'))
const createButton = document.querySelector('#createUserButton');


// Добавляем обработчик событий на нажатие ссылки
createLink.addEventListener('click', (event) => {
    event.preventDefault();                   // Отменяем стандартное поведение ссылки
    console.log("  нажал на кнопку")
    createForm.style.display = 'block';       // Отображаем форму
});

// отменяем поведение формы
createForm.addEventListener('submit', event => {
    event.preventDefault();
  });
  
// Добавляем обработчик событий на клик по кнопке создания пользователя
createButton.addEventListener('click', createUser)
async function createUser() {
    
    const inputUserName = document.getElementById('usernameNew').value
    const inputName = document.getElementById('nameNew').value
    const inputSurname = document.getElementById('surnameNew').value
    const inputEmail = document.getElementById('emailNew').value
    const inputPassword = document.getElementById('passwordNew').value
    // let listRoles = await roleArray(document.getElementById('rolesNew'));

    if (inputUserName && inputName && inputSurname && inputEmail && inputPassword) {

        let user = {
            username: inputUserName,
            name: inputName, 
            surname: inputSurname, 
            email: inputEmail,
            password: inputPassword,
            // roles: listRoles
          };
          
        let res = await fetch(`http://localhost:8080/api/admin/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const result = await res.json(); 
        $('btnCloseForm').click();          
        console.log("создан пользователь: ", result);
        myModal.hide();
        $('#nav-tab-home').click();
    }

        inputUserName.value = ''
        inputName.value = ''
        inputSurname.value = ''
        inputEmail.value = ''
        inputPassword.value = ''

}





