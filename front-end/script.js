const sectionNote = document.querySelector(".notes");
const titleTask = document.querySelector(".titleTask");
const dateTask = document.querySelector(".dateTask");
const selectTask = document.querySelector(".selectTask");
const btnsEditTask = document.querySelector(".btnEditTasks");
const addTaskForm = document.querySelector(".add-form")
const inputTaskForm = document.querySelector(".input-task")

const fetchTasks = async () => {
  const response = await fetch("http://localhost:3003/tasks");
  const tasks = await response.json();
  return tasks;
};

const createElement = (tag, content = "") => {
  const element = document.createElement(tag);
  element.innerHTML = content;
  return element;
};

const createSelect = (optionSelected) => {
  const options = ` <option value="Pendente">Pendente</option>
    <option value="Andamento">Andamento</option>
    <option value="Concluído">Concluído</option>`;

  const select = createElement("select", options);
  select.inneHtml = options;
  select.value = optionSelected;
  return select;
};

const createButton = (type, inneHtml) => {
  const mybtn = document.createElement("button");
  mybtn.type = type;
  mybtn.innerHTML = inneHtml;
  return mybtn;
};

const assemblyTask = (task) => {
  const { id, title, created_at, status } = task;

  const pTitle = createElement("p", title);
  const pdate = createElement("p", created_at);

  const selectStatus = createSelect(status);

  const noteBtns = document.createElement("div");
  noteBtns.classList.add("notes-button");
  const editTask = createButton(
    "button",
    '<span class="material-symbols-outlined"> edit_note </span>'
  );
  const deleteTask = createButton(
    "button",
    '<span class="material-symbols-outlined"> delete </span>'
  );

  titleTask.appendChild(pTitle);
  dateTask.appendChild(pdate);
  selectTask.appendChild(selectStatus);
  noteBtns.appendChild(editTask);
  noteBtns.appendChild(deleteTask);
  btnsEditTask.appendChild(noteBtns);

  return titleTask, dateTask, selectTask, noteBtns, btnsEditTask;
};

const addTask = async (event) => {
    event.preventDefault()

    const myTask = {
        title: inputTaskForm.value
    }
    
    await fetch("http://localhost:3003/tasks", {
        method: "post",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(myTask)
    })

    loadTask()
    inputTaskForm.value = ""
}



const loadTask = async () => {
  const tasks = await fetchTasks();
  
 sectionNote.innerHTML = ""

  tasks.forEach((task) => {
    const myTasks = assemblyTask(task);
    sectionNote.appendChild(myTasks);
  });
};

addTaskForm.addEventListener("submit", addTask)

loadTask();

console.log(sectionNote)
