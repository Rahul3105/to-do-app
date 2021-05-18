// taking refrences and adding addEventListeners
let addBtn = document.getElementById("addBtn");
let listContainer = document.getElementById("listContainer");
let allLists = document.getElementsByClassName("lists");
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
    if (
      listContainer.children.length != 0 &&
      listContainer.children[0].id == "temp"
    ) {
      listContainer.removeChild(document.getElementById("temp"));
    }
    let newList = document.createElement("div");
    newList.classList = "lists";
    uniqueNumForLists++;
    newList.id = `${uniqueNumForLists}`;
    newList.onclick = listWorkDone.bind(newList, uniqueNumForLists);
    newList.innerHTML = `<i class="fas fa-check"></i>
    <p>${inputBox.value}</p>
    <i class="fas fa-times" onclick='deleteList(${uniqueNumForLists})'></i>`;
    listContainer.append(newList);
    inputBox.value = "";
    allLists = document.getElementsByClassName("lists");
  }
}
// adding list logic ends here

/// list work done logic starts here

function listWorkDone(argu) {
  let list = document.getElementById(argu);
  if (list.classList.contains("workDone")) {
    list.classList.remove("workDone");
  } else {
    list.classList.add("workDone");
  }
}
//list work done logic ends here

///deleleting tha lists
function deleteList(argu) {
  listContainer.removeChild(document.getElementById(argu));
}
