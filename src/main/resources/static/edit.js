async function roleArray(options) {
    let dbRoles = await showAllRole();
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {
                id: options[i].value,
                name: dbRoles[i].name
            }

            array.push(role)
        }
    }
    return array
}
const myModalEdit = new bootstrap.Modal(document.getElementById('editUserModal'))

async function editUserData(id) {
    
    // Заполнение формы данными пользователя
    let href = `http://localhost:8080/api/admin/edit/${id}`
    let dbRoles = await showAllRole();
    $.get(href, function (user) {
        $('.editForm #id').val(user.id);
        $('.editForm #name').val(user.name);
        $('.editForm #surname').val(user.surname);
        $('.editForm #username').val(user.username);
        $('.editForm #email').val(user.email);
        $('.editForm #password').val("");
        const inputRoles = document.getElementById('rolesEdit');

        inputRoles.innerHTML = `
            <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
            `
    })


     // Добавление обработчика события на кнопку
    document.querySelector('.btnEdit').addEventListener('click', async () => {
        const editId = document.getElementById('id').value
        const editUserName = document.getElementById('usernameEdit').value
        const editName = document.getElementById('nameEdit').value
        const editSurname = document.getElementById('surnameEdit').value
        const editEmail = document.getElementById('emailEdit').value
        const editPassword = document.getElementById('passwordEdit').value

        const listRoleEditUser = await roleArray(document.getElementById('rolesEdit'))


        if (editId && editUserName && editName && editSurname && editEmail) {
            const response = await fetch(`http://localhost:8080/api/admin/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({editId, editUserName, editName, editSurname, editEmail, editPassword, roles: listRoleEditUser})
            });
            const result = await response.json();

            // alertify.confirm("This is a confirm dialog.",
            // function(){
            // alertify.success('Изменения сохранены')
            // },
            // function(){
            // alertify.error('Cancel')
            // })
            $('#editFormCloseButton').click()
            await list()

        }
    })
}