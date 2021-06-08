import app from './app.js';
import domOps from './DOM.js';


let testProject = app.projectFactory('test project');
let testProject2 = app.projectFactory('test project 2');
let testProject3 = app.projectFactory('test project 3');

let sublist1 = app.subListFactory('sublist 1');
let sublist2 = app.subListFactory('sublist 2');
let sublist3 = app.subListFactory('sublist 3');

testProject.addSubList(sublist1.getName(), sublist1);
testProject2.addSubList(sublist2.getName(), sublist2);
testProject3.addSubList(sublist3.getName(), sublist3);


let projects = {}
projects[testProject.getName()] = testProject;
projects[testProject2.getName()] = testProject2;
projects[testProject3.getName()] = testProject3; 
console.log(projects);

domOps.displayProjectNav(projects);

document.getElementById('add-project-btn');




