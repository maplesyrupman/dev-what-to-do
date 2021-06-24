import app from './app.js';
import displayController from './display-controller.js';
import storage from './storage.js';


let testProject = app.projectFactory('test project');
let testProject2 = app.projectFactory('test project 2');
let testProject3 = app.projectFactory('test project 3');

let sublist1 = app.sublistFactory('sublist 1', 'test project');
let sublist2 = app.sublistFactory('sublist 2', 'test project');
let sublist3 = app.sublistFactory('sublist 3', 'test project');
let sublist4 = app.sublistFactory('sublist 4', 'test project');

let task1 = app.taskFactory('test', 'today', 'sublist 1', 'test project');
let task2 = app.taskFactory('another test', 'tomorrow', 'sublist 1', 'test project');

let task3 = app.taskFactory('this test', 'someday', 'sublist 2', 'test project');
let task4 = app.taskFactory('my test', 'yesterday', 'sublist 2', 'test project');
let task5 = app.taskFactory('great test', 'oneday', 'sublist 2', 'test project');


sublist1.tasks[task1.taskName] = task1;
sublist1.tasks[task2.taskName] = task2;
sublist2.tasks[task3.taskName] = task3;
sublist2.tasks[task4.taskName] = task4;
sublist2.tasks[task5.taskName] = task5;

testProject.sublists[sublist1.sublistName] = sublist1;
testProject.sublists[sublist2.sublistName] = sublist2;
testProject.sublists[sublist3.sublistName] = sublist3;
testProject.sublists[sublist4.sublistName] = sublist4;




let projects = {}
projects[testProject.projectName] = testProject;
projects[testProject2.projectName] = testProject2;
projects[testProject3.projectName] = testProject3; 
storage.setProjects(projects);

const projectNavController = displayController.projectNavController(projects);
projectNavController.createProjectControllers();
projectNavController.renderProjectNav();
projectNavController.activateAddProjectBtn();


let projectDisplayController = displayController.projectDisplayController(testProject);
projectDisplayController.renderProject();

let testProjectController = projectNavController.getProjectControllers()['test project'];

