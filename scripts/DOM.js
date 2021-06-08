const domOps = (() => {
    const projectNavTabs = document.getElementById('project-nav-tabs');
    const projectDisplay = document.getElementById('project-display');

    const displayProjectNav = (projects) => {
        for (let key in projects) {
            const projectTabDiv = document.createElement('div');
            projectTabDiv.classList.add('project-tab-div');
            projectTabDiv.dataset.project = projects[key].getName();

            const projectTabName = document.createElement('h3');
            projectTabName.classList.add('project-tab-name');
            projectTabName.textContent = projects[key].getName();

            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('buttonDiv');

            const projectTabEditBtn = document.createElement('button');
            projectTabEditBtn.classList.add('project-tab-edit-btn');

            const projectTabDeleteBtn = document.createElement('button');
            projectTabDeleteBtn.classList.add('project-tab-delete-btn');

            projectTabDiv.appendChild(projectTabName);
            buttonDiv.appendChild(projectTabEditBtn);
            buttonDiv.appendChild(projectTabDeleteBtn);
            projectTabDiv.appendChild(buttonDiv);
            projectNavTabs.appendChild(projectTabDiv);

        }
    }

    const createNewProjectForm = () => {
        let newProjectFormDiv = doucment.createElement('div');
        newProjectFormDiv.classList.add('project-tab-div');

        let newProjectForm = document.createElement('form');
        let newProjectNameField = document.createElement('input');
        newProjectNameField.setAttribute('type', 'text');
        newProjectNameField.setAttribute('name', 'newProjectName');
        newProjectNameField.setAttribute('placeholder', 'New Project');

        let createBtn = document.createElement('button');
        let cancelBtn = document.createElement('button');
    }

    return {
        displayProjectNav,
    }

})();

export default domOps