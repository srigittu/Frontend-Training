(function() {
	'use strict'

	// Get element by passing selector
	function getQuerySelector(selector) {
		return document.querySelector(selector);
	}

	// Get element value by passing selectorName
	function getElementValue(selectorName) {
		return document.getElementsByName(selectorName)[0].value;
	}

	//Days to go for xmas
	var daysButton = getQuerySelector('.check-days');
	daysButton.addEventListener('click', checkDays);

	function checkDays() {
		var current = new Date();
		var nextYear = current.getFullYear();
		var today = new Date(current.getFullYear(), current.getMonth(), current.getDate());
		(today.getMonth() === 11 && today.getDate() > 25) ? nextYear++ : nextYear;
		var expectedDay = new Date(nextYear, 11, 25);
		getQuerySelector('.check-days-ans').textContent = Math.abs((expectedDay-today)/(24*60*60*1000)) + ' Days to go for Xmas!';
	}

	// Check string starts with defined charcters
	var checkButton = getQuerySelector('.check-string');
	checkButton.addEventListener('click', checkString);

	function checkString() {
		var definedString = 'Java';
		var check = getElementValue("checkString");
		var result = '';
		if (check.indexOf(definedString) !== -1) {
			result = 'Your string is starts with \'Java\'';
		} else {
			result = 'Your string is doesn\'t starts with \'Java\'';
		}
		getQuerySelector('.check-string-ans').textContent = result;
	}

	// String formatted in alphabetical order
	var formatButton = getQuerySelector('.format-string');
	formatButton.addEventListener('click', formatString);

	function formatString() {
		var format = getElementValue("sortString");
		var formatted = format.split('').sort().join('');
		getQuerySelector('.format-string-ans').textContent = 'Alphabetical order: '+formatted;
	}

	// character check in a string
	var occurenceButton = getQuerySelector('.check-occurence');
	occurenceButton.addEventListener('click', characterCheck);

	function characterCheck() {
		var stringValue = getElementValue("countString");
		var charcterToCheck = getElementValue("countChar");
		var count = 0;
		for (var i = 0; i < stringValue.length; i++) {
			if (stringValue[i] === charcterToCheck) {
				count++;
			}
		}
		getQuerySelector('.check-occurence-ans').textContent = 'Number of occurences: '+count;
	}

	// Create dynamic array in a string

	var rangeButton = getQuerySelector('.range-array');
	rangeButton.addEventListener('click', dynamicArray);

	function dynamicArray() {
		var startNumber = getElementValue("startNumber");
		var arraySize = getElementValue("arraySize");
		var dynamicArray = [];
		for (var i = 0; i < arraySize; i++) {
			dynamicArray.push(parseInt(startNumber) + i);
		}
		getQuerySelector('.range-array-ans').textContent = 'Created array: '+dynamicArray;
	}
})();