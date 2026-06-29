// =========================
// ELEMENTS
// =========================

const taskTitle = document.getElementById("taskTitle");
const category = document.getElementById("category");
const dueDate = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTask");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const todayTasks = document.getElementById("todayTasks");

const categoryFilter = document.getElementById("categoryFilter");
const filterButtons = document.querySelectorAll(".filter-btn");

// =========================
// LOCAL STORAGE
// =========================

let tasks = JSON.parse(localStorage.getItem("plannerTasks")) || [];

let currentFilter = "all";

// =========================
// SAVE TASKS
// =========================

function saveTasks(){

    localStorage.setItem(
        "plannerTasks",
        JSON.stringify(tasks)
    );

}

// =========================
// UPDATE STATISTICS
// =========================

function updateStats(){

    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;

    pendingTasks.textContent =
        tasks.filter(task => !task.completed).length;

    const today = new Date().toISOString().split("T")[0];

    todayTasks.textContent =
        tasks.filter(task => task.date === today).length;

}

// =========================
// RENDER TASKS
// =========================

function renderTasks(){

    taskList.innerHTML = "";

    let filtered = [...tasks];

    // Status filter

    if(currentFilter === "completed"){

        filtered = filtered.filter(task => task.completed);

    }

    if(currentFilter === "pending"){

        filtered = filtered.filter(task => !task.completed);

    }

    // Category filter

    if(categoryFilter.value !== "all"){

        filtered = filtered.filter(task =>
            task.category === categoryFilter.value
        );

    }

    filtered.forEach(task=>{

        const div = document.createElement("div");

        div.className = `task ${task.completed ? "completed" : ""}`;

        div.innerHTML = `

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}>

            <div class="task-title">

                ${task.title}

            </div>

            <span class="badge ${task.category.toLowerCase()}">

                ${task.category}

            </span>

            <div>

                ${task.date}

            </div>

            <div class="actions">

                <i class="fas fa-pen"></i>

                <i class="fas fa-trash"></i>

            </div>

        `;

        // Complete

        div.querySelector("input").onclick = ()=>{

            task.completed = !task.completed;

            saveTasks();

            updateStats();

            renderTasks();

        };

        // Delete

        div.querySelector(".fa-trash").onclick = ()=>{

            if(confirm("Delete this task?")){

                tasks = tasks.filter(t => t.id !== task.id);

                saveTasks();

                updateStats();

                renderTasks();

            }

        };

        // Edit

        div.querySelector(".fa-pen").onclick = ()=>{

            const newTitle =
                prompt("Edit task:", task.title);

            if(newTitle){

                task.title = newTitle;

                saveTasks();

                renderTasks();

            }

        };

        taskList.appendChild(div);

    });

    updateStats();

}

// =========================
// ADD TASK
// =========================

addTaskBtn.addEventListener("click", ()=>{

    if(

        taskTitle.value.trim() === "" ||

        category.value === "" ||

        dueDate.value === ""

    ){

        alert("Please complete all fields.");

        return;

    }

    tasks.push({

        id: Date.now(),

        title: taskTitle.value,

        category: category.value,

        date: dueDate.value,

        completed: false

    });

    saveTasks();

    renderTasks();

    taskTitle.value = "";

    category.value = "";

    dueDate.value = "";

});

// =========================
// FILTER BUTTONS
// =========================

filterButtons.forEach(button=>{

    button.addEventListener("click", ()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});

// =========================
// CATEGORY FILTER
// =========================

categoryFilter.addEventListener("change", ()=>{

    renderTasks();

});

// =========================
// ENTER KEY
// =========================

taskTitle.addEventListener("keypress", e=>{

    if(e.key === "Enter"){

        addTaskBtn.click();

    }

});

// =========================
// INITIAL LOAD
// =========================

renderTasks();