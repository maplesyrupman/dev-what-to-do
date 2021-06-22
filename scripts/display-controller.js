import domOps from './DOM.js'
import app from './app.js'
import storage from './storage.js'

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
                addTaskController(tasks[key]);
            }
        }

        const addTaskController = (taskObj) => {
            taskControllers[taskObj.getName()] = taskControllerFactory(taskObj);
            taskControllers[taskObj.getName()].getTaskDeleteBtn().addEventListener('click', e => {
                let taskName = e.currentTarget.value;
                deleteTaskController(taskName);
                sublist.removeTask(taskName);
            })
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

        const getAddTaskBtn = () => {
            return addTaskBtn;
        }

        const getTaskContainer = () => {
            return taskContainer;
        }

        const addTask = (taskObj) => {
            sublist.addTask(taskObj);

        }

        return {
            updateTitle,
            addTaskController,
            createTaskControllers,
            deleteTaskController,
            clearTaskContainer,
            addTaskDivsToContainer,
            getSublistDiv,
            getAddTaskBtn,
            getTaskContainer,
            addTask,
        }
    }

    const projectControllerFactory = (projectObj) => {
        const projectParts = domOps.createNewProjectTab(projectObj);
        let projectTabDiv = projectParts[0];
        let projectTabName = projectParts[1];
        let projectEditBtn = projectParts[2];
        let projectDeleteBtn = projectParts[3];
        let sublistControllers = {};
        let newTaskFormIsDisplayed = false;
        let newSublistFormIsDisplayed = false;

        const createSublistControllers = () => {
            let sublists = projectObj.getSublists();
            for (let key in sublists) {
                sublistControllers[key] = sublistControllerFactory(sublists[key]);
                let currentSublistController = sublistControllers[key];
                activateAddTaskBtn(currentSublistController);
            }
        }

        const activateAddSublistBtn = () => {
            const addSublistBtn = document.getElementById('addSublistBtn');
            addSublistBtn.addEventListener('click', () => {
                if (newSublistFormIsDisplayed) {
                    alert('Please finish creating the task you are currently working on before starting another');
                    return;
                }
                newSublistFormIsDisplayed = true;
                let newSublistFormParts = domOps.createNewSublistForm();
                const addSublistBtnContainer = addSublistBtn.parentNode;
                addSublistBtnContainer.appendChild(newSublistFormParts[0]);
                addSublistBtn.classList.add('hide');
            });

        }

        const activateAddTaskBtn = (currentSublistController) => {
            currentSublistController.getAddTaskBtn().addEventListener('click', e => {
                if (newTaskFormIsDisplayed) {
                    alert('Please finish creating the task you are currently working on before starting another');
                    return;
                }
                newTaskFormIsDisplayed = true;
                let newTaskFormParts = domOps.createNewTaskForm();
                activateCancleTaskBtn(currentSublistController, newTaskFormParts[4]);
                activateConfirmTaskBtn(currentSublistController, newTaskFormParts[3]);
                currentSublistController.getTaskContainer().appendChild(newTaskFormParts[0]);
            })
        }

        const activateConfirmSublistBtn = (confirmSublistBtn) => {
            confirmSublistBtn.addEventListener('click', () => {
                projectObj.addSublist(newSublistFormParts[1].value);
            })
        }

        const activateConfirmTaskBtn = (currentSublistController, newTaskFormParts) => {
            newTaskFormParts.addEventListener('click', () => {
                let newTask = app.taskFactory(newTaskFormParts[1].value, newTaskFormParts[2].value);
                currentSublistController.addTask(newTask);
                currentSublistController.addTaskController(newTask);
                currentSublistController.clearTaskContainer();
                currentSublistController.addTaskDivsToContainer();
                newTaskFormIsDisplayed = false;
            })
        }

        const activateCancleTaskBtn = (currentSublistController, cancleTaskBtn) => {
            cancleTaskBtn.addEventListener('click', () => {
                currentSublistController.getTaskContainer().lastChild.remove();
                newTaskFormIsDisplayed = false;
            })
        }

        const getSublistControllers = () => {
            return sublistControllers;
        }

        const getProjectTabDiv = () => {
            return projectTabDiv;
        }

        return {
            createSublistControllers,
            getProjectTabDiv,
            getSublistControllers,
            activateAddSublistBtn,
        }

    }

    const projectDisplayController = projectObj => {
        const currentProjectName = projectObj.getName();
        let projectToDisplay = projectControllerFactory(projectObj);
        projectToDisplay.createSublistControllers();

        const addSublistDivsToProjectDisplay = (sublistControllers) => {
            for (let key in sublistControllers) {
                projectDisplay.appendChild(sublistControllers[key].getSublistDiv());
            }
        }

        const renderProject = () => {
            let sublistControllers = Object.values(projectToDisplay.getSublistControllers());
            for (let value of sublistControllers) {
                clearProjectDisplay();
                value.createTaskControllers();
                value.addTaskDivsToContainer();
            };
            addSublistDivsToProjectDisplay(sublistControllers);
            const addSublistBtnContainer = domOps.createAddSublistBtnContainer(currentProjectName);
            projectDisplay.appendChild(addSublistBtnContainer[0]);
        }

        const clearProjectDisplay = () => {
            while (projectDisplay.hasChildNodes()) {
                projectDisplay.lastChild.remove();
            }
        }

        return {
            renderProject,
        }


    }

    const projectNavController = (projectsObj) => {
        let projects = projectsObj;
        let projectControllers = {};

        const createProjectControllers = () => {
            for (let key in projects) {
                projectControllers[key] = projectControllerFactory(projects[key]);
            }
        }

        const setProjects = (newProjectsObj) => {
            projects = newProjectsObj;
        }

        const renderProjectNav = () => {
            for (let key in projectControllers) {
                projectNavTabs.appendChild(projectControllers[key].getProjectTabDiv());
            }
        }

        const getProjectControllers = () => {
            return projectControllers;
        }

        return {
            setProjects,
            createProjectControllers,
            getProjectControllers,
            renderProjectNav,
        }
    };

    return {
        taskControllerFactory,
        sublistControllerFactory,
        projectControllerFactory,
        projectDisplayController,
        projectNavController,
    }

})();



export default displayController