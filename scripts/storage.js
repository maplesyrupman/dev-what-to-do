const storage = (() => {
    let projects = {};

    const addTask = (taskObj, parentSublistName, grandparentProjectName) => {
        projects[grandparentProjectName].sublists[parentSublistName].tasks[taskObj.taskName] = taskObj;
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const deleteTask = (taskName, parentSublistName, grandparentProjectName) => {
        delete projects[grandparentProjectName][parentSublistName][taskName];
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const addSublist = (sublistObj, parentProjectName) => {
        projects[parentProjectName].sublists[sublistObj.sublistName] = sublistObj;
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const deleteSublist = (sublistName, parentProjectName) => {
        delete projects[parentProjectName][sublistName];
        saveProjectsToLocal();
        getProjectsFromLocal();
    }

    const addProject = (projectObj, projectName) => {
        projects[projectName] = projectObj;
        saveProjectsToLocal();
        getProjectsFromLocal();
        console.log(projects);
    }

    const deleteProject = (projectName) => {
        delete projects[projectName];
        saveProjectsToLocal();
        getProjectsFromLocal();
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