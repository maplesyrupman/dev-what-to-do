const storageController = (() => {
    const projects = {};

    const addTask = (taskObj, parentSublistName, grandparentProjectName) => {
        projects[grandParentProjectName][parentSublistName].addTask(taskObj);
    }

    const addSublist = (sublistObj, parentProjectName) => {
        projects[parentProjectName].addSublist(sublistObj);
    }

    const returnProjects = () => {
        return projects;
    }

    const saveProjects = () => {

    }

    const fetchProjectsFromLocal = () => {

    }

    const addTask = (parentProject, parentSublist, taskObj) => {
        projects[parentProject.getName()][parentSublist.getName()].addTask(taskObj);
        saveProjects();
    }
})();