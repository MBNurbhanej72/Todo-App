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

  // Convert curElem to string before capitalizing first character
  let todoText = curElem.toString();

  // Format the date time string to include both date and time in 12-hour format
  let currentDate = new Date(dateTimeString);
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let secondsFormat = seconds <= 9 ? "0" : "";
  let meridiem = hours >= 12 ? " PM" : " AM";
  hours = hours % 12 || 12; // Convert midnight (0) to 12

  let month = currentDate.toLocaleString("default", { month: "long" });
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();

  let formattedDateTime = `${day} ${month} ${year}, ${hours}:${minutes}:${secondsFormat}${seconds}${meridiem}`;

  divElement.innerHTML = `<p>• ${
    todoText.charAt(0).toUpperCase() + todoText.slice(1)
  }</p><p class="date-time">${formattedDateTime}</p><button class="deleteBtn">Delete</button>`;

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
    let dateTimeString = currentDate.toLocaleString();

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
