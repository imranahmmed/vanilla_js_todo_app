const taskInput = document.querySelector(".taskInput input");
const taskBox = document.querySelector(".taskBox");

let editId;
let isEditedTask = false;

// getting todos from local storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodos() {
    let li = "";
    if (todos) {
        todos.map((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}"> ${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                                <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
        });
    };
    taskBox.innerHTML = li;
};

showTodos()
function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", function (e) {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    })
}
function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodos()
}

function editTask(editTaskId, editTaskName) {
    editId = editTaskId;
    isEditedTask = true;
    taskInput.value = editTaskName
}

function updateStatus(selectedTask) {
    // console.log(selectedTask);
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
        console.log(todos[selectedTask.id])
    } else {
        taskName.classList.remove("checked")
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEditedTask) {
            if (!todos) {
                todos = [];
            }
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        localStorage.setItem("todo-list", JSON.stringify(todos));
        taskInput.value = "";
    }
    showTodos()
});