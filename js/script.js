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

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };


    const bindToggleEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const toggleAllTaskDone  = () => {
       tasks = tasks.map((task) => ({ ...task, done: true }));
        render();
    };

    const bindButtonsEvent = () => {
        const toggleAllTaskDoneButton = document.querySelector(".js-buttonFinishAll");
        const buttonHideDone = document.querySelector(".js-buttonHideDone");


        if (toggleAllTaskDoneButton) {
            toggleAllTaskDoneButton.addEventListener("click", () => {
                toggleAllTaskDone(tasks);
            });            
        };

        if(buttonHideDone){
            buttonHideDone.addEventListener("click", () => {
                toggleHideDoneTasks();
            });
        }
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
         <li class="taskList ${task.done && hideDoneTasks ? "taskList--hidden" : ""}">                   
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
        let buttonsElements = document.querySelector(".js-buttons");
        let htmlString = "";
  
        if (tasks.length) {
            htmlString = `       
              <button class="js-buttonHideDone section__subHeader__buttonHideDone">
                  ${!hideDoneTasks ? "Hide" : "Show"} done tasks
              </button>
              <button class="js-buttonFinishAll section__subHeader__buttonFinishAll" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                  Finish all tasks
              </button>
            `;
        }
  
        buttonsElements.innerHTML = htmlString;
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

        const newTaskElement = document.querySelector(".js-newTaskInput");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }

        newTaskElement.focus();
        newTaskElement.value = "";
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit)
    };

    init();

}