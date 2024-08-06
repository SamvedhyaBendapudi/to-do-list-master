// Define UI Elements variables

const form          =  document.querySelector("#task-form");
const taskList      =  document.querySelector("#collection-list");
const clearBtn      =  document.querySelector(".clear-tasks");
const filter        =  document.querySelector("#filter");
const taskInput     =  document.querySelector("#task");

loadEvents();

function loadEvents(){
    
    //Window LOad Event
    document.addEventListener('DOMContentLoaded', getTasks);
    
    //Form Submit Event
    form.addEventListener('submit', addTasks);
    
    //Remove Task Event
    taskList.addEventListener('click', removeTask);
    
    //Edit Task Event
    taskList.addEventListener('click', editTask);
    
    //Clear All Task Event
    clearBtn.addEventListener('click', clearTasks);
    
    //Filter Task Event
    filter.addEventListener('keyup', filterTasks);
}

function createAndAddItemToTaskList(task){
    //We Have to create a new 'li' and insert it in 'ul'.
    
        //Create li element
        const li = document.createElement('li');
    
        //Add class Names
        li.className = "collection-item";
    
        // Created span in li for editing task
        const taskItem = document.createElement("span");
    
        //Giving classname to span
        taskItem.className = "task-name";
    
        taskItem.innerHTML = task;
    
        //Add text in li
        li.appendChild(taskItem);
    
        //Create a link for deleting
        const deleteLink = document.createElement('a');
    
        //Add attribute to link
        deleteLink.setAttribute('href', '#');
    
        //Add class
        deleteLink.className = "delete-item secondary-content";
    
        //Add 'x' as button in 'a'
        deleteLink.innerHTML = "<i class='fa fa-remove'></i>";
    
        //Append link to li
        li.appendChild(deleteLink);
    
        //Create a new link for editing
        const editLink = document.createElement('a');
    
        //Add attribute to link
        editLink.setAttribute('href', '#');
    
        //Add class
        editLink.className = "edit-item secondary-content";
    
        //Add edit icon as button in 'a'
        editLink.innerHTML = "<i class='fa fa-pencil'></i>";
    
        //Append link to li
        li.appendChild(editLink);
        
        //Append li to the task list (ul)
        taskList.appendChild(li);
}

function addTasks(e){
    e.preventDefault();
    if(taskInput.value === ''){
        alert("Please do insert any task!");
    }else{
        
        createAndAddItemToTaskList(taskInput.value);
        
        //Store to LocalStorage
        storeTaskInLocalStorage(taskInput.value);
        
        //Clear the task input
        taskInput.value = "";
    }
}

function removeTask(e){
    if(e.target.classList.contains('delete-item') || e.target.parentElement.classList.contains('delete-item')){
        
        if(confirm('Are you sure you want to delete?')){
            let taskValue;
            if(e.target.parentElement.nodeName === 'LI'){
                taskValue = e.target.parentElement.textContent;
                e.target.parentElement.remove();
            }else{
                taskValue = e.target.parentElement.parentElement.textContent;
                e.target.parentElement.parentElement.remove();
            }
            removeTaskFromLocalStorage(taskValue);
        }
    }
}

function editTask(e){
    if(e.target.classList.contains('edit-item') || e.target.parentElement.classList.contains('edit-item')){
        
        if(confirm('Are you sure you want to edit?')){
            var newTask = window.prompt("Enter New Task : ");
            if(e.target.parentElement.parentElement.nodeName === 'LI'){
                task = e.target.parentElement.parentElement.firstChild.textContent;
                e.target.parentElement.parentElement.firstChild.textContent = newTask;
            }else{
                task = e.target.parentElement.parentElement.parentElement.firstChild.textContent;
                e.target.parentElement.parentElement.parentElement.firstChild.textContent = newTask;
            }
            editTaskFromLocalStorage(task, newTask);
        }
    }
}

function clearTasks(e){
    e.preventDefault();
    
    //Slower Method
    //taskList.innerHTML = '';
    
    //Faster Method
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    
    //Remove all From LocalStorage
    let tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(e){
    const key = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(key) == -1){
            task.style.display = 'none';
        }else{
            task.style.display = 'block';
        }
    });
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(e){
    //Retrieve all the task from storage and display
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){
        createAndAddItemToTaskList(task);
    });
}

function removeTaskFromLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(taskValue, index){
        if(taskValue === task){
            tasks.splice(index, 1);
        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTaskFromLocalStorage(task, newTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(taskValue, index){
        if(taskValue === task){
            tasks[index] = newTask;
        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}