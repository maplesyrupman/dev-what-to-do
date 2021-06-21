const domOps = (() => {

    const createNewProjectForm = () => {
        let newProjectFormDiv = document.createElement('div');
        newProjectFormDiv.setAttribute('id', 'newProjectFormDiv');
        newProjectFormDiv.classList.add('project-tab-div');
        let newProjectForm = document.createElement('form');
        let newProjectNameField = document.createElement('input');
        newProjectNameField.setAttribute('id', 'newProjectNameField');
        newProjectNameField.setAttribute('type', 'text');
        newProjectNameField.setAttribute('name', 'newProjectName');
        newProjectNameField.setAttribute('placeholder', 'New Project');
        let buttonDiv = document.createElement('div');
        let createProjectBtn = document.createElement('button');
        createProjectBtn.setAttribute('id', 'confirmNewProjectBtn');
        createProjectBtn.innerHTML = '<i class="fas fa-check"></i>';
        createProjectBtn.classList.add('create-btn');
        let cancleProjectBtn = document.createElement('button');
        cancleProjectBtn.setAttribute('id', 'cancleNewProjectBtn');
        cancleProjectBtn.innerHTML = '<i class="fas fa-times"></i>';
        cancleProjectBtn.classList.add('cancle-btn');
        buttonDiv.appendChild(createProjectBtn);
        buttonDiv.appendChild(cancleProjectBtn);
        newProjectForm.appendChild(newProjectNameField);
        newProjectFormDiv.appendChild(newProjectForm);
        newProjectFormDiv.appendChild(buttonDiv);

        return [newProjectFormDiv, newProjectNameField, createProjectBtn, cancleProjectBtn];
    }

    const createNewTaskForm = () => {
        let newTaskFormDiv = document.createElement('div');
        newTaskFormDiv.classList.add('task-div');
        let newTaskForm = document.createElement('form');
        let newTaskNameField = document.createElement('input');
        newTaskNameField.setAttribute('type', 'text');
        newTaskNameField.setAttribute('name', 'newTaskName');
        newTaskNameField.setAttribute('placeholder', 'New Task');
        let newTaskDueDateField = document.createElement('input');
        newTaskDueDateField.setAttribute('type', 'date');
        newTaskDueDateField.setAttribute('name', 'newTaskDueDate');
        let buttonDiv = document.createElement('div');
        let confirmTaskBtn = document.createElement('button');
        confirmTaskBtn.innerHTML = '<i class="fas fa-check"></i>';
        confirmTaskBtn.classList.add('create-btn');
        let cancleTaskBtn = document.createElement('button');
        cancleTaskBtn.innerHTML = '<i class="fas fa-times"></i>';
        cancleTaskBtn.classList.add('cancle-btn');
        buttonDiv.appendChild(confirmTaskBtn);
        buttonDiv.appendChild(cancleTaskBtn);
        newTaskForm.appendChild(newTaskNameField);
        newTaskForm.appendChild(newTaskDueDateField);
        newTaskFormDiv.appendChild(newTaskForm);
        newTaskFormDiv.appendChild(buttonDiv);

        return [newTaskFormDiv, newTaskNameField, newTaskDueDateField, confirmTaskBtn, cancleTaskBtn];
    }

    const createNewProjectTab = (projectObj) => {
        let projectName = projectObj.getName();
        const projectTabDiv = document.createElement('div');
            projectTabDiv.classList.add('project-tab-div');
            projectTabDiv.setAttribute('id', projectName);
            const projectTabName = document.createElement('h2');
            projectTabName.classList.add('project-tab-name');
            projectTabName.textContent = projectName;
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('project-btn-container');
            const projectEditBtn = document.createElement('button');
            projectEditBtn.innerHTML = '<i class="fas fa-pen"></i>';
            projectEditBtn.classList.add('project-edit-btn');
            const projectDeleteBtn = document.createElement('button');
            projectDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            projectDeleteBtn.dataset.project = projectName;
            projectDeleteBtn.classList.add('project-delete-btn');
            projectTabDiv.appendChild(projectTabName);
            buttonDiv.appendChild(projectEditBtn);
            buttonDiv.appendChild(projectDeleteBtn);
            projectTabDiv.appendChild(buttonDiv);

            return [projectTabDiv, projectTabName, projectEditBtn, projectDeleteBtn];
    }

    const createSublist = (sublistObj) => {
        const sublistDiv = document.createElement('div');
        sublistDiv.classList.add('sublist-div');
        const sublistTitle = document.createElement('h3');
        sublistTitle.textContent = sublistObj.getName();
        sublistTitle.classList.add('sublist-title');
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        const addTaskBtn = document.createElement('div');
        addTaskBtn.innerHTML = '<i class="fas fa-plus"></i>';
        addTaskBtn.classList.add('add-task-btn');

        sublistDiv.appendChild(sublistTitle);
        sublistDiv.appendChild(taskContainer);
        sublistDiv.appendChild(addTaskBtn);
        
        return [sublistDiv, sublistTitle, taskContainer, addTaskBtn];
    }

    const createAddSublistBtnContainer = () => {
        const addSublistBtnContianer = document.createElement('div');
        addSublistBtnContianer.classList.add('sublist-div');
        const addSublistBtn = createAddSublistBtn();
        addSublistBtnContianer.appendChild(addSublistBtn);


        return [addSublistBtnContianer, addSublistBtn];
    }

    const createAddSublistBtn = () => {
        const addSublistBtn = document.createElement('div');
        addSublistBtn.innerHTML = '<i class="fas fa-plus fa-2x"></i>';
        addSublistBtn.classList.add('add-sublist-btn');

        return addSublistBtn;
    }

    const createTask = (taskObj) => {
        let task = taskObj;
        let taskName = task.getName();
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-div');
        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.name = 'taskCheckbox';
        taskCheckbox.value = taskName;
        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
        const taskTitle = document.createElement('h4');
        taskTitle.textContent = taskName;
        taskTitle.classList.add('task-title');
        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = task.getDueDate();
        taskDueDate.classList.add('task-due-date');
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');
        const taskEditBtn = document.createElement('button');
        taskEditBtn.value = taskName;
        taskEditBtn.innerHTML = '<i class="fas fa-pen"></i>';
        taskEditBtn.classList.add('task-edit-btn');
        const taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.setAttribute('value', taskName);
        taskDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        taskDeleteBtn.classList.add('task-delete-btn');

        taskDiv.appendChild(taskCheckbox);
        textContainer.appendChild(taskTitle);
        textContainer.appendChild(taskDueDate);
        taskDiv.appendChild(textContainer);
        btnContainer.appendChild(taskEditBtn);
        btnContainer.appendChild(taskDeleteBtn);
        taskDiv.appendChild(btnContainer);

        return [taskDiv, taskTitle, taskDueDate, taskEditBtn, taskDeleteBtn];
    }

    return {
        createNewProjectForm,
        createNewProjectTab,
        createSublist,
        createAddSublistBtnContainer,
        createTask,
        createNewTaskForm,
    }

})();

export default domOps