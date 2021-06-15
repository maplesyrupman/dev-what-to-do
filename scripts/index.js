import app from './app.js';
import domOps from './DOM.js';
import displayController from './display-controller.js';


let testProject = app.projectFactory('test project');
let testProject2 = app.projectFactory('test project 2');
let testProject3 = app.projectFactory('test project 3');

let sublist1 = app.sublistFactory('sublist 1');
let sublist2 = app.sublistFactory('sublist 2');
let sublist3 = app.sublistFactory('sublist 3');

let task1 = app.taskFactory('test', 'this is a test', 'today');
let task2 = app.taskFactory('another test', 'this is another test', 'tomorrow');

sublist1.addTask(task1);
sublist1.addTask(task2);

testProject.addSublist(sublist1.getName(), sublist1);
testProject.addSublist(sublist2.getName(), sublist2);
testProject.addSublist(sublist3.getName(), sublist3);


let projects = {}
projects[testProject.getName()] = testProject;
projects[testProject2.getName()] = testProject2;
projects[testProject3.getName()] = testProject3; 

let sublistTest = displayController.sublistControllerFactory(sublist1);
sublistTest.createTaskControllers();

