const domul = document.getElementById("domul");
const addBtn = document.getElementById("addBtn");
const domInput = document.getElementById("domInput");
const removeBtn = document.getElementsByClassName("removeBtn");
const forEachDiv = document.getElementById("forEach");

let todo_list = [];

//  이벤트 리스너

addBtn.addEventListener("click", addList);
domul.addEventListener("click", removeList);
domInput.addEventListener("keypress", addListWithKeypress);
window.addEventListener("DOMContentLoaded", loadList);

// function

// 추가하기

function addList() {
  const newDiv = document.createElement("div");
  const newLi = document.createElement("li");
  const removeBtn = document.createElement("button");
  newLi.innerText = domInput.value;
  todo_list.push(domInput.value);
  localStorage.setItem("todo", JSON.stringify(todo_list));
  newDiv.classList.add("todo-list");
  removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  removeBtn.classList.add("removeBtn");
  newDiv.appendChild(newLi);
  newDiv.appendChild(removeBtn);
  domul.appendChild(newDiv);
  domInput.value = "";
}

// 엔터 키 누르면 추가하기

function addListWithKeypress(e) {
  if (!domInput.value) {
    return;
  } else {
    if (e.code === "Enter") {
      addList();
    }
  }
}

// 삭제하기

function removeList(e) {
  if (e.target.classList.contains("removeBtn")) {
    const parentElement = e.target.parentElement;
    removeLocalStorage(parentElement.innerText);
    parentElement.classList.add("removing");
    parentElement.addEventListener("transitionend", () => {
      parentElement.remove();
    });
  }
}

// local storage 아이템 불러오기

function loadList() {
  if (localStorage.getItem("todo") === null) {
    todo_list = [];
  } else {
    todo_list = JSON.parse(localStorage.getItem("todo"));
    todo_list.forEach((item) => {
      console.log(todo_list);
      // console.log(item);
      const newDiv = document.createElement("div");
      const newLi = document.createElement("li");
      const removeBtn = document.createElement("button");
      newLi.innerText = item;
      newDiv.classList.add("todo-list");
      removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
      removeBtn.classList.add("removeBtn");
      newDiv.appendChild(newLi);
      newDiv.appendChild(removeBtn);
      domul.appendChild(newDiv);
    });
  }
}

// Local Storage 아이템 삭제하기

function removeLocalStorage(item) {
  const index = todo_list.indexOf(item);
  todo_list.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todo_list));
  console.log(localStorage.getItem("todo"));
}
