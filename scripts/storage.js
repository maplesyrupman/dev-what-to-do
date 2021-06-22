const storage = (() => {
    let projects = {};

    const addTask = (taskObj, parentSublistName, grandparentProjectName) => {
        projects[grandparentProjectName][parentSublistName].addTask(taskObj);
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

    const simplify = (projects) => {
        let simplifiedProjects = {};
        let projectValues = Object.values(projects);
        for (let value of projectValues) {
            simplifiedProjects[value.getName()] = value.getSimple();
        }
        return simplifiedProjects;
    }

    const saveProjectsToLocal = () => {
        const projects_serialized = JSON.stringify(simplify(projects));
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
        getProjectsFromLocal,
    }
})();

export default storage