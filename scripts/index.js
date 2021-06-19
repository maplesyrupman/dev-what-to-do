import app from './app.js';
import displayController from './display-controller.js';

//Test stuff between these long ass comments ###############################################
let testProject = app.projectFactory('test project');
let testProject2 = app.projectFactory('test project 2');
let testProject3 = app.projectFactory('test project 3');

let sublist1 = app.sublistFactory('sublist 1');
let sublist2 = app.sublistFactory('sublist 2');
let sublist3 = app.sublistFactory('sublist 3');

let task1 = app.taskFactory('test', 'this is a test', 'today');
let task2 = app.taskFactory('another test', 'this is another test', 'tomorrow');

let task3 = app.taskFactory('this test', 'blah blah blah', 'someday');
let task4 = app.taskFactory('my test', 'a test task', 'yesterday');
let task5 = app.taskFactory('great test', 'a great test task', 'oneday');

sublist1.addTask(task1);
sublist1.addTask(task2);
sublist2.addTask(task3);
sublist2.addTask(task4);
sublist2.addTask(task5);

testProject.addSublist(sublist1.getName(), sublist1);
testProject.addSublist(sublist2.getName(), sublist2);
testProject.addSublist(sublist3.getName(), sublist3);


let projects = {}
projects[testProject.getName()] = testProject;
projects[testProject2.getName()] = testProject2;
projects[testProject3.getName()] = testProject3; 



const projectNavController = displayController.projectNavController(projects);
projectNavController.createProjectControllers();
projectNavController.renderProjectNav();




let project1 = projectNavController.getProjectControllers()['test project'];
project1.renderProject();




//Test stuff between these long ass comments ###############################################