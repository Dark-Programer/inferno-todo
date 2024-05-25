const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");
const completedList = document.querySelector("#completed-list");

function addTask() {
  if (inputBox.value === "") {
    alert("Assign a task ⚠️ ");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // cross icon
    li.appendChild(span);
  }
  inputBox.value = "";
  useBrowserLocalStorage();
}

// Event listener for clicking on tasks and "x" icon in to-do list
listContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    // Move completed task to completed list
    if (e.target.classList.contains("checked")) {
      completedList.appendChild(e.target);
    } else {
      listContainer.appendChild(e.target);
    }
    useBrowserLocalStorage();
  } else if (e.target.tagName === "SPAN") {
    // Only remove the parent element (list item) if it's not checked
    if (!e.target.parentElement.classList.contains("checked")) {
      e.target.parentElement.remove();
    }
    useBrowserLocalStorage();
  }
});

// Event listener for clicking "x" icon in completed list
completedList.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    useBrowserLocalStorage();
  }
});

// Store the data in the browser local storage
let useBrowserLocalStorage = () => {
  // Store data for both lists (separated by a delimiter)
  localStorage.setItem(
    "data",
    `${listContainer.innerHTML}|||${completedList.innerHTML}`
  );
};

// Now Show the stored data
let displayTask = () => {
  const storedData = localStorage.getItem("data");
  // Check if data exists
  if (storedData) {
    const [todoList, completedListHtml] = storedData.split("|||");
    listContainer.innerHTML = todoList;
    completedList.innerHTML = completedListHtml;
  }
};
displayTask();
