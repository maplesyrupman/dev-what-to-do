const storage = (() => {
    let projects = {};

    const addTask = (taskObj, parentSublistName, grandparentProjectName) => {
        projects[grandparentProjectName][parentSublistName][taskObj.taskName] = taskObj;
        saveProjectsToLocal();
    }

    const deleteTask = (taskName, parentSublistName, grandparentProjectName) => {
        delete projects[grandparentProjectName][parentSublistName][taskName];
        saveProjectsToLocal();
    }

    const addSublist = (sublistObj, parentProjectName) => {
        projects[parentProjectName].addSublist(sublistObj);
        saveProjectsToLocal();
    }

    const deleteSublist = (sublistName, parentProjectName) => {
        delete projects[parentProjectName][sublistName];
        saveProjectsToLocal();
    }

    const addProject = (projectObj, projectName) => {
        projects[projectName] = projectObj;
        saveProjectsToLocal();
    }

    const deleteProject = (projectName) => {
        delete projects[projectName];
        saveProjectsToLocal();
    }

    const getProjects = () => {
        return projects;
    }

    const setProjects = (projectsObj) => {
        projects = projectsObj;
        saveProjectsToLocal();
    }

    const saveProjectsToLocal = () => {
        const projects_serialized = JSON.stringify(projects);
        localStorage.setItem('projects', projects_serialized);
    }

    const getProjectsFromLocal = () => {
        const retrievedProjects = localStorage.getItem('projects');
        if (retrievedProjects == null) {
            projects = {};
        }
        projects = JSON.parse(retrievedProjects);
    }

    return {
        addTask, 
        deleteTask,
        addSublist,
        deleteSublist,
        addProject, 
        deleteProject,
        getProjects,
        setProjects,
        getProjectsFromLocal,
    }
})();

export default storage