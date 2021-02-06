# Local Storage를 이용한 Todd-list w vanila javascript(바닐라 자바스크립트)

## Local Storage:question::grey_question:

    브라우저 내에 key-value 값을 저장. 브라우저 재 실행해도 데이터가 사라지지 않음.

## 코드 설명

```javascript
function addList() {
  const newDiv = document.createElement("div");
  const newLi = document.createElement("li");
  const removeBtn = document.createElement("button");
  newLi.innerText = domInput.value;

  // todo_list 변수를 global 변수로 선언 후 빈 배열을 할당한다.
  // input 태그의 value를 todo_list 배열에 push 한다.

  todo_list.push(domInput.value);

  //localStorage에 setItem 메소드를 사용해 key가 todo인 곳에 value를 JSON 형태로 todo-list를 set 한다.

  localStorage.setItem("todo", JSON.stringify(todo_list));
  newDiv.classList.add("todo-list");
  removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  removeBtn.classList.add("removeBtn");
  newDiv.appendChild(newLi);
  newDiv.appendChild(removeBtn);
  domul.appendChild(newDiv);
  domInput.value = "";
}
```

```javascript
function removeList(e) {
  if (e.target.classList.contains("removeBtn")) {
    const parentElement = e.target.parentElement;

    // local storage도 같이 삭제
    removeLocalStorage(parentElement.innerText);
    parentElement.classList.add("removing");

    // transition - css 효과 끝나면 비동기적으로 부모 요소 삭제
    parentElement.addEventListener("transitionend", () => {
      parentElement.remove();
    });
  }
}
```

```javascript
// DOM 로드 된 후 실행될 함수
function loadList() {
  // localStorage에 키 'todo'에 value가 없다면 글로벌 변수인 todo_list를 빈 배열로 초기화.
  // 'todo'에 value가 있다면 localStorage를 JSON 형태로 parsing 한 후 todo_list에 할당.
  // todo_list 배열에 forEach 로 DOM 생성.
  if (localStorage.getItem("todo") === null) {
    todo_list = [];
  } else {
    todo_list = JSON.parse(localStorage.getItem("todo"));
    todo_list.forEach((item) => {
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
```

```javascript
// 삭제할 item을 입력 받아 todo_list에서 몇 번째에 있는지(index) 그 후 splice로 배열에서 삭제한다.
// item이 삭제되어진 배열을 다시 localStorage set한다.
function removeLocalStorage(item) {
  const index = todo_list.indexOf(item);
  todo_list.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todo_list));
}
```
