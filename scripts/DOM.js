const domOps = (() => {
    const projectNavTabs = document.getElementById('project-nav-tabs');
    const projectDisplay = document.getElementById('project-display');
    let newProjectFormIsDisplayed = false;

    const displayProjectNav = (projects) => {
        for (let key in projects) {
            const projectTabDiv = document.createElement('div');
            projectTabDiv.classList.add('project-tab-div');
            projectTabDiv.setAttribute('id', projects[key].getName());

            const projectTabName = document.createElement('h3');
            projectTabName.classList.add('project-tab-name');
            projectTabName.textContent = projects[key].getName();

            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('buttonDiv');

            const projectTabEditBtn = document.createElement('button');
            projectTabEditBtn.innerHTML = '<i class="fas fa-pen"></i>';
            projectTabEditBtn.classList.add('project-tab-edit-btn');

            const projectTabDeleteBtn = document.createElement('button');
            projectTabDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            projectTabDeleteBtn.dataset.project = projects[key].getName();
            projectTabDeleteBtn.classList.add('project-tab-delete-btn');
            projectTabDeleteBtn.addEventListener('click', () => {
                deleteProjectTab(projects[key].getName());
                delete projects[projects[key].getName()];
            });

            projectTabDiv.appendChild(projectTabName);
            buttonDiv.appendChild(projectTabEditBtn);
            buttonDiv.appendChild(projectTabDeleteBtn);
            projectTabDiv.appendChild(buttonDiv);
            projectNavTabs.appendChild(projectTabDiv);

        }
    }

    const createNewProjectForm = () => {
        let newProjectFormDiv = document.createElement('div');
        newProjectFormDiv.setAttribute('id', 'newProjectFormDiv');
        newProjectFormDiv.classList.add('project-tab-div');

        let newProjectForm = document.createElement('form');
        let newProjectNameField = document.createElement('input');
        newProjectNameField.setAttribute('id', 'newProjectNameField');
        newProjectNameField.setAttribute('type', 'text');
        newProjectNameField.setAttribute('name', 'newProjectName');
        newProjectNameField.setAttribute('placeholder', 'New Project');

        let buttonDiv = document.createElement('div');
        let createProjectBtn = document.createElement('button');
        createProjectBtn.setAttribute('id', 'confirmNewProjectBtn');
        createProjectBtn.innerHTML = '<i class="fas fa-check"></i>';
        createProjectBtn.classList.add('create-btn');
        let cancleProjectBtn = document.createElement('button');
        cancleProjectBtn.setAttribute('id', 'cancleNewProjectBtn');
        cancleProjectBtn.innerHTML = '<i class="fas fa-times"></i>';
        cancleProjectBtn.classList.add('cancle-btn');
        buttonDiv.appendChild(createProjectBtn);
        buttonDiv.appendChild(cancleProjectBtn);

        newProjectForm.appendChild(newProjectNameField);
        newProjectFormDiv.appendChild(newProjectForm);
        newProjectFormDiv.appendChild(buttonDiv);

        return newProjectFormDiv;
    }

    const displayNewProjectForm = () => {
        if (!newProjectFormIsDisplayed) {
            projectNavTabs.appendChild(createNewProjectForm());
            newProjectFormIsDisplayed = true;
        }
        else {
            alert('Please finish creating the Project you have already started before creating a new one.');
        }
    }

    const removeNewProjectForm = () => {
        let newProjectFormDiv = document.getElementById('newProjectFormDiv');
        newProjectFormDiv.remove();
        newProjectFormIsDisplayed = false;
    }

    const createNewProjectTab = (projectName, projects) => {
        const projectTabDiv = document.createElement('div');
            projectTabDiv.classList.add('project-tab-div');
            projectTabDiv.setAttribute('id', projectName);

            const projectTabName = document.createElement('h3');
            projectTabName.classList.add('project-tab-name');
            projectTabName.textContent = projectName;

            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('buttonDiv');

            const projectTabEditBtn = document.createElement('button');
            projectTabEditBtn.innerHTML = '<i class="fas fa-pen"></i>';
            projectTabEditBtn.classList.add('project-tab-edit-btn');

            const projectTabDeleteBtn = document.createElement('button');
            projectTabDeleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            projectTabDeleteBtn.dataset.project = projectName;
            projectTabDeleteBtn.classList.add('project-tab-delete-btn');
            projectTabDeleteBtn.addEventListener('click', () => {
                deleteProjectTab(projectName);
                delete projects[projectName];
            });

            projectTabDiv.appendChild(projectTabName);
            buttonDiv.appendChild(projectTabEditBtn);
            buttonDiv.appendChild(projectTabDeleteBtn);
            projectTabDiv.appendChild(buttonDiv);
            projectNavTabs.appendChild(projectTabDiv);
    }

    const deleteProjectTab = (projectName) => {
        let toDelete = document.getElementById(projectName);
        toDelete.remove();
    }

    const createSublist = (sublist) => {
        const sublistDiv = document.createElement('div');
        sublistDiv.classList.add('sublist-div');
        const sublistTitle = document.createElement('h4');
        sublistTitle.textContent = sublist.getName();
        sublistTitle.classList.add('sublist-title');
        sublistDiv.appendChild(sublistTitle);
        
        return sublistDiv;
    }

    const displaySublists = (projectName, projects) => {
        let project = projects[projectName];
        let sublists = project.getSublists();

        for (let i=0; i<sublists.length; i++) {
            let sublist = sublists[i];
            projectDisplay.appendChild(createSublist(sublist));
        }
    }

    return {
        displayProjectNav,
        displayNewProjectForm,
        removeNewProjectForm,
        createNewProjectTab,
        deleteProjectTab,
        displaySublists
    }

})();

export default domOps