// taking refrences and adding addEventListeners
let addBtn = document.getElementById("addBtn");
let listContainer = document.getElementById("listContainer");

let uniqueNumForLists = 0;
addBtn.addEventListener("click", addList);
document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    addList();
  }
});
// adding lists logic starts form here

function addList() {
  let inputBox = document.getElementById("toDoInput");
  if (inputBox.value != "") {
    // here i wrote logic for the text --> "you have not added anything yet"
    if (
      listContainer.children.length != 0 &&
      listContainer.children[0].id == "temp"
    ) {
      listContainer.removeChild(document.getElementById("temp"));
    }
    // to add local storage i call this function
    let listsObj = addLocalStorage(inputBox.value);
    // here i am creating new list and added that input value to that

    let newList = document.createElement("div");
    newList.classList = "lists";
    newList.id = `${uniqueNumForLists}`;
    newList.onclick = listWorkDone.bind(newList, uniqueNumForLists);
    newList.innerHTML = `<i class="fas fa-check"></i>
    <p>${inputBox.value}</p>
    <i class="fas fa-times" onclick='deleteList(${uniqueNumForLists})'></i>`;
    listContainer.append(newList);
    inputBox.value = "";
    uniqueNumForLists++;
  }
}
// adding list logic ends here

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
  listContainer.removeChild(document.getElementById(argu));
}

///storing lists in local storage logic starts form here

function addLocalStorage(inputVal) {
  let localStorageLists = localStorage.getItem("lists");
  if (localStorageLists == null) {
    listsObj = [];
  } else {
    listsObj = JSON.parse(localStorageLists);
  }
  // console.log(listsObj);
  // console.log(inputVal);
  listsObj.push(inputVal);
  localStorage.setItem("lists", JSON.stringify(listsObj));
  return listsObj;
}
