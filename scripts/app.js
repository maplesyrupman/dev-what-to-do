const app = (()=> {
    const projectFactory = (name) => {
        let projectName = name;
        let sublists = {};
    
        const changeName = (newName) => {
            projectName = newName;
        }
    
        const getName = () => {
            return projectName;
        }

        const addSublist = (sublistName, sublistObj) => {
            sublists[sublistName] = sublistObj;
        }

        const removeSublist = (sublistName) => {
            delete sublists[sublistName];
        }

        const getSublists = () => {
            return sublists;
        }
    
        return {
            changeName,
            getName,
            addSublist, 
            removeSublist, 
            getSublists, 
        }
    };

    const sublistFactory = (name, parentProject) => {
        let sublistName = name;
        const parent = parentProject;
        let tasks = {};

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
        }
    
        const removeTask = (taskName) => {
            delete tasks[taskName];
        }

        const getParentName = () => {
            return parent;
        }

        return {
            getName, 
            changeName,
            getTasks, 
            addTask, 
            removeTask,
            getParentName,
        }
    }


    const taskFactory = (name, dueDate, parentSublist) => {
        let taskName = name;
        let taskDueDate = dueDate;
        let completed = false;
        const parent = parentSublist;

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
    
        const toggleCompleted = () => {
            completed = (completed == false) ? 
            true :
            false;
        }

        const getParentName = () => {
            return parent;
        }
    
        return {
            getName, 
            changeName, 
            getDueDate, 
            changeDueDate, 
            toggleCompleted,
            getParentName,
        }
    };

    return {
        projectFactory,
        sublistFactory,
        taskFactory,
    }
})();

export default app