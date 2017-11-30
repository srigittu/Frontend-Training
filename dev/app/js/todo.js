'use strict'

var body = document.body;
var headerSection = getCreateElement('section');
var sidePanel = getCreateElement('div');
var sidePanelTitle = getCreateElement('h2');
var middlePanel = getCreateElement('div');
var middlePanelTitle = getCreateElement('h2');
var sidePanelContent = getCreateElement('div');
var sideMenuList = getCreateElement('ul');
var sidePanelAddTask = getCreateElement('div');
var addTaskButton = getCreateElement('button');
var addTaskIcon = getCreateElement('i');
var middlePanelContent = getCreateElement('div');
var subTaskContent = getCreateElement('div');
var descriptionContent = getCreateElement('div');
var listMenuItems = [];

// Body child elements
addTaskButton.id = 'add-task';
sidePanel.className = 'side-panel';
headerSection.className = 'todo';
sidePanelTitle.className = 'sec-title';
middlePanel.className = 'middle-panel';
middlePanelTitle.className = 'sec-title';
sidePanelContent.className = 'list-container';
sidePanelAddTask.className = 'panel-bottom';
addTaskIcon.className = 'fa fa-plus-circle';
middlePanelContent.className = 'middle-panel-container';
subTaskContent.className = 'sub-task-container';
descriptionContent.className = 'description-container';
sidePanelTitle.textContent = 'Todo';
middlePanelTitle.textContent = 'Todo';

// Body panel elements
body.insertBefore(headerSection, body.firstChild);
headerSection.appendChild(sidePanel);
headerSection.appendChild(middlePanel);


// Side panel elements
addTaskButton.appendChild(addTaskIcon);
sidePanelAddTask.appendChild(addTaskButton);
sidePanel.appendChild(sidePanelTitle);
sidePanelContent.appendChild(sideMenuList);
sidePanel.appendChild(sidePanelContent);
sidePanel.appendChild(sidePanelAddTask);

// Middle panel elements
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
        if (listMenuItems.length > 14) {
            alert('Task limit exceeds');
            return false;
        }
        var sideMenuItem = getCreateElement('li');
        var menuItem = { name: '', subtasks: [] };
        var taskInput = getCreateElement('input');
        taskInput.id = 'task-' + listMenuItems.length;
        taskInput.value = menuItem.name;
        taskInput.placeholder = 'Enter Task ' + (listMenuItems.length + 1);
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
            middlePanelTitle.textContent = 'Enter Task ' + (parseInt(id) + 1);
        }
        subTaskContent.innerHTML = '';
        showTaskDetail(id);
        getQuerySelector('.description-container').style.display = 'none';
        event.target.onkeyup = function() {
            listMenuItems[id].name = event.target.value;
            middlePanelTitle.textContent = listMenuItems[id].name;
            if (!listMenuItems[id].name) {
                middlePanelTitle.textContent = 'Enter Task ' + (parseInt(id) + 1);
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
        var middlePanelAddTask = getCreateElement('div');
        var addSubTaskInput = getCreateElement('input');
        var addSubTaskButton = getCreateElement('button');
        var addSubTaskIcon = getCreateElement('i');

        addSubTaskInput.id = 'sub-task-input';
        addSubTaskButton.id = 'add-sub-task';
        subtasksList.className = 'subtask-list';
        middlePanelAddTask.className = 'panel-bottom';
        addSubTaskIcon.className = 'fa fa-plus-circle';
        addSubTaskInput.placeholder = 'Enter your sub task here ...';
        addSubTaskButton.setAttribute('onclick', 'addNewSubtask(event, ' + id + ')');

        subtaskItems.forEach(function(subtaskItem, index) {
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
        if (listMenuItems[id].subtasks.length > 6) {
            alert('Sub task limit exceeds');
            return false;
        }
        var value = getQuerySelector('#sub-task-input').value;
        var newIndex = listMenuItems[id].subtasks.length;
        if (value) {
            var subTaskItemObject = { name: value, description: '', comments: [], createdAt: new Date() };
            listMenuItems[id].subtasks.push(subTaskItemObject);
            getQuerySelector('.subtask-list').appendChild(createSubtask(subTaskItemObject, newIndex, id));
            document.getElementById('sub-task-card-' + newIndex).onmouseover();
            document.getElementById('sub-task-card-' + newIndex).onmouseout();
            getQuerySelector('#sub-task-input').value = '';
        }
    } catch (execption) {
        console.log(execption.message, execption.name);
    }
}

function createSubtask(subtask, index, id) {
    try {
        var subtaskItem = getCreateElement('div');
        var subtaskItemCheckbox = getCreateElement('input');
        var subtaskItemLabel = getCreateElement('label');
        var subtaskItemAction = getCreateElement('span');
        var removeIcon = getCreateElement('i');
        var doneIcon = getCreateElement('i');
        var createdDate = getCreateElement('span');

        subtaskItem.id = 'sub-task-card-' + index;
        subtaskItemCheckbox.id = 'subtask-' + index;
        subtaskItem.className = 'sub-task-card';
        createdDate.className = 'created-at';
        removeIcon.className = 'fa fa-check';
        doneIcon.className = 'fa fa-close';
        subtaskItemAction.className = 'action-icon-' + index;
        subtaskItemCheckbox.name = 'subtask';
        subtaskItemCheckbox.type = 'checkbox';
        subtaskItemLabel.textContent = subtask.name;
        createdDate.textContent = 'Created on: ' + subtask.createdAt.toLocaleString();
        subtaskItemCheckbox.value = index;
        subtaskItem.setAttribute('onmouseover', 'showActionIcons(' + index + ', ' + id + ')');
        subtaskItem.setAttribute('onmouseout', 'hideActionIcons(' + index + ', ' + id + ')');
        removeIcon.setAttribute('onclick', 'completeTask(' + index + ', ' + id + ')');
        doneIcon.setAttribute('onclick', 'removeTask(' + index + ', ' + id + ')');

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
        var showIcon = getQuerySelector('.action-icon-' + index);
        showIcon.style.display = 'inline-block';
        descriptionContent.innerHTML = '';
        showSubTaskDetails(index, id);
    } catch (execption) {
        console.log(execption.message, execption.name);
    }
}

function hideActionIcons(index, id) {
    try {
        var hideIcon = getQuerySelector('.action-icon-' + index);
        hideIcon.style.display = 'none';
    } catch (execption) {
        console.log(execption.message, execption.name);
    }
}

function removeTask(index, id) {
    try {
        listMenuItems[id].subtasks.splice(index, 1);
        document.getElementById('sub-task-card-' + index).remove();
        getQuerySelector('.description-container').style.display = 'none';
        subTaskContent.innerHTML = '';
        showTaskDetail(id);
    } catch (execption) {
        console.log(execption.message, execption.name);
    }
}

function completeTask(index, id) {
    try {
        var labelStrike = document.getElementById('subtask-' + index).nextSibling;
        labelStrike.style.textDecoration = 'line-through';
    } catch (execption) {
        console.log(execption.message, execption.name);
    }
}

function showSubTaskDetails(index, id) {
    try {
        getQuerySelector('.description-container').style.display = 'inline-block';
        var showSubTaskDetail = getCreateElement('div');
        var subTaskTextBox = getCreateElement('textarea');
        var middlePanelAddTask = getCreateElement('div');
        var commentInput = getCreateElement('input');
        var addSubTaskButton = getCreateElement('button');
        var addSubTaskIcon = getCreateElement('i');
        var comments = listMenuItems[id].subtasks[index].comments;

        subTaskTextBox.id = 'description';
        commentInput.id = 'add-comment-input';
        addSubTaskButton.id = 'add-comment';
        showSubTaskDetail.className = 'subtask-detail';
        middlePanelAddTask.className = 'panel-bottom';
        addSubTaskIcon.className = 'fa fa-commenting';
        subTaskTextBox.placeholder = 'Enter your description here ...';
        commentInput.placeholder = 'Comment here ...';
        subTaskTextBox.rows = 5;
        subTaskTextBox.value = listMenuItems[id].subtasks[index].description;
        subTaskTextBox.setAttribute('onchange', 'updateDescription(' + index + ', ' + id + ', event)');
        addSubTaskButton.setAttribute('onclick', 'postComment(' + index + ', ' + id + ')');

        middlePanelAddTask.appendChild(commentInput);
        addSubTaskButton.appendChild(addSubTaskIcon);
        middlePanelAddTask.appendChild(addSubTaskButton);
        showSubTaskDetail.appendChild(subTaskTextBox);
        descriptionContent.appendChild(showSubTaskDetail);

        comments.forEach(function(commment) {
            var commentItem = getCreateElement('div');
            var commentItemText = getCreateElement('p');
            var commentedDate = getCreateElement('span');

            commentItem.className = 'comment-item';
            commentedDate.className = 'created-at';
            commentItemText.textContent = commment.text;
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
        if (listMenuItems[id].subtasks[index].comments.length > 10) {
            alert('Sub task limit exceeds');
            return false;
        }
        var value = getQuerySelector('#add-comment-input').value;
        if (value) {
            var commment = { text: value, commentedAt: new Date() }
            var commentItem = getCreateElement('div');
            var commentItemText = getCreateElement('p');
            var commentedDate = getCreateElement('span');
            var subtaskDetail = getQuerySelector('.subtask-detail');
            listMenuItems[id].subtasks[index].comments.push(commment);

            commentItem.className = 'comment-item';
            commentedDate.className = 'created-at';
            commentItemText.textContent = value;
            commentedDate.textContent = commment.commentedAt.toLocaleString();

            commentItem.appendChild(commentItemText);
            commentItem.appendChild(commentedDate);
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