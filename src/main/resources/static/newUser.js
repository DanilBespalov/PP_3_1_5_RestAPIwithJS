// Функция для получения ролей из API
// async function showAllRole() {
//     let dbRoles = [];
//     let roles = await fetch("http://localhost:8080/api/admin/roles"); 
//     await roles.json().then(roles => {
//         roles.forEach(role =>
//             dbRoles.push(role))
//     });
//     return dbRoles;
// }
// showAllRole().then(console.log)


// async function showRole() {

//     const inputRoles = document.getElementById('rolesNew');
//     let dbRoles = await showAllRole();
//     inputRoles.innerHTML = `
//             <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
//             <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
//             `
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
// Получаем выбранные роли из выпадающего списка
// const selectedRoles = Array.from(
//     document.querySelectorAll("#rolesNew option:checked")
//   ).map((option) => option.value);
  });
  
// Добавляем обработчик событий на клик по кнопке создания пользователя
createButton.addEventListener('click', createUser)
async function createUser() {
    
    const inputUserName = document.getElementById('usernameNew').value
    const inputName = document.getElementById('nameNew').value
    const inputSurname = document.getElementById('surnameNew').value
    const inputEmail = document.getElementById('emailNew').value
    const inputPassword = document.getElementById('passwordNew').value

    // let listRoles = await showAllRole(document.getElementById('rolesNew'));
    

    console.log("inputUserName: ", inputUserName);
    console.log("inputName: ", inputName);
    console.log("inputSurname: ", inputSurname);
    console.log("inputEmail: ", inputEmail);
    console.log("inputPassword: ", inputPassword);
    // console.log("listRoles: ", listRoles);
    
    console.log(inputUserName, inputName, inputSurname, inputEmail, inputPassword);
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
            body: JSON.stringify({user})
        });

        console.log("inputUserName: ", inputUserName);
        console.log("inputName: ", inputName);
        console.log("inputSurname: ", inputSurname);
        console.log("inputEmail: ", inputEmail);
        console.log("inputPassword: ", inputPassword);
        // console.log("listRoles: ", listRoles);
        console.log("  пользователь получен")

        const result = await res.json();             // Получаем ответ от сервера в формате JSON
        console.log("создан пользователь: ", result);
        $('#nav-tab-home').click();                  // Переключаемся на вкладку Home
    }

    // document.getElementById('form-create').reset();

}



