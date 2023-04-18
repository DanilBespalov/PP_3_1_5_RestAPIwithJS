async function showAllRole() {
    let dbRoles = [];
    let roles = await fetch("http://localhost:8080/api/admin/delete/${id}")
    await roles.json().then(roles => {
        roles.forEach(role =>
            dbRoles.push(role))
    });
    return dbRoles;
}


async function deleteUserData(id) {
    let href = `http://localhost:8080/api/admin/delete/${id}`
    let dbRoles = await showAllRole()

    $.get(href, function (user) {
        $('.deleteForm #id').val(user.id);
        $('.deleteForm #name').val(user.name);
        $('.deleteForm #surname').val(user.surname);
        $('.deleteForm #username').val(user.username);
        $('.deleteForm #email').val(user.email);
        $('.deleteForm #password').val("");

        // const inputRoles = document.getElementById('dRoles')
        // inputRoles.innerHTML = `
        // <option value="${dbRoles[0].id}" name="ROLE_USER" >${dbRoles[0].shortName}</option>
        // <option value="${dbRoles[1].id}" name="ROLE_ADMIN" >${dbRoles[1].shortName}</option>
        // `
    })


    document.getElementById('btnDelete').addEventListener('click', async () => {
        await fetch(`http://localhost:8080/api/admin/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        });        
        alertify.confirm("This is a confirm dialog.",
        function(){
        alertify.success('Пользователь удален')
        },
        function(){
        alertify.error('Cancel')
        });    
        
        $('#btnDelete').click()
        await list()
    })
}


