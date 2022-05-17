var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
       // prevents automatic browser refresh and subsequent loss of submitted data
        event.preventDefault();

        // targets the <input name=task-name> element and attribute and 'getting' the data stored in the value property
        var taskNameInput = document.querySelector("input[name='task-name']").value;

        var taskTypeInput = document.querySelector("select[name='task-type']").value;
        
        // package data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
       

        // send to createTaskEl as an argument
        createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // creates a new <li> element and a resulting new task item / assigns css class styling to new <li> element
    var listItemEl = document.createElement("li");  
    listItemEl.className = "task-item";
    
    // creates a new <div> element 
    var taskInfoEl = document.createElement("div");
    // gives new <div> element class name 'task-info'
    taskInfoEl.className = "task-info";
    // creates <h3> element inside the div with class name 'task-name' and span element with class name 'task-type'
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
   
    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", taskFormHandler);