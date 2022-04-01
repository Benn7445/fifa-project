export async function getUsers() {
    return await fetch("http://localhost:3000/user/getall", { method: 'POST' }).then((result) => result.json())
        .then(data => {
            if (data.status === "SUCCESS") return data.users;
            else return [];
        });
}

export async function checkLogin() {
    return await fetch("http://localhost:3000/user/get", {
        method: 'POST', headers: {
            Authorization: getCookie("token"),
        }
    }).then((result) => result.json())
        .then(data => {
            if (data.status === "SUCCESS") return true;
            else return false;
        });
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}