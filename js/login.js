import { checkLogin } from "../api/userActions.js";

checkLogin().then((isLoggedIn) => {
    const loginModal = document.createElement("div");
})