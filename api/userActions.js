export async function getUsers() {
  return await fetch("http://localhost:3000/user/getall", { method: "POST" })
    .then((result) => result.json())
    .then((data) => {
      if (data.status === "SUCCESS") return data.users;
      else return [];
    });
}

export async function saveUser(name) {
  postData("http://localhost:3000/user/save", { name: name }).then((data) => {
    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = "token=" + data.user.token + ";" + expires + ";path=/";
    const hiUser = document.getElementById("navbarDropdown");
    hiUser.text = "Hi, " + data.user.name + "!";
  });
}

export async function checkLogin() {
  return await postData("http://localhost:3000/user/get", {}).then((result) => {
    if (result.status === "SUCCESS") return result.user;
    else return undefined;
  });
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}
