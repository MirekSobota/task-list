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
        const toggleAllTaskDoneButton = document.querySelector(".js-buttonDoneAll");
        //const buttonsDone = document.querySelectorAll(".js-done");

        toggleAllTaskDoneButton.addEventListener("click", () => {
            tasks = tasks.map((task) => ({ ...task, done: true }));
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
         <li class="taskList">                   
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
        <button class="section__subHeader__button buttonNoTasks">Hide done tasks</button>
        `;
            document.querySelector(".js-buttonHideDone").innerHTML = htmlString;

            let htmlString2 = `       
        <button class="section__subHeader__button buttonNoTasks">All tasks done</button>
        `;
            document.querySelector(".js-buttonDoneAll").innerHTML = htmlString2;
        }

        else {
            let htmlString = `       
        <button class="section__subHeader__button">Hide done tasks</button>
        `;
            document.querySelector(".js-buttonHideDone").innerHTML = htmlString;

            let htmlString2 = `       
        <button class="section__subHeader__button">All tasks done</button>
        `;
            document.querySelector(".js-buttonDoneAll").innerHTML = htmlString2;
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