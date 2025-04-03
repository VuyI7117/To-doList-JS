const addTasks = document.querySelector(".add-tasks");
const list = document.querySelector(".tasks");
let tasks = JSON.parse(localStorage.getItem("tasks"))  || [];

function addTasks(event) {
    event.preventDefault();
    const text = this.querySelector("[name=task]").value;

    const newTask = {
        text,
        done: false,
    };

    tasks.push(newTask);
    populateList(tasks, list);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//populate list function//

function populateList(tasks = [], list) {
    list.innerHTML = tasks
    .map((task, i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="task${i}"
            ${task.done ? "checked" : ""}/>
            <label for="task${i}">${task.text}</label>
        </li>
        `;
    })
    .join("");
}

//toggle done function//

function toggleDone(e) {
    if (!e.target.matches("input")) return;
    const element = e.target;
    const index = element.dataset.index;
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    populateList(tasks, list);
}

//event listerner displays existing tasks//

addTasks.addEventListener("submit", addTasks);
list.addEventListener("click", toggleDone);
populateList(tasks, list);
