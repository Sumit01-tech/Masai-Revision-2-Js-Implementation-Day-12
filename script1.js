const tasks = [
    { id: 1, text: 'Complete project proposal' },
    { id: 2, text: 'Review code submissions' },
    { id: 3, text: 'Update documentation' },
    { id: 4, text: 'Team meeting' }
];
const list = document.getElementById("taskList");
let draggedItem = null;

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";
        li.draggable = true;
        li.dataset.id = task.id;
        li.textContent = task.text;

        li.addEventListener("dragstart", () => {
            draggedItem = li;
            li.classList.add("dragging");
        });
        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
            draggedItem = null;
            document
                .querySelectorAll(".task")
                .forEach(item => item.classList.remove("over"));
        });
        li.addEventListener("dragover", e => {
            e.preventDefault();
            li.classList.add("over");
        });
        li.addEventListener("dragleave", () => {
            li.classList.remove("over");
        });
        li.addEventListener("drop", e => {
            e.preventDefault();
            li.classList.remove("over");

            if (draggedItem === li) return;

            const draggedId = draggedItem.dataset.id;
            const targetId = li.dataset.id;

            const draggedIndex = tasks.findIndex(t => t.id == draggedId);
            const targetIndex = tasks.findIndex(t => t.id == targetId);

            const [removed] = tasks.splice(draggedIndex, 1);
            tasks.splice(targetIndex, 0, removed);

            renderTasks();
        });

        list.appendChild(li);
    });
}
renderTasks();
