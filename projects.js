const projectFactory = (name) => {
    const tasks = {};

    const getTasks = () => {
        return tasks;
    }

    const addTask = (taskName, taskDescription, taskDueDate) => {
        let task = {taskDescription, taskDueDate};
        tasks[taskName] = task;
    }
    return {
        name,
        tasks, 
        getTasks,
        addTask
    }
}


const projectController = (function() {
    let projects = {};
    
    const addProject = projectToAdd => {
        projects[projectToAdd.name] = projectToAdd;
    }

    const removeProject = projectToDelete => {
        delete projects[projectToDelete.name];
    }

    return {
        projects,
        addProject,
        removeProject
    }
})();

export {projectFactory, projectController} 