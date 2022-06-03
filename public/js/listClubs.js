import { checkLogin } from "../api/userActions.js";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

checkLogin().then((user) => {
  if (user) {
    const table = document.getElementById("table-list");
    let array = [];
    if (window.location.pathname === "/blacklisted_clubs")
      array = user.blacklistedClubs.split(",").filter((name) => name !== "")
    if (window.location.pathname === "/favorite_leagues")
      array = user.favoriteLeagues.split(",").filter((name) => name !== "")
    if (window.location.pathname === "/favorite_clubs")
      array = user.favoriteClubs.split(",").filter((name) => name !== "")
    array = array.filter(onlyUnique);
    for (let id = 0; id < array.length; id++) {
      const name = array[id]
      const tr = document.createElement("tr");
      const tName = document.createElement("td");
      tName.textContent = name;
      const tRemove = document.createElement("td");
      const tRemoveBtn = document.createElement("button");
      tRemoveBtn.classList.add("btn")
      const tRemoveIcon = document.createElement("i");
      tRemoveIcon.classList.add("fa");
      tRemoveIcon.classList.add("fa-close");
      tRemoveBtn.appendChild(tRemoveIcon);
      tRemove.appendChild(tRemoveBtn);
      tr.appendChild(tName);
      tr.appendChild(tRemove);
      table.appendChild(tr);
    }
  }
});
