{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done } : task);
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeTask");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };


    const bindToggleEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindButtonsEvent = () => {
        const toggleAllTaskDoneButton = document.querySelector(".js-buttonFinishAll");
        const buttonHideDone = document.querySelector(".js-buttonHideDone");
        

        if(tasks.length) {
            toggleAllTaskDoneButton.addEventListener("click", () => {
                tasks = tasks.map((task) => ({ ...task, done: true }));
                render();
            }); 
            
         buttonHideDone.addEventListener("click", () => {
            hideDoneTasks = !hideDoneTasks;
            render();   
        });
    };
};

    const renderTasks = (hideDoneTasks) => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
         <li class="taskList ${task.done && hideDoneTasks ? "taskList--hidden" : "" }">                   
            <button class="js-done taskButton taskButton--done ">
            ${task.done ? "✔" : ""}  
            </button>            
            <span ${task.done ? " class=\"taskDone\"" : ""}>
                ${task.content}
            </span>
            <button class="js-removeTask taskButton taskButton--removeTask">
                🗑
            </button>        
        </li>
        `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        if (!tasks.length) {
            let htmlString = `       
        <button class="buttonNoTasks"></button>
        <button class="buttonNoTasks"></button>
        `;
            document.querySelector(".js-buttons").innerHTML = htmlString;      
        }

        else {
            let htmlString = `       
        <button class="js-buttonHideDone section__subHeader__buttonHideDone">Hide done tasks</button>
        <button class="js-buttonFinishAll section__subHeader__buttonFinishAll">Finish all tasks</button>
        `;
            document.querySelector(".js-buttons").innerHTML = htmlString;        
        }

    };

    const render = () => {
        renderButtons();
        renderTasks();
        bindRemoveEvents();
        bindToggleEvents();
        bindButtonsEvent();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTaskInput").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);

        document.querySelector(".js-newTaskInput").focus();
        document.querySelector(".js-newTaskInput").value = "";
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit)
    };

    init();

}