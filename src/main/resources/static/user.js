$(async function () {
    await getAuthUser();
});
async function getAuthUser() {

    const roleUser = (elements) => {
        elements.forEach(element => {

            const rolesName = element.roles.map(role => role.role.replace('ROLE_', ' ')).join(', ')
        })}

    fetch("http://localhost:8080/api/user/user")
        .then(response => response.json())
        .then(data => {
            let user = `$(
            <tr class="fs-5">
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.surname}</td>
                <td>${data.username}</td>
                <td>${data.email}</td>
                <td>${data.rolesName}</td>)`;
            $('#userTableUserView').append(user);
        })
        .catch(error => console.log(error))
}
