const storageController = (() => {
    const projects = {};

    const addTask = (taskObj, parentSublistName, grandparentProjectName) => {
        projects[grandparentProjectName][parentSublistName].addTask(taskObj);
    }

    const deleteTask = (taskName, parentSublistName, grandparentProjectName) => {
        delete projects[grandparentProjectName][parentSublistName][taskName];
    }

    const addSublist = (sublistObj, parentProjectName) => {
        projects[parentProjectName].addSublist(sublistObj);
    }

    const deleteSublist = (sublistName, parentProjectName) => {
        delete projects[parentProjectName][sublistName];
    }

    const addProject = (projectObj, projectName) => {
        projects[projectName] = projectObj;
    }

    const deleteProject = (projectName) => {
        delete projects[projectName];
    }

    const getProjects = () => {
        return projects;
    }

    const saveProjectsToLocal = () => {
        const projects_serialized = JSON.stringify(projects);
        localStorage.setItem('projects', projects_serialized);
    }

    const getProjectsFromLocal = () => {
        const retrievedProjects = localStorage.getItem('projects');
        if (retrievedProjects == null) {
            return {};
        }
        return JSON.parse(retrievedProjects);
    }

    return {
        addTask, 
        deleteTask,
        addSublist,
        deleteSublist,
        addProject, 
        deleteProject,
        getProjects,
        saveProjectsToLocal,
        getProjectsFromLocal,
    }
})();

export default storageController