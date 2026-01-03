//Fetch the Dom Elements
let inputDisplay = document.getElementById("write-todo");
let saveButton = document.getElementById("save");
let todoLists = document.getElementsByClassName("todo-list")
let todoActions = document.getElementsByClassName("actions")
let getPending=document.getElementById("get-pending");



let todoArr=[];// initially it will be empty

//Step1:User comes and starts to Write Something if types make button enable else make button disabled

  saveButton.classList.add("disabled");
  getPending.classList.add("disabled");
inputDisplay.addEventListener("input",function(){
        console.log("Typing.....")
        if(inputDisplay.value===""){
        saveButton.classList.add("disabled");
        getPending.classList.add("disabled"); 
        }
        else{
           saveButton.classList.remove("disabled"); 
        }
        console.log(inputDisplay.value);
})

function createTodo(){
   // create main row
let row = document.createElement("div");
row.classList.add("todo-list");

// number
let todoNumber = document.createElement("h3");
todoNumber.classList.add("number");


// todo text
let todoData = document.createElement("h3");
todoData.classList.add("todo-data");
todoData.textContent = inputDisplay.value;

// status
let todoStatus = document.createElement("h3");
todoStatus.classList.add("status");
todoStatus.textContent = "In Progress";

// actions container
let actions = document.createElement("div");
actions.classList.add("actions");

// buttons
let deleteBtn = document.createElement("button");
deleteBtn.classList.add("delete");
deleteBtn.textContent = "Delete";

let finishBtn = document.createElement("button");
finishBtn.classList.add("finished");
finishBtn.textContent = "Finished";


let editBtn=document.createElement("button");
editBtn.classList.add("edit");
editBtn.textContent="Edit";

// append buttons
actions.appendChild(deleteBtn);
actions.appendChild(finishBtn);
actions.appendChild(editBtn);

// append everything to row
row.appendChild(todoNumber);
row.appendChild(todoData);
row.appendChild(todoStatus);
row.appendChild(actions);

//border
let border = document.createElement("div");
border.classList.add("border-div");

// append row to container
document.querySelector(".container").appendChild(row);
document.querySelector(".container").appendChild(border);


todoArr.push(row);
row.setAttribute("todo-index",todoArr.length);
todoNumber.textContent = todoArr.length;

//clear input
inputDisplay.value="";
saveButton.classList.add("disabled");

deleteBtn.addEventListener("click",function(event){
    deleteTodo(event.target);
})
finishBtn.addEventListener("click",function(event){
    finishTodo(event.target);
})

// edit
editBtn.addEventListener("click",function(event){
    editTodo(event.target)
})
}

 
getPending.addEventListener("click",function(){
    getPendingTodos();
})



function rerender(todoArr){
    todoArr.forEach(function(row, index){
        row.querySelector(".number").textContent = index + 1; // current dom element
        row.setAttribute("todo-index", index + 1);
    });
}


function deleteTodo(targetedBtn){
    const row = targetedBtn.parentElement.parentElement;

    // 👇 get border FIRST
    const border = row.nextElementSibling;

    const index = row.getAttribute("todo-index") - 1;
    todoArr.splice(index, 1);

    row.remove();
    if (border) border.remove();

    rerender(todoArr);
}


function finishTodo(targetedBtn){
    const row = targetedBtn.parentElement.parentElement;
    const statusEl = row.querySelector(".status");
    const todoData=row.querySelector(".todo-data")
   
    if(statusEl.textContent === "Finished"){
        statusEl.textContent = "In Progress";
        todoData.classList.remove("strike");
    } else {
        statusEl.textContent = "Finished";
         todoData.classList.add("strike");
    }
}




function editTodo(targetedBtn){
    const row=targetedBtn.parentElement.parentElement; // this brings row
    const todoData=row.querySelector(".todo-data");
    console.log(todoData); // her it gave u whole element itself (h3)

    if(targetedBtn.textContent==="Edit"){
        // enter edit mode
        todoData.contentEditable = true; // set the cursor to edit 
        todoData.focus(); // it brings the cursor to the current selected element
        targetedBtn.textContent = "Save";
    }
    else{

        todoData.contentEditable = false;
        targetedBtn.textContent = "Edit";
    }
}

 function getPendingTodos() {

    if (getPending.textContent === "Get Pending Todos") {

        todoArr.forEach(function (row) {
            const statusText = row.querySelector(".status").textContent;

            if (statusText === "In Progress") {
                row.classList.remove("hidden");
            } else {
                row.classList.add("hidden");
            }
        });

        getPending.textContent = "All Todos";

    } else {

        todoArr.forEach(function (row) {
            row.classList.remove("hidden");
        });

        getPending.textContent = "Get Pending Todos";
       
    }
}




saveButton.addEventListener("click",function(){
        console.log("Save Todo")
        createTodo();
        getPending.classList.remove("disabled");
        
})

