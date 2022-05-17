var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
        // creates a new <li> element and a resulting new task item
        var listItemEl = document.createElement("li");
        // assigns css class styling to new <li> element
        listItemEl.className = "task-item";
        // adds text to new <li> element
        listItemEl.textContent = "This is a new task.";
        // appends new child <li> element to bottom of the parent <ul> element
        tasksToDoEl.appendChild(listItemEl);
}

buttonEl.addEventListener("click", createTaskHandler);