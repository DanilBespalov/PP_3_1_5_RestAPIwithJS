
// // Функция получения всех ролей
// async function showAllRole() {
//   let dbRoles = [];
//   let roles = await fetch("http://localhost:8080/api/admin/roles");
//   await roles.json().then(roles => {
//     roles.forEach(role => dbRoles.push(role))
//   });
//   return dbRoles;
// }


// Получаем ссылки на элементы страницы
const delLinks = document.getElementById('btnDel');
const delForm = document.getElementById('form-delete');
const delModal = new bootstrap.Modal(document.getElementById('delUserModal'));
const delButton = document.getElementById('deleteUserButton');


// Добавляем обработчик событий на нажатие ссылки
delLinks.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("  нажал на кнопку delete")
    delForm.style.display = 'block';       // Отображаем форму
});

// отменяем поведение формы
delForm.addEventListener('submit', event => {
    event.preventDefault();
});

// Добавляем обработчик события на кнопку удаления
delButton.addEventListener('click', async () => {
    const id = $('.deleteForm #id').val();
    const href = `http://localhost:8080/api/admin/delete/${id}`;
    
    await fetch(href, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    });

    $('#deleteFormCloseButton').click();
    console.log("удален пользователь: ", id);
    delModal.hide();
    $('#nav-tab-home').click();
});

async function deleteUserData(id) {
    const href = `http://localhost:8080/api/admin/delete/${id}`;

    // Получаем данные пользователя
    $.get(href, function (user) {
        // Заполняем форму данными пользователя
        $('.deleteForm #id').val(user.id);
        $('.deleteForm #name').val(user.name);
        $('.deleteForm #surname').val(user.surname);
        $('.deleteForm #username').val(user.username);
        $('.deleteForm #email').val(user.email);
    });
}



// async function deleteUserData(id) {
//   let href = `http://localhost:8080/api/admin/delete/${id}`
  
// //   let dbRoles = await showAllRole();

//   // Получаем данные пользователя
//   $.get(href, function (user) {
//     // Заполняем форму данными пользователя
//     $('.deleteForm #id').val(user.id);
//     $('.deleteForm #name').val(user.name);
//     $('.deleteForm #surname').val(user.surname);
//     $('.deleteForm #username').val(user.username);
//     $('.deleteForm #email').val(user.email);

//     // // Заполняем список ролей
//     // const inputRoles = document.getElementById('rolesDel')
//     // inputRoles.innerHTML = `
//     //   <option value="${dbRoles[0].id}" name="ROLE_USER" >${dbRoles[0].shortName}</option>
//     //   <option value="${dbRoles[1].id}" name="ROLE_ADMIN" >${dbRoles[1].shortName}</option>
//     // `
//   })

//   // Добавляем обработчик события на кнопку удаления
//     delButton.addEventListener('click', async () => {
//     await fetch(`http://localhost:8080/api/admin/delete/${id}`, {
//       method: "DELETE",
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     $('#deleteFormCloseButton').click()
//     console.log("удален пользователь: ", id);
//     delModal.hide();
//     $('#nav-tab-home').click();
//   });
// }
