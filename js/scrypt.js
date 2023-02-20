{
    let tasks = [
        {content: "Test task", done: false},
    ];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {content: newTaskContent}
         ];
           
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex), 
            ...tasks.slice(taskIndex +1),
        ];
        
        render();
    };

    const toggleTaskDone = (taskIndex) => { 
        tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done} : task);
     
        render();
    };

    const render = () => {
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

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-removeTask");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
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