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
  const inputCheck = document.createElement("input");
  const inputLabel = document.createElement("label");
  newLi.innerText = domInput.value;
  todo_list.push({ value: domInput.value, done: false });
  // 로컬 스토리지 추가
  localStorage.setItem("todo", JSON.stringify(todo_list));
  newDiv.classList.add("todo-list");
  inputCheck.setAttribute("type", "checkbox");
  inputLabel.appendChild(inputCheck);
  removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  removeBtn.classList.add("removeBtn");
  newDiv.appendChild(inputLabel);
  newDiv.appendChild(newLi);
  newDiv.appendChild(removeBtn);
  domul.appendChild(newDiv);
  domInput.value = "";
  // domul.scrollTop = 전체 - 페이지 y값;
  domul.scrollTop = domul.scrollHeight - domul.clientHeight;
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
    // 로컬 스토리지에서 삭제
    removeLocalStorage(parentElement.innerText);
    parentElement.classList.add("removing");
    parentElement.addEventListener("transitionend", () => {
      parentElement.remove();
    });
  }
  if (e.target.tagName === "LABEL") {
    const label = e.target;
    const textNode = e.target.parentElement.childNodes[1];
    const index = todo_list.findIndex(
      (item) => item.value === textNode.innerText
    );
    console.log(todo_list);
    label.classList.toggle("c");
    if (label.classList.contains("c")) {
      textNode.style.textDecoration = "line-through";
      todo_list[index].done = true;
    } else {
      textNode.style.textDecoration = "none";
      todo_list[index].done = false;
    }
    localStorage.setItem("todo", JSON.stringify(todo_list));
  }
}

// local storage 아이템 불러오기

function loadList() {
  if (localStorage.getItem("todo") === null) {
    todo_list = [];
  } else {
    todo_list = JSON.parse(localStorage.getItem("todo"));
    todo_list.forEach((item) => {
      const newDiv = document.createElement("div");
      const newLi = document.createElement("li");
      const removeBtn = document.createElement("button");
      const inputCheck = document.createElement("input");
      const inputLabel = document.createElement("label");
      if (item.done) {
        inputLabel.classList.add("c");
        newLi.style.textDecoration = "line-through";
      }
      newLi.innerText = item.value;
      newDiv.classList.add("todo-list");
      inputCheck.setAttribute("type", "checkbox");
      inputLabel.appendChild(inputCheck);
      removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
      removeBtn.classList.add("removeBtn");
      newDiv.appendChild(inputLabel);
      newDiv.appendChild(newLi);
      newDiv.appendChild(removeBtn);
      domul.appendChild(newDiv);
    });
  }
}

// Local Storage 아이템 삭제하기

function removeLocalStorage(item) {
  const index = todo_list.findIndex((todo) => todo.value === item);
  todo_list.splice(index, 1);
  // 삭제 후 로컬 스토리지 재설정
  localStorage.setItem("todo", JSON.stringify(todo_list));
}

// localStorage.clear();
