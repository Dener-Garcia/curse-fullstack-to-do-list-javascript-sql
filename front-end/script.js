const sectionNote = document.querySelector(".notes");
const titleTask = document.querySelector(".titleTask");
const dateTask = document.querySelector(".dateTask");
const selectTask = document.querySelector(".selectTask");
const btnsEditTask = document.querySelector(".btnEditTasks");
const addTaskForm = document.querySelector(".add-form")
const inputTaskForm = document.querySelector(".input-task")
const gridTasks = document.querySelector(".gridTasks")
const filterForm = document.querySelector(".filter-form")
const inputFilterForm = document.querySelector(".filter-form input")
const notesFields = document.querySelectorAll(".notes-fields")
const modalFiltered = document.querySelector(".modal-filtered")

const fetchTasks = async () => {
  const response = await fetch("https://apitodolist.criarbr/tasks");
  const tasks = await response.json();
  return tasks;
};

const formatDate = (dateUTC) => {
  const optionDate = { dateStyle: "short", timeStyle: "short" }
  const date = new Date(dateUTC).toLocaleString("pt-br", optionDate)
  return date
}

const createElement = (tag, content = "") => {
  const element = document.createElement(tag);
  element.innerHTML = content;
  return element;
};

const createSelect = (optionSelected) => {
  const options = ` <option value="Pendente">Pendente</option>
    <option value="Andamcdento">Andamento</option>
    <option value="Concluído">Concluído</option>`;

  const select = createElement("select", options);
  select.inneHtml = options;
  select.value = optionSelected;
  if (select.value == "Pendente") {
    select.classList.add("btnDeleteBG")
  }
  if (select.value == "Concluído") {
    select.classList.add("btnSaveBG")
  }
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
  const editTitleInput = createElement("input")
  editTitleInput.value = title

  const pdate = createElement("p", formatDate(created_at));

  const selectStatus = createSelect(status);
  selectStatus.addEventListener("change", ({ target }) => {
    updateStatusTask({ ...task, status: target.value })
  })

  const noteBtns = document.createElement("div");
  noteBtns.classList.add("notes-button");

  const editTask = createButton("button", '<span class="material-symbols-outlined"> edit_note </span>');
  editTask.classList.add("btnEditBG")

  editTask.addEventListener("click", (e) => {
    btnSaveTask.classList.remove("d-none")
    editTask.classList.add("d-none")

    pTitle.replaceWith(editTitleInput);

    btnSaveTask.addEventListener("click", (e) => {
      updateStatusTask({ ...task, "title": editTitleInput.value })
    }
    )
  })

  const btnSaveTask = createButton("submit", '<span class="material-symbols-outlined"> save_as </span>')
  btnSaveTask.classList.add("btnSaveBG")
  btnSaveTask.classList.add("d-none")

  const deleteTask = createButton(
    "button", '<span class="material-symbols-outlined"> delete </span>');
  deleteTask.classList.add("btnDeleteBG")

  deleteTask.addEventListener("click", () => {
    deleteTasks(id)
  })

  const mblCard = createElement("div")
  mblCard.classList.add("cardTask")


  if (window.innerWidth <= 960) {

    mblCard.appendChild(pTitle)
    mblCard.appendChild(pdate)
    mblCard.appendChild(selectStatus)
    noteBtns.appendChild(btnSaveTask)
    noteBtns.appendChild(editTask);
    noteBtns.appendChild(deleteTask);
    mblCard.appendChild(noteBtns)
    gridTasks.appendChild(mblCard)

  } else {
    titleTask.appendChild(pTitle);
    dateTask.appendChild(pdate);
    selectTask.appendChild(selectStatus);
    noteBtns.appendChild(btnSaveTask)
    noteBtns.appendChild(editTask);
    noteBtns.appendChild(deleteTask);
    btnsEditTask.appendChild(noteBtns);
  }

  return titleTask, dateTask, selectTask, noteBtns, btnsEditTask;
};

const addTask = async (event) => {
  event.preventDefault()

  const myTask = {
    title: inputTaskForm.value
  }

  await fetch("https://apitodolist.criarbr/tasks", {
    method: "post",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(myTask)
  })

  loadTask()
  inputTaskForm.value = ""
  window.location.reload();
}

const deleteTasks = async (id) => {
  await fetch(`https://apitodolist.criarbr/tasks/${id}`, {
    method: "delete"
  })

  loadTask()
  window.location.reload()
}

const updateStatusTask = async (task) => {
  const { id, title, status } = task
  await fetch(`https://apitodolist.criarbr/tasks/${id}`, {
    method: "put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title, status })
  })
  window.location.reload();
}

const loadTask = async () => {
  const tasks = await fetchTasks();
  tasks.forEach((task) => {
    const myTasks = assemblyTask(task);
    sectionNote.appendChild(myTasks);
  });
};

addTaskForm.addEventListener("submit", addTask)

assemblyFilteredTasks = (task) => {
  const { id, title, created_at, status } = task;

  console.log("recebi na assembly filter", id)

  const pTitle = createElement("p", title);
  const editTitleInput = createElement("input")
  editTitleInput.value = title

  const pdate = createElement("p", formatDate(created_at));

  const selectStatus = createSelect(status);
  selectStatus.addEventListener("change", ({ target }) => {
    updateStatusTask({ ...task, status: target.value })
  })

  const noteBtns = document.createElement("div");
  noteBtns.classList.add("notes-button");

  const editTask = createButton("button", '<span class="material-symbols-outlined"> edit_note </span>');
  editTask.classList.add("btnEditBG")

  editTask.addEventListener("click", (e) => {
    btnSaveTask.classList.remove("d-none")
    editTask.classList.add("d-none")

    pTitle.replaceWith(editTitleInput);

    btnSaveTask.addEventListener("click", (e) => {
      updateStatusTask({ ...task, "title": editTitleInput.value })
    }
    )

return pTitle, editTask, noteBtns
  })

  const btnSaveTask = createButton("submit", '<span class="material-symbols-outlined"> save_as </span>')
  btnSaveTask.classList.add("btnSaveBG")
  btnSaveTask.classList.add("d-none")

  const deleteTask = createButton(
    "button", '<span class="material-symbols-outlined"> delete </span>');
  deleteTask.classList.add("btnDeleteBG")

  deleteTask.addEventListener("click", () => {
    deleteTasks(id)
  })

  const mblCard = createElement("div")
  mblCard.classList.add("cardTask")

  const filterContent = createElement("div")
  filterContent.classList.add("filter-content")

    mblCard.appendChild(pTitle)
    mblCard.appendChild(pdate)
    mblCard.appendChild(selectStatus)
    noteBtns.appendChild(btnSaveTask)
    noteBtns.appendChild(editTask);
    noteBtns.appendChild(deleteTask);
    mblCard.appendChild(noteBtns)


    filterContent.appendChild(mblCard)

    console.log(filterContent, "montar div")
    
    modalFiltered.appendChild(filterContent)
    modalFiltered.classList.add("modal-active")
    
    return filterContent
}

const filterTask = async (event) => {
  event.preventDefault()
  const tasks = await fetchTasks()
  const search = inputFilterForm.value
  const tasksFiltered = tasks.filter((qualquer) => qualquer.title.includes(search))

  if (!search == "") {
    tasksFiltered.forEach((result) => {
      console.log(tasksFiltered, "resultado filtro")
      const resultFiltered = assemblyFilteredTasks(result)
      console.log(resultFiltered, "passou pela montagem")
      

    })
  }
}

filterForm.addEventListener("submit", filterTask)

loadTask();

