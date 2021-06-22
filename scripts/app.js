const app = (() => {
    const projectFactory = (name) => {
        let projectName = name;
        let sublists = {};
        let simpleSublists = {};
        let simpleProjectObj = {
            'name': projectName,
            'simpleSublists': simpleSublists,
        };

        const changeName = (newName) => {
            projectName = newName;
        }

        const getName = () => {
            return projectName;
        }

        const addSublist = (sublistName, sublistObj) => {
            sublists[sublistName] = sublistObj;
            buildSimpleSublists();
        }

        const removeSublist = (sublistName) => {
            delete sublists[sublistName];
            buildSimpleSublists();
        }

        const getSublists = () => {
            return sublists;
        }

        const buildSimpleSublists = () => {
            let sublistValues = Object.values(sublists);
            for (let value of sublistValues) {
                simpleSublists[value.getName()] = value.getSimple();
            }
        }

        const getSimple = () => {
            return simpleProjectObj;
        }

        return {
            changeName,
            getName,
            addSublist,
            removeSublist,
            getSublists,
            getSimple
        }
    };

    const sublistFactory = (name, parentProject) => {
        let sublistName = name;
        const parent = parentProject;
        let tasks = {};
        let simpleTasks = {}
        let simpleSublistObj = {
            'name': sublistName,
            'parent': parent,
            'simpleTasks': simpleTasks,
        }

        const getName = () => {
            return sublistName;
        }

        const changeName = (newName) => {
            sublistName = newName;
        }

        const getTasks = () => {
            return tasks;
        }

        const addTask = (taskObj) => {
            tasks[taskObj.getName()] = taskObj;
            buildSimpleTasks();
        }

        const removeTask = (taskName) => {
            delete tasks[taskName];
            buildSimpleTasks();
        }

        const getParentName = () => {
            return parent;
        }

        const buildSimpleTasks = () => {
            let taskValues = Object.values(tasks);
            for (let value of taskValues) {
                simpleTasks[value.getName()] = value.getSimple();
            }
        }

        const getSimple = () => {
            return simpleSublistObj;
        }

        return {
            getName,
            changeName,
            getTasks,
            addTask,
            removeTask,
            getParentName,
            getSimple,
        }
    }


    const taskFactory = (name, dueDate, parentSublist, grandparentProject) => {
        let taskName = name;
        let taskDueDate = dueDate;
        const parent = parentSublist;
        const grandparent = grandparentProject;
        let simpleTaskObj = {
            'name': taskName,
            'dueDate': taskDueDate,
            'parent': parent,
            'grandparent': grandparent
        };

        const getName = () => {
            return taskName;
        }

        const changeName = (newName) => {
            taskName = newName;
        }

        const getDueDate = () => {
            return taskDueDate;
        }

        const changeDueDate = (newDueDate) => {
            taskDueDate = newDueDate;
        }

        const getParentName = () => {
            return parent;
        }

        const getGrandparentName = () => {
            return grandparent;
        }

        const getSimple = () => {
            return simpleTaskObj;
        }

        return {
            getName,
            changeName,
            getDueDate,
            changeDueDate,
            getParentName,
            getGrandparentName,
            getSimple
        }
    };

    return {
        projectFactory,
        sublistFactory,
        taskFactory,
    }
})();

export default app