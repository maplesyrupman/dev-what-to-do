const app = (() => {
    const projectFactory = (name) => {
        let projectName = name;
        let sublists = {};

        return {
            projectName,
            sublists
        }
    };

    const sublistFactory = (name, parentProject) => {
        let sublistName = name;
        const parent = parentProject;
        let tasks = {};

        return {
            sublistName, 
            parent,
            tasks,
        }
    }

    const taskFactory = (name, dueDate, parentSublist, grandparentProject) => {
        let taskName = name;
        let taskDueDate = dueDate;
        const parent = parentSublist;
        const grandparent = grandparentProject;

        return {
            taskName,
            taskDueDate,
            parent,
            grandparent,
        }
    };

    return {
        projectFactory,
        sublistFactory,
        taskFactory,
    }
})();

export default app