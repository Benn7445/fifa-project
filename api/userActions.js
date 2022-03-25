export async function getUsers() {
    return await fetch("http://localhost:3000/user/getall", { method: 'POST' }).then((result) => result.json())
        .then(data => {
            if(data.status === "SUCCESS") return data.users;
            else return [];
        });
}