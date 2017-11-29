'use strict'

var body = document.body;

var headerSection = getCreateElement('section');
headerSection.className = 'todo';

// Body child elements
var sidePanel = getCreateElement('div');
sidePanel.className = 'side-panel';
var sidePanelTitle = getCreateElement('h2');
sidePanelTitle.className = 'sec-title';
sidePanelTitle.textContent = 'Todo';

var middlePanel = getCreateElement('div');
middlePanel.className = 'middle-panel';
var middlePanelTitle = getCreateElement('h2');
middlePanelTitle.className = 'sec-title';
middlePanelTitle.textContent = 'Todo';

body.appendChild(headerSection);
headerSection.appendChild(sidePanel);
headerSection.appendChild(middlePanel);

// Side panel elements
var sidePanelContent = getCreateElement('div');
sidePanelContent.className = 'list-container';
var sideMenuList = getCreateElement('ul');
var listMenuItem = {
				name: '',
				subtasks: []
			};
var listMenuItems = [];
var sidePanelAddTask = getCreateElement('div');
sidePanelAddTask.className = 'panel-bottom';
var addTaskButton = getCreateElement('button');
addTaskButton.id = 'add-task';
var addTaskIcon = getCreateElement('i');
addTaskIcon.className = 'fa fa-plus-circle';
addTaskButton.appendChild(addTaskIcon);
sidePanelAddTask.appendChild(addTaskButton);


sidePanel.appendChild(sidePanelTitle);
sidePanelContent.appendChild(sideMenuList);
sidePanel.appendChild(sidePanelContent);
sidePanel.appendChild(sidePanelAddTask);

// Middle panel elements
var middlePanelContent = getCreateElement('div');
middlePanelContent.className = 'middle-panel-container';

var subTaskContent = getCreateElement('div');
subTaskContent.className = 'sub-task-container';

var descriptionContent = getCreateElement('div');
descriptionContent.className = 'description-container';

middlePanel.appendChild(middlePanelTitle);
middlePanelContent.appendChild(subTaskContent);
middlePanelContent.appendChild(descriptionContent);
middlePanel.appendChild(middlePanelContent);

addTaskButton.addEventListener('click', addTask);

// Create element by passing element
function getCreateElement(element) {
	return document.createElement(element);
}

// Get element by passing selector
function getQuerySelector(selector) {
	return document.querySelector(selector);
}

// Get element by passing selector
function addTask() {
	try {
		if (!listMenuItems) {
			throw new UserException('Menu list not found');
		}
		if(listMenuItems.length > 14) {
			alert('Task limit exceeds');
			return false;
		}
		var sideMenuItem = getCreateElement('li');
		var menuItem = {name: '', subtasks: []};
		var taskInput = getCreateElement('input');
		taskInput.id = 'task-'+listMenuItems.length;
		taskInput.value = menuItem.name;
		taskInput.placeholder = 'Enter Task '+(listMenuItems.length + 1);
		taskInput.setAttribute('onclick', 'changeTask(event)');
		listMenuItems.push(menuItem);
		sideMenuItem.appendChild(taskInput);
		sideMenuList.appendChild(sideMenuItem);
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function changeTask(event) {
	try {
		var id = event.target.id.substring(5);
		listMenuItems[id].name = event.target.value;
		middlePanelTitle.textContent = listMenuItems[id].name;
		if (!listMenuItems[id].name) {
			middlePanelTitle.textContent = 'Enter Task '+(parseInt(id) + 1);
		}
		subTaskContent.innerHTML = '';
		showTaskDetail(id);
		getQuerySelector('.description-container').style.display = 'none';
		event.target.onkeyup = function() {
			listMenuItems[id].name = event.target.value;
			middlePanelTitle.textContent = listMenuItems[id].name;
			if (!listMenuItems[id].name) {
				middlePanelTitle.textContent = 'Enter Task '+ (parseInt(id) + 1);
			}
		}
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function showTaskDetail(id) {
	try {
		var subtaskItems = listMenuItems[id].subtasks;
		var subtasksList = getCreateElement('div');
		subtasksList.className = 'subtask-list';
		var middlePanelAddTask = getCreateElement('div');
		middlePanelAddTask.className = 'panel-bottom';
		var addSubTaskInput = getCreateElement('input');
		addSubTaskInput.id = 'sub-task-input';
		addSubTaskInput.placeholder = 'Enter your sub task here ...';
		var addSubTaskButton = getCreateElement('button');
		addSubTaskButton.id = 'add-sub-task';
		addSubTaskButton.setAttribute('onclick', 'addNewSubtask(event, '+id+')');
		var addSubTaskIcon = getCreateElement('i');
		addSubTaskIcon.className = 'fa fa-plus-circle';
		subtaskItems.forEach(function(subtaskItem, index){
			subtasksList.appendChild(createSubtask(subtaskItem, index, id));
		});
		subTaskContent.appendChild(subtasksList);
		addSubTaskButton.appendChild(addSubTaskIcon);
		middlePanelAddTask.appendChild(addSubTaskInput);
		middlePanelAddTask.appendChild(addSubTaskButton);
		subtasksList.appendChild(middlePanelAddTask);
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function addNewSubtask(event, id) {
	try {
		if (!listMenuItems) {
			throw new UserException('Sub task list not found');
		}
		if(listMenuItems[id].subtasks.length > 6) {
			alert('Sub task limit exceeds');
			return false;
		}
		var value = getQuerySelector('#sub-task-input').value;
		var newIndex = listMenuItems[id].subtasks.length;
		if (value) {
			var subTaskItemObject = {name: value, description: '', comments: [], createdAt: new Date()};
			listMenuItems[id].subtasks.push(subTaskItemObject);
			getQuerySelector('.subtask-list').appendChild(createSubtask(subTaskItemObject, newIndex, id));
			document.getElementById('sub-task-card-'+newIndex).onmouseover();
			document.getElementById('sub-task-card-'+newIndex).onmouseout();
			getQuerySelector('#sub-task-input').value = '';
		}
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function createSubtask(subtask, index, id) {
	try {
		var subtaskItem = getCreateElement('div');
		subtaskItem.className = 'sub-task-card';
		subtaskItem.id = 'sub-task-card-'+index;
		subtaskItem.setAttribute('onmouseover', 'showActionIcons('+index+', '+id+')');
		subtaskItem.setAttribute('onmouseout', 'hideActionIcons('+index+', '+id+')');
		var subtaskItemCheckbox = getCreateElement('input');
		subtaskItemCheckbox.id = 'subtask-'+index;
		subtaskItemCheckbox.name = 'subtask';
		subtaskItemCheckbox.type = 'checkbox';
		subtaskItemCheckbox.value = index;
		var subtaskItemLabel = getCreateElement('label');
		subtaskItemLabel.textContent = subtask.name;
		var subtaskItemAction = getCreateElement('span');
		subtaskItemAction.className = 'action-icon-'+index;
		var removeIcon = getCreateElement('i');
		removeIcon.className = 'fa fa-check';
		removeIcon.setAttribute('onclick', 'completeTask('+index+', '+id+')');
		var doneIcon = getCreateElement('i');
		doneIcon.className = 'fa fa-close';
		doneIcon.setAttribute('onclick', 'removeTask('+index+', '+id+')');
		var createdDate = getCreateElement('span');
		createdDate.textContent = 'Created on: '+subtask.createdAt.toLocaleString();
		createdDate.className = 'created-at';
		subtaskItemAction.appendChild(removeIcon);
		subtaskItemAction.appendChild(doneIcon);
		subtaskItem.appendChild(subtaskItemCheckbox);
		subtaskItem.appendChild(subtaskItemLabel);
		subtaskItem.appendChild(subtaskItemAction);
		subtaskItem.appendChild(createdDate);
		return subtaskItem;
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function showActionIcons(index, id) {
	try {
		var showIcon = getQuerySelector('.action-icon-'+index);
		showIcon.style.display = 'inline-block';
		descriptionContent.innerHTML = '';
		showSubTaskDetails(index, id);
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function hideActionIcons(index, id) {
	try {
		var hideIcon = getQuerySelector('.action-icon-'+index);
		hideIcon.style.display = 'none';
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function removeTask(index, id) {
	try {
		listMenuItems[id].subtasks.splice(index, 1);
		document.getElementById('sub-task-card-'+index).remove();
		getQuerySelector('.description-container').style.display = 'none';
		subTaskContent.innerHTML = '';
		showTaskDetail(id);
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function completeTask(index, id) {
	try {
		var labelStrike = document.getElementById('subtask-'+index).nextSibling;
		labelStrike.style.textDecoration='line-through';
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function showSubTaskDetails(index, id) {
	try {
		getQuerySelector('.description-container').style.display = 'inline-block';
		var showSubTaskDetail = getCreateElement('div');
		showSubTaskDetail.className = 'subtask-detail';
		var subTaskTextBox = getCreateElement('textarea');
		subTaskTextBox.id = 'description';
		subTaskTextBox.rows = 5;
		subTaskTextBox.placeholder = 'Enter your description here ...';
		subTaskTextBox.setAttribute('onchange', 'updateDescription('+index+', '+id+', event)');
		subTaskTextBox.value = listMenuItems[id].subtasks[index].description;
		var middlePanelAddTask = getCreateElement('div');
		middlePanelAddTask.className = 'panel-bottom';
		var commentInput = getCreateElement('input');
		commentInput.id = 'add-comment-input';
		commentInput.placeholder = 'Comment here ...';
		var addSubTaskButton = getCreateElement('button');
		addSubTaskButton.id = 'add-comment';
		addSubTaskButton.setAttribute('onclick', 'postComment('+index+', '+id+')');
		var addSubTaskIcon = getCreateElement('i');
		addSubTaskIcon.className = 'fa fa-commenting';


		middlePanelAddTask.appendChild(commentInput);
		addSubTaskButton.appendChild(addSubTaskIcon);
		middlePanelAddTask.appendChild(addSubTaskButton);

		showSubTaskDetail.appendChild(subTaskTextBox);
		descriptionContent.appendChild(showSubTaskDetail);
		var comments = listMenuItems[id].subtasks[index].comments;
		comments.forEach(function(commment){
			var commentItem = getCreateElement('div');
			commentItem.className = 'comment-item';
			var commentItemText = getCreateElement('p');
			commentItemText.textContent = commment.text;
			var commentedDate = getCreateElement('span');
			commentedDate.className = 'created-at';
			commentedDate.textContent = commment.commentedAt.toLocaleString();
			commentItem.appendChild(commentItemText);
			commentItem.appendChild(commentedDate);
			descriptionContent.appendChild(commentItem);
		});
		descriptionContent.appendChild(middlePanelAddTask);
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function updateDescription(index, id, event) {
	try {
		listMenuItems[id].subtasks[index].description = event.target.value;
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}

function postComment(index, id) {
	try {
		if (!listMenuItems[id].subtasks[index].comments) {
			throw new UserException('Comments record not found');
		}
		if(listMenuItems[id].subtasks[index].comments.length > 10) {
			alert('Sub task limit exceeds');
			return false;
		}
		var value = getQuerySelector('#add-comment-input').value;
		if (value) {
			var commment = {text: value, commentedAt: new Date()}
			listMenuItems[id].subtasks[index].comments.push(commment);
			var commentItem = getCreateElement('div');
			commentItem.className = 'comment-item';
			var commentItemText = getCreateElement('p');
			commentItemText.textContent = value;
			var commentedDate = getCreateElement('span');
			commentedDate.className = 'created-at';
			commentedDate.textContent = commment.commentedAt.toLocaleString();
			commentItem.appendChild(commentItemText);
			commentItem.appendChild(commentedDate);
			var subtaskDetail = getQuerySelector('.subtask-detail');
			subtaskDetail.appendChild(commentItem);
			getQuerySelector('#add-comment-input').value = '';
		} else {
			throw new UserException('Comment input value is empty');
		}
	} catch (execption) {
		console.log(execption.message, execption.name);
	}
}
 
function UserException(message) {
   this.message = message;
   this.name = 'UserException';
}
window.onload = function() {
	addTask();
	document.getElementById('task-0').click();
}