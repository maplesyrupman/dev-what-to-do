import domOps from './DOM.js'

const displayController = (() => {
    const projectNavTabs = document.getElementById('project-nav-tabs');
    const projectDisplay = document.getElementById('project-display');
    let newProjectFormIsDisplayed = false;

    const taskControllerFactory = (taskObj) => {
        const taskParts = domOps.createTask(taskObj);
        let taskDiv = taskParts[0];
        let taskTitle = taskParts[1];
        let taskDueDate = taskParts[2];
        let taskEditBtn = taskParts[3];
        let taskDeleteBtn = taskParts[4];

        const updateTitle = (newTitle) => {
            taskTitle.textContent = newTitle;
        }

        const updateDueDate = (newDueDate) => {
            taskDueDate = newDueDate;
        }

        const getTaskEditBtn = () => {
            return taskEditBtn;
        }

        const getTaskDeleteBtn = () => {
            return taskDeleteBtn;
        }

        const getTaskDiv = () => {
            return taskDiv;
        }

        return {
            updateTitle, 
            updateDueDate, 
            getTaskEditBtn, 
            getTaskDeleteBtn, 
            getTaskDiv
        }
    }

    const sublistControllerFactory = (sublistObj) => {
        let sublist = sublistObj;
        const sublistParts = domOps.createSublist(sublist);
        let sublistDiv = sublistParts[0];
        let sublistTitle = sublistParts[1];
        let taskContainer = sublistParts[2];
        let addTaskBtn = sublistParts[3];
        let taskControllers = {};

        const updateTitle = (newTitle) => {
            sublistTitle.textContent = newTitle;
        }

        const createTaskControllers = () => {
            let tasks = sublist.getTasks();
            for (let key in tasks) {
                taskControllers[key] = taskControllerFactory(tasks[key]);
                taskControllers[key].getTaskDeleteBtn().addEventListener('click', (e) => {
                    let taskName = e.currentTarget.value;
                    console.log(taskName);
                    deleteTaskController(taskName);
                    sublist.removeTask(taskName);
                    console.log(sublist.getTasks());
                });
            }
        }

        const deleteTaskController = (taskToDelete) => {
            delete taskControllers[taskToDelete];
            clearTaskContainer();
            addTaskDivsToContainer();
        }

        const clearTaskContainer = () => {
            while (taskContainer.hasChildNodes()) {
                taskContainer.removeChild(taskContainer.lastChild);
            }
        }

        const addTaskDivsToContainer = () => {
            for (let key in taskControllers) {
                taskContainer.appendChild(taskControllers[key].getTaskDiv());
            }
        }

        const getSublistDiv = () => {
            return sublistDiv;
        }

        return {
            updateTitle, 
            createTaskControllers, 
            deleteTaskController, 
            clearTaskContainer,
            addTaskDivsToContainer,
            getSublistDiv,
        }
    }

    const projectControllerFactory = (projectObj) => {
        const projectParts = domOps.createNewProjectTab(projectObj); 
        let projectTabDiv = projectParts[0];
        let projectTabName = projectParts[1];
        let projectEditBtn = projectParts[2];
        let projectDeleteBtn = projectParts[3];
        let sublistControllers = {};

        const createSublistControllers = () => {
            let sublists = projectObj.getSublists();
            for (let key in sublists) {
                sublistControllers[key] = sublistControllerFactory(sublists[key]);
            }
        }


    }

    return {
        taskControllerFactory, 
        sublistControllerFactory, 
        projectControllerFactory
    }
    
})();



export default displayController