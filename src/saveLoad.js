import { twoWords } from './funRandom.js'
import Blockly from 'blockly'
import { makeToast } from './makeToast.js'

const LS_KEY = 'koda-med-blockly'

function defaultData() {
	return {
		settings: {
			showGuide: true
		},
		currentIndex: null,
		snippets: [
			// {
			// 	name: twoWords(),
			//  timestamp: Date.now(),
			// 	data: ''
			// }
		]
	}
}

function getSettings() {
	try {
		let currentData = tryParse(localStorage.getItem(LS_KEY))
		return currentData.settings || {}
	} catch {
		return defaultData().settings
	}
}

// Returns name of saved project
function save(workspace, name='') {
	let json = Blockly.serialization.workspaces.save(workspace);
	// console.log('save 1', json);
	let currentData = tryParse(localStorage.getItem(LS_KEY))
	// Current data is either old data or fresh default data

	if( !name ) name = twoWords()
	let newData = { name, timestamp: Date.now(), data: json }
	let index = currentData.currentIndex
	if( index === null ) {
		// we got the default data, or no project selected
		currentData.snippets.push(newData)
		currentData.currentIndex = 0
	} else {
		// update existing
		currentData.snippets[index] = {
			data: json,
			name: name,
			timestamp: Date.now()
		}
	}

	localStorage.setItem(LS_KEY, JSON.stringify(currentData))
	makeToast('Sparade block.')
	return name
}
function saveNew(workspace, name='') {
	let json = Blockly.serialization.workspaces.save(workspace);
	// console.log('save 1', json);
	let currentData = tryParse(localStorage.getItem(LS_KEY))
	// Current data is either old data or fresh default data

	if (!name) name = twoWords()
	let newData = { name, timestamp: Date.now(), data: json }
	let index = currentData.length

	// update existing
	currentData.snippets.push({
		data: json,
		name: name,
		timestamp: Date.now()
	})
	currentData.currentIndex = currentData.snippets.length - 1
	
	localStorage.setItem(LS_KEY, JSON.stringify(currentData))
	makeToast('Sparade block.')
	return name
}
function load(workspace) {
	let data = tryParse(localStorage.getItem(LS_KEY))
	let wsData = data.snippets[data.currentIndex]  // {name,data}
	// console.log('load 1', wsData, wsData.data);
	Blockly.serialization.workspaces.load(wsData.data, workspace);
	makeToast('Laddade block.')
}
function getProjects() {
	return tryParse(localStorage.getItem(LS_KEY)).snippets
}

function tryParse(lsData) {
	// attempt to parse localStorage data as JSON
	if( !lsData || (typeof lsData) !== 'string' ) {
		return defaultData()
	}
	try {
		let data = JSON.parse(lsData)
		return data

	} catch(error) {
		console.log('Error parsing saved code snippets. ' + error.message);
	}
	return defaultData()
}

export { save, saveNew, load, getSettings, getProjects }
