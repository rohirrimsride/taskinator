var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var taskFormHandler = function(event) {
       // prevents automatic browser refresh and subsequent loss of submitted data
        event.preventDefault();

        // targets the <input name=task-name> element and attribute and 'getting' the data stored in the value property
        var taskNameInput = document.querySelector("input[name='task-name']").value;

        var taskTypeInput = document.querySelector("select[name='task-type']").value;
        
        // check if input variables are empty strings
        if (!taskNameInput || !taskTypeInput) {
            alert("You need to fill out the task form!");
            return false;
        }

        formEl.reset();

        var isEdit = formEl.hasAttribute("data-task-id");
        
        // has data attribute, so get task id and call function to complete edit process
        if (isEdit) {
            var taskId = formEl.getAttribute("data-task-id");
            completeEditTask(taskNameInput, taskTypeInput, taskId);
        }

        // no data attribute, so create object as normal and pass to createTaskEl function
        else {
            // package data as an object
            var taskDataObj = {
                name: taskNameInput,
                type: taskTypeInput
            };

             // send to createTaskEl as an argument
            createTaskEl(taskDataObj);
        }       
};

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id= '" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var createTaskEl = function(taskDataObj) {
    // creates a new <li> element and a resulting new task item / assigns css class styling to new <li> element
    var listItemEl = document.createElement("li");  
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    
    // creates a new <div> element 
    var taskInfoEl = document.createElement("div");
    // gives new <div> element class name 'task-info'
    taskInfoEl.className = "task-info";
    // creates <h3> element inside the div with class name 'task-name' and span element with class name 'task-type'
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    
    var taskActionsEl = createTaskActions(taskIdCounter);
    
    listItemEl.appendChild(taskInfoEl);
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    // creates a div element with a class of "task-actions"
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button with class "btn edit-btn" and a data attribute of "data-task-id"
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button with class "btn delete-btn" and a data attribute of "data-task-id"
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    // actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (event.target.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function(taskId) {

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and covert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};

pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

formEl.addEventListener("submit", taskFormHandler);