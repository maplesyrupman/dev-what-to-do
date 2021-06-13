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

        const removeSublist = (subListName) => {
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

    const sublistFactory = (name) => {
        let sublistName = name;
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
    
        const addTask = (taskName, taskObj) => {
            tasks[taskName] = taskObj;
        }
    
        const removeTask = (taskName) => {
            delete tasks[taskName];
        }

        return {
            getName, 
            changeName,
            getTasks, 
            addTask, 
            removeTask
        }
    }


    const taskFactory = (name, description, dueDate) => {
        let taskName = name;
        let taskDescription = description;
        let taskDueDate = dueDate;
        let completed = false;
    
        const getName = () => {
            return taskName;
        }
    
        const changeName = (newName) => {
            taskName = newName;
        }
    
        const getDescription = () => {
            return taskDescription;
        }
    
        const changeDescription = (newDescription) => {
            taskDescription = newDescription;
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
    
        return {
            getName, 
            changeName, 
            getDescription, 
            changeDescription, 
            getDueDate, 
            changeDueDate, 
            toggleCompleted
        }
    };

    return {
        projectFactory,
        sublistFactory,
        taskFactory,
    }
})();

export default app