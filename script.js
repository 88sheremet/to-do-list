const refs = {
  addMessage: document.querySelector(".message"),
  addButton: document.querySelector(".add"),
  todo: document.querySelector(".todo"),
  info: document.querySelector(".info"),
  infoContainer: document.querySelector(".info__container"),
  hidden: document.querySelector(".hidden"),
};

refs.info.addEventListener("click", () => {
  refs.infoContainer.style.display = "flex";
  refs.hidden.style.display = "block";
  refs.info.style.display = "none";
});

refs.hidden.addEventListener("click", () => {
  refs.infoContainer.style.display = "none";
  refs.info.style.display = "block";
  refs.hidden.style.display = "none";
});

let todoList = [];

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  displayMessages();
}

refs.addButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (!refs.addMessage.value) {
    return;
  }

  const newTodo = {
    todo: refs.addMessage.value,
    checked: false,
    important: false,
  };

  todoList.push(newTodo);

  displayMessages();

  localStorage.setItem("todo", JSON.stringify(todoList));

  refs.addMessage.value = "";
});

function displayMessages() {
  let displayMessage = "";

  if (todoList.length === 0) {
    refs.todo.innerHTML = "";
  }

  todoList.forEach((item, index) => {
    displayMessage += `
<li>
    <input type="checkbox" id="item_${index}" ${item.checked ? "checked" : ""}>
    <label for="item_${index}" class="${item.important ? "important" : ""}">${
      item.todo
    }</label>
</li>
`;

    refs.todo.innerHTML = displayMessage;
  });
}

refs.todo.addEventListener("change", (e) => {
  let idInput = e.target.getAttribute("id");
  let forLabel = refs.todo.querySelector("[for=" + idInput + "]");
  let valueLbel = forLabel.innerHTML;

  todoList.forEach((item) => {
    if (item.todo === valueLbel) {
      item.checked = !item.checked;
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});

refs.todo.addEventListener("contextmenu", (e, i) => {
  e.preventDefault();
  todoList.forEach((item) => {
    if (item.todo === e.target.innerHTML) {
      if (e.ctrlKey || e.metaKey) {
        todoList.splice(i, 1);
      } else {
        item.important = !item.important;
      }

      displayMessages();
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});
