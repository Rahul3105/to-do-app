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
    newList.innerHTML = `<div class="markCompletedCont" onclick = 'listWorkDone(${ind})'>
                    <i class="fas fa-check"></i>
                    <p>${elem}</p>
                </div>
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
  let contentArea = list.children[0];
  let pElem = contentArea.children[1];

  contentArea.classList.toggle("workDone");
  contentArea.children[0].classList.toggle("checkDisplayVisible");
  pElem.classList.toggle("line-through");
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

// inputBox word limit logic
let inputBox = document.getElementById("toDoInput");
inputBox.addEventListener("keypress", () => {
  let warning = document.getElementsByClassName("maxLimitExceeded")[0];
  if (inputBox.value.length > 80) {
    warning.style.visibility = "visible";
  } else {
    warning.style.visibility = "hidden";
  }
});
