// async function showRole() {

//     const inputRoles = document.getElementById('roles');
//     let dbRoles = await showAllRole();
//     inputRoles.innerHTML = `
//             <option value="${dbRoles[0].id}">${dbRoles[0].shortName}</option>
//             <option value="${dbRoles[1].id}">${dbRoles[1].shortName}</option>
//             `
// }


// document.getElementById('profile-tab').addEventListener('click', showRole)
function showCreateUserForm() {
    const createUserForm = document.getElementById('form-create');
    createUserForm.style.display = 'block';
}

// document.getElementById('addNewUser').addEventListener('click', showCreateUserForm);

console.log("CREATE")

document.getElementById('addNewUser').addEventListener('click', createUser)

console.log("CREATE2")


async function createUser() {

    const inputUserName = document.getElementById('username').value
    const inputName = document.getElementById('name').value
    const inputSurname = document.getElementById('surname').value
    const inputEmail = document.getElementById('email').value
    const inputPassword = document.getElementById('password').value
    // const inputRoles = document.getElementById('roles').value

    // let listRoles = await roleArray(document.getElementById('roles'));

    console.log("CREATE3")
    if (inputUserName && inputName && inputSurname && inputEmail && inputPassword) {

        let res = await fetch(`http://localhost:8080/api/admin/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({inputUserName, inputName, inputSurname, inputEmail, inputPassword})
        });
        const result = await res.json();
        await list()
        $('#nav-tab-home').click();
    }

    // document.getElementById('form-create').reset();

}
  








// // Получаем ссылку на кнопку
// const addNewUserBtn = document.getElementById('addNewUser');

// // Добавляем обработчик событий на клик по кнопке
// addNewUserBtn.addEventListener('click', showCreateUserForm);

// // Функция для отображения формы создания пользователя
// function showCreateUserForm() {
//   // Получаем форму по id
//   const createUserForm = document.getElementById('form-create');
//   // Показываем форму, установив стиль display в block
//   createUserForm.style.display = 'block';
// }

// // Добавляем обработчик событий на клик по кнопке создания пользователя
// document.getElementById('createUserBtn').addEventListener('click', createUser);

// // Функция для создания нового пользователя
// async function createUser() {
//   // Получаем значения полей ввода
//   const inputUserName = document.getElementById('username').value;
//   const inputName = document.getElementById('name').value;
//   const inputSurname = document.getElementById('surname').value;
//   const inputEmail = document.getElementById('email').value;
//   const inputPassword = document.getElementById('password').value;

//   // Проверяем заполнены ли обязательные поля
//   if (inputUserName && inputName && inputSurname && inputEmail && inputPassword) {
//     // Отправляем POST запрос на сервер
//     const res = await fetch('http://localhost:8080/api/admin/new', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ inputUserName, inputName, inputSurname, inputEmail, inputPassword })
//     });
//     // Получаем ответ от сервера в формате JSON
//     const result = await res.json();
//     // Обновляем список пользователей
//     await list();
//     // Переключаемся на вкладку Home
//     $('#nav-tab-home').click();
//   }
// }

// // Функция для получения списка ролей
// async function roleArray(select) {
//   let roles = [];
//   const options = select && select.options;
//   let opt;

//   for (let i = 0, len = options.length; i < len; i++) {
//     opt = options[i];

//     if (opt.selected) {
//       roles.push(opt.value);
//     }
//   }
//   return roles;
// }
