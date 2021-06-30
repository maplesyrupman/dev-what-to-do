import domOps from './DOM.js'
import app from './app.js'
import storage from './storage.js'

const displayController = (() => {
    const projectDisplay = document.getElementById('project-display');

    const taskControllerFactory = (taskObj) => {
        const taskParts = domOps.createTask(taskObj);
        let taskDiv = taskParts[0];
        let taskTitle = taskParts[1];
        let taskDueDate = taskParts[2];
        let taskEditBtn = taskParts[3];
        let taskDeleteBtn = taskParts[4];

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
        const sublistEditBtn = sublistParts[4];
        const sublistDeleteBtn = sublistParts[5];
        let taskControllers = {};

        const createTaskControllers = () => {
            let tasks = sublist.tasks;
            for (let key in tasks) {
                addTaskController(tasks[key]);
            }
        }

        const addTaskController = (taskObj) => {
            taskControllers[taskObj.taskName] = taskControllerFactory(taskObj);
            taskControllers[taskObj.taskName].getTaskDeleteBtn().addEventListener('click', e => {
                let taskName = e.currentTarget.value;
                deleteTaskController(taskName);
                storage.deleteTask(taskObj.taskName, taskObj.parent, taskObj.grandparent);
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

        const getSublistDeleteBtn = () => {
            return sublistDeleteBtn;
        }

        const getSublistEditBtn = () => {
            return sublistEditBtn;
        }

        const getAddTaskBtn = () => {
            return addTaskBtn;
        }

        const getTaskContainer = () => {
            return taskContainer;
        }

        const addTask = (taskObj) => {
            sublist.tasks[taskObj.taskName] = taskObj;

        }

        return {
            addTaskController,
            createTaskControllers,
            deleteTaskController,
            clearTaskContainer,
            addTaskDivsToContainer,
            getSublistDiv,
            getSublistDeleteBtn,
            getSublistEditBtn,
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

        const getProjectEditBtn =  () => {
            return projectEditBtn;
        }

        const getProjectDeleteBtn = () => {
            return projectDeleteBtn;
        }

        const createSublistControllers = () => {
            let sublists = projectObj.sublists;
            for (let key in sublists) {
                sublistControllers[key] = sublistControllerFactory(sublists[key]);
                let currentSublistController = sublistControllers[key];
                activateAddTaskBtn(currentSublistController);
            }
        }

        const activateAddTaskBtn = (currentSublistController) => {
            let addTaskBtn = currentSublistController.getAddTaskBtn();
            addTaskBtn.addEventListener('click', e => {
                if (newTaskFormIsDisplayed) {
                    alert('Please finish creating the task you are currently working on before starting another');
                    return;
                }
                newTaskFormIsDisplayed = true;
                let newTaskFormParts = domOps.createNewTaskForm();
                activateCancleTaskBtn(currentSublistController, newTaskFormParts[4]);
                activateConfirmTaskBtn(currentSublistController, newTaskFormParts[3], newTaskFormParts, addTaskBtn.dataset.parent, addTaskBtn.dataset.grandparent);
                currentSublistController.getTaskContainer().appendChild(newTaskFormParts[0]);
            })
        }

        const activateConfirmTaskBtn = (currentSublistController, createTaskBtn, newTaskFormParts, parent, grandparent) => {
            createTaskBtn.addEventListener('click', () => {
                let newTask = app.taskFactory(newTaskFormParts[1].value, newTaskFormParts[2].value, parent, grandparent);
                storage.addTask(newTask, parent, grandparent);
                console.log(storage.getProjects()[grandparent]);
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
            getProjectEditBtn, 
            getProjectDeleteBtn,
        }

    }

    const projectDisplayController = () => {
        let newSublistFormIsDisplayed = false;
        let projectName;

        const addSublistDivsToProjectDisplay = (sublistControllers) => {
            for (let key in sublistControllers) {
                projectDisplay.appendChild(sublistControllers[key].getSublistDiv());
            }
        }

        const activateAddSublistBtn = () => {
            const addSublistBtn = document.getElementById('addSublistBtn');
            addSublistBtn.addEventListener('click', () => {
                if (newSublistFormIsDisplayed) {
                    alert('Please finish creating the sublist you are currently working on before starting another');
                    return;
                }
                newSublistFormIsDisplayed = true;
                let newSublistFormParts = domOps.createNewSublistForm(projectName);
                const addSublistBtnContainer = addSublistBtn.parentNode;
                addSublistBtnContainer.appendChild(newSublistFormParts[0]);
                activateConfirmSublistBtn(newSublistFormParts[1], newSublistFormParts[2]);
                addSublistBtn.classList.add('hide');
            });
        }

        const activateConfirmSublistBtn = (sublistName, confirmSublistBtn) => {
            confirmSublistBtn.addEventListener('click', e => {
                let parentProjectName = e.currentTarget.dataset.parentProjectName;
                storage.addSublist(app.sublistFactory(sublistName.value, parentProjectName), parentProjectName);
                let project = storage.getProjects()[projectName];
                let projectToDisplay = projectControllerFactory(project);
                projectToDisplay.createSublistControllers();
                renderProject(project);
                newSublistFormIsDisplayed = false;
            })
        }

        const activateSublistDeleteBtn = (sublistDeleteBtn) => {
            sublistDeleteBtn.addEventListener('click', () => {
                storage.deleteSublist(sublistDeleteBtn.dataset.name, sublistDeleteBtn.dataset.parent)
                renderProject(storage.getProjects()[sublistDeleteBtn.dataset.parent]);
            })
        }

        const renderProject = (projectObj) => {
            clearProjectDisplay();
            let project = projectObj;
            projectName = projectObj.projectName;
            const currentProjectName = project.projectName;
            let projectToDisplay = projectControllerFactory(project);
            projectToDisplay.createSublistControllers();
            let sublistControllers = Object.values(projectToDisplay.getSublistControllers());
            for (let value of sublistControllers) {
                clearProjectDisplay();
                activateSublistDeleteBtn(value.getSublistDeleteBtn());
                value.createTaskControllers();
                value.addTaskDivsToContainer();
            };
            addSublistDivsToProjectDisplay(sublistControllers);
            const addSublistBtnContainer = domOps.createAddSublistBtnContainer(currentProjectName);
            projectDisplay.appendChild(addSublistBtnContainer[0]);
            activateAddSublistBtn();
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
        const projectNavTabs = document.getElementById('project-nav-tabs');
        let projects = projectsObj;
        let projectControllers = {};
        let newProjectFormIsDisplayed = false;

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
                let currentController = projectControllers[key];
                projectNavTabs.appendChild(currentController.getProjectTabDiv());
                activateProjectDeleteBtn(currentController.getProjectDeleteBtn());
                currentController.getProjectTabDiv().addEventListener('click', e => {
                    if (e.target.localName == 'i') {
                        return;
                    }
                    displayProject(e.currentTarget.dataset.name);
                })
            }
        }

        const activateProjectDeleteBtn = (projectDeleteBtn) => {
            projectDeleteBtn.addEventListener('click', e => {
                const projectName = projectDeleteBtn.dataset.project;
                document.getElementById(projectName).remove();
                delete projectControllers[projectName];
                storage.deleteProject(projectName);
            })
        }

        const displayProject = (projectName) => {
            let theDisplayController = projectDisplayController();
            theDisplayController.renderProject(storage.getProjects()[projectName]);
        }

        const getProjectControllers = () => {
            return projectControllers;
        }

        const clearProjectNav = () => {
            while (projectNavTabs.hasChildNodes()) {
                projectNavTabs.lastChild.remove();
            }
        }

        const activateAddProjectBtn = () => {
            const addProjectBtn = document.getElementById('add-project-btn');
            addProjectBtn.addEventListener('click', () => {
                if (newProjectFormIsDisplayed) {
                    alert('Please finish creating the new project you have started before creating another');
                    return;
                }
                newProjectFormIsDisplayed = true;
                const newProjectFormParts = domOps.createNewProjectForm();
                activateConfirmProjectBtn(newProjectFormParts);
                activateCancleProjectBtn(newProjectFormParts[3]);
                projectNavTabs.appendChild(newProjectFormParts[0]);
            });
        }

        const activateConfirmProjectBtn = (newProjectFormParts) => {
            newProjectFormParts[2].addEventListener('click', () => {
                storage.addProject(app.projectFactory(newProjectFormParts[1].value), newProjectFormParts[1].value);
                clearProjectNav();
                setProjects(storage.getProjects());
                createProjectControllers();
                renderProjectNav();
                newProjectFormIsDisplayed = false;
            })
        }

        const activateCancleProjectBtn = (cancleProjectBtn) => {
            cancleProjectBtn.addEventListener('click', () => {
                projectNavTabs.lastChild.remove();
                newProjectFormIsDisplayed = false;
            })
        }

        return {
            setProjects,
            createProjectControllers,
            getProjectControllers,
            renderProjectNav,
            activateAddProjectBtn,
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