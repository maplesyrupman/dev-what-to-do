import app from './app.js';
import displayController from './display-controller.js';

//Test stuff between these long ass comments ###############################################
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

sublist1.addTask(task1);
sublist1.addTask(task2);
sublist2.addTask(task3);
sublist2.addTask(task4);
sublist2.addTask(task5);

testProject.addSublist(sublist1.getName(), sublist1);
testProject.addSublist(sublist2.getName(), sublist2);
testProject.addSublist(sublist3.getName(), sublist3);
testProject.addSublist(sublist4.getName(), sublist4);


let projects = {}
projects[testProject.getName()] = testProject;
projects[testProject2.getName()] = testProject2;
projects[testProject3.getName()] = testProject3; 



const projectNavController = displayController.projectNavController(projects);
projectNavController.createProjectControllers();
projectNavController.renderProjectNav();


let projectDisplayController = displayController.projectDisplayController(testProject);
projectDisplayController.renderProject();

let testProjectController = projectNavController.getProjectControllers()['test project'];
console.log(testProjectController.activateAddSublistBtn());

//Test stuff between these long ass comments ###############################################