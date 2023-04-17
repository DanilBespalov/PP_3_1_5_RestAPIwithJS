$(async function () {
    await userInfo();
});

async function userInfo() {
    let url = 'http://localhost:8080/api/admin/user'
    let response = await fetch(url);
    let {id, name, surname, username, email, roles} = await response.json()

    const aEmail = document.getElementById("emailId")
    aEmail.textContent = email

    const aRoles = document.getElementById("roles")
    let textRoles = ""
    roles.forEach(role => {
        let roleShortName = role.name.substring(5) + " "
        textRoles += roleShortName
    })
    aRoles.textContent = `${textRoles}`

    const userTableBody = document.getElementById("userTableBody")
    const tableBody = `
    <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${surname}</td>
                <td>${username}</td>
                <td>${email}</td>
                <td>${textRoles}</td>            
    </tr>
    `
    userTableBody.innerHTML = tableBody

}