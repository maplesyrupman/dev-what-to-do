const app = (()=> {
    const projectFactory = (name) => {
        let projectName = name;
        let subLists = {};
    
        const changeName = (newName) => {
            projectName = newName;
        }
    
        const getName = () => {
            return projectName;
        }

        const addSubList = (subListName, subListObj) => {
            subLists[subListName] = subListObj;
        }

        const removeSubList = (subListName) => {
            delete subLists[subListName];
        }

        const getSubLists = () => {
            return subLists;
        }
    
        return {
            changeName,
            getName,
            addSubList, 
            removeSubList, 
            getSubLists, 
        }
    };

    const subListFactory = (name) => {
        let subListName = name;
        let tasks = {};

        const getName = () => {
            return subListName;
        }

        const changeName = (newName) => {
            subListName = newName;
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
        subListFactory,
        taskFactory,
    }
})();

export default app