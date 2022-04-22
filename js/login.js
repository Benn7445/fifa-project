import { checkLogin, saveUser } from "../api/userActions.js";

checkLogin().then((user) => {
  if (!user) {
    const loginBackground = document.createElement("div");
    loginBackground.style.cssText =
      "display: flex; position: absolute; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); top: 0;";
    const loginModal = document.createElement("div");
    loginModal.style.cssText =
      "display: flex; flex-direction: column; gap: 20px; margin: auto; background: #fff; padding: 50px; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;";
    const text = document.createElement("p");
    text.style.cssText = "text-align: center; font-weight: 700; margin: 0px;";
    const userNameInput = document.createElement("input");
    userNameInput.classList.add("name-inp");
    const continueButton = document.createElement("button");
    continueButton.classList.add("con-btn");
    text.textContent = "Fill in your username";
    userNameInput.ariaPlaceholder = "Username";
    continueButton.textContent = "Continue";

    continueButton.onclick = function () {
      if (userNameInput.value.length > 0) {
        saveUser(userNameInput.value);
        loginBackground.style.cssText = "display: none;";
      }
    };
    loginModal.appendChild(text);
    loginModal.appendChild(userNameInput);
    loginModal.appendChild(continueButton);
    loginBackground.appendChild(loginModal);
    document.getElementsByTagName("body")[0].appendChild(loginBackground);
  } else {
      const hiUser = document.getElementById("navbarDropdown");
      hiUser.text = "Hi, " + user.name + "!";
  }
});
