var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
       // prevents automatic browser refresh and subsequent loss of submitted data
        event.preventDefault();

        // creates a new <li> element and a resulting new task item
        var listItemEl = document.createElement("li");
        // assigns css class styling to new <li> element
        listItemEl.className = "task-item";
        // adds text to new <li> element
        listItemEl.textContent = "This is a new task.";
        // appends new child <li> element to bottom of the parent <ul> element
        tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);