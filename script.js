alert('Welcome to To-Do List Writed by arsyad')

// 1. Taking essential element
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// 2. Add function
function addTask() {
    // If inbox is empty, show alert
    if(inputBox.value === ''){
        alert("You have to write something!");
    }
    else {
        // add element <li> (list item)
        let li = document.createElement("li");
        
        // add text to <li> by value form input
        li.innerHTML = inputBox.value;
        
        // add <li> into <ul> (listContainer)
        listContainer.appendChild(li);

        // add delete button (span)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Simbol X
        li.appendChild(span);
    }
    
    // empty input after adding task
    inputBox.value = "";
    
    // save the data
    saveData();
}

// 3. adding info listetner into list
// is use "Event Delegation" so that you can manage clicks on all new and old items
listContainer.addEventListener("click", function(e) {
    
    // if whats clicked is an element <li> (usually tasks)
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // Toggle kelas 'checked' (crossed out)
        saveData();
    }
    
    // if whats clicked is an elemen <span> (delete button)
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // element <li> the-parent
        saveData();
    }
}, false);

// 4. enterfuncion in keyboard
// so that it can be added just by click enter
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// --- saving data feature(Local Storage) ---
// itll make task wont disappear after refreshing

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// call this function so previous task wil appears
showTask();