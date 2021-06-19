const storageController = (() => {
    const projects = {};

    const setProjects = (projectsObj) => {
        projects = projectsObj;
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