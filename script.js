let inputValue = document.getElementById("inputValue");
let mainTodo = document.querySelector(".todo-list-elem");
let btn = document.getElementById("btn");

btn.addEventListener("click", (e) => {
  addTodoList(e);
});

let getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("todoData"));
};

let addTodoListLocalStorage = (localTodoList) => {
  return localStorage.setItem("todoData", JSON.stringify(localTodoList));
};

let localTodoList = getTodoListFromLocal() || [];

let addTodoDynamicElement = (curElem, dateTimeString) => {
  let divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");

  let currentDate = new Date(dateTimeString);
  let formattedDateTime = currentDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  divElement.innerHTML = `<p> ${curElem}</p><p class="date-time">${formattedDateTime}</p><button class="deleteBtn">Delete</button>`;

  mainTodo.append(divElement);
};

let addTodoList = (e) => {
  e.preventDefault();
  const todoListValue = inputValue.value.trim().toLowerCase();

  if (
    todoListValue !== "" &&
    !localTodoList.some((item) => item.text === todoListValue)
  ) {
    let currentDate = new Date();
    let dateTimeString = currentDate.toISOString(); // Save datetime in ISO format

    localTodoList.push({ text: todoListValue, dateTime: dateTimeString });
    localStorage.setItem("todoData", JSON.stringify(localTodoList));
    console.log(localTodoList);
    addTodoDynamicElement(
      todoListValue.charAt(0).toUpperCase() + todoListValue.slice(1),
      dateTimeString
    );
  }
  inputValue.value = "";
};

let showTodoList = () => {
  console.log(localTodoList);

  localTodoList.forEach((curElem) => {
    addTodoDynamicElement(
      curElem.text.charAt(0).toUpperCase() + curElem.text.slice(1),
      curElem.dateTime
    );
  });
};
showTodoList();

let removeTodo = (e) => {
  let todoRemove = e.target;
  let parentElem = todoRemove.parentElement;
  let todoListContent = parentElem.querySelector("p").innerText;

  localTodoList = localTodoList.filter((curTodo) => {
    return curTodo.text !== todoListContent.toLowerCase();
  });

  addTodoListLocalStorage(localTodoList);
  parentElem.remove();
};

mainTodo.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deleteBtn")) {
    const confirmed = confirm("Do you want to delete this data?");
    if (confirmed) {
      removeTodo(e);
    }
  }
});
