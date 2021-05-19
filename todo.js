// taking refrences and adding addEventListeners
let addBtn = document.getElementById("addBtn");
let listContainer = document.getElementById("listContainer");

addBtn.addEventListener("click", addLocalStorage());
document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    addLocalStorage();
  }
});

addList();

// adding lists logic starts form here
function addLocalStorage() {
  let inputBox = document.getElementById("toDoInput");
  if (inputBox.value != "") {
    let localStorageLists = localStorage.getItem("lists");
    localStorageLists == null
      ? (listsObj = [])
      : (listsObj = JSON.parse(localStorageLists));
    listsObj.push(inputBox.value);
    localStorage.setItem("lists", JSON.stringify(listsObj));
    inputBox.value = "";
    addList();
  }
}
function addList() {
  // here i wrote logic for the text --> "you have not added anything yet"
  if (
    listContainer.children.length != 0 &&
    listContainer.children[0].id == "temp"
  ) {
    listContainer.removeChild(document.getElementById("temp"));
  }
  let localStorageLists = localStorage.getItem("lists");
  localStorageLists == null
    ? (listsObj = [])
    : (listsObj = JSON.parse(localStorageLists));
  listContainer.innerHTML = "";
  listsObj.forEach((elem, ind) => {
    let newList = document.createElement("div");
    newList.classList = "lists";
    newList.id = `${ind}`;
    newList.onclick = listWorkDone.bind(newList, ind);
    newList.innerHTML = `<i class="fas fa-check"></i>
    <p>${elem}</p>
    <i class="fas fa-times" onclick='deleteList(${ind})'></i>`;
    listContainer.append(newList);
  });
  if (listsObj.length == 0) {
    listContainer.innerHTML = `<div class="lists" id="temp">
                <p>There is nothing to show <i class="fas fa-frown"></i></p>
            </div>`;
  }
}
/// list work done logic starts here

function listWorkDone(argu) {
  let list = document.getElementById(argu);
  if (list.classList.contains("workDone")) {
    list.classList.remove("workDone");
    list.children[0].classList.remove("checkDisplayVisible");
  } else {
    list.classList.add("workDone");
    list.children[0].classList.add("checkDisplayVisible");
  }
}
//list work done logic ends here

///deleting the lists
function deleteList(argu) {
  let localStorageLists = localStorage.getItem("lists");
  listsObj = JSON.parse(localStorageLists);
  listsObj.splice(argu, 1);
  localStorage.setItem("lists", JSON.stringify(listsObj));
  addList();
}
