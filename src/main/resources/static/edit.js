console.log("TEST")
console.log("TEST")
console.log("TEST")
console.log("TEST")

async function showAllRole() {
    let dbRoles = [];
    let roles = await fetch("http://localhost:8080/api/admin/edit/${id}")
    await roles.json().then(roles => {
        roles.forEach(role =>
            dbRoles.push(role))
    });
    return dbRoles;
}
async function editUserData(id) {
    
    // Заполнение формы данными пользователя
    let href = `http://localhost:8080/api/admin/edit/${id}`
    let dbRoles = await showAllRole();
    $.get(href, function (user) {
        $('.form #id').val(user.id);
        $('.form #username').val(user.firstName);
        $('.form #name').val(user.lastName);
        $('.form #surname').val(user.age);
        $('.form #email').val(user.email);
        $('.form #password').val("");
        // const inputRoles = document.getElementById('roles');

        // inputRoles.innerHTML = `
        //     <option value="${dbRoles[0].id}">${dbRoles[0]}</option>
        //     <option value="${dbRoles[1].id}">${dbRoles[1]}</option>
        //     `
    })

     // Добавление обработчика события на кнопку
    document.querySelector('.btnEdit').addEventListener('click', async () => {
        const editId = document.getElementById('id').value
        const editUserName = document.getElementById('username').value
        const editName = document.getElementById('name').value
        const editSurname = document.getElementById('surname').value
        const editEmail = document.getElementById('email').value
        const editPassword = document.getElementById('password').value
        const editRoles = document.getElementById('roles').value

        // const listRoleEditUser = await roleArray(document.getElementById('roles'))


        if (editId && editUserName && editName && editSurname && editEmail) {
            const response = await fetch(`http://localhost:8080/api/admin/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({editId, editUserName, editName, editSurname, editEmail, editPassword, editRoles})
            });
            const result = await response.json();

            alertify.confirm("This is a confirm dialog.",
            function(){
            alertify.success('Изменения сохранены')
            },
            function(){
            alertify.error('Cancel')
            })
            $('#editFormCloseButton').click()
            await list()

        }
    })
}
