import { twoWords } from './utils/funRandom.js'
import { serialization } from 'blockly'
import { makeToast } from './utils/makeToast.js'
import { workspace, settings, setWorkspaceTitle } from './main.js'

const LS_KEY = 'koda-med-blockly'

function defaultData() {
	return {
		settings: {
			showGuide: true,
			showDialogGuide: true
		},
		currentId: null,
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

function exportCurrentProject() {
	return serialization.workspaces.save(workspace);
}
function importProject(blocklyData) {
	serialization.workspaces.load(blocklyData, workspace);
	makeToast('Laddade block.')
}
function getDataFromLS() {
	// console.log('save 1', json);
	return tryParse(localStorage.getItem(LS_KEY))
}
function saveDataToLS(data) {
	localStorage.setItem(LS_KEY, JSON.stringify(data))
}
function newId() {
	return Math.ceil(Math.random() * 1e8)
}
function makeNewSaveObject(data, name) {
	if (!name) name = twoWords()
	return { name, timestamp: Date.now(), data, id: newId() }

}
// Saves current project, replacing the old save
// Returns name of saved project
function save(name='') {
	let json = exportCurrentProject()
	let currentData = getDataFromLS()
	// Current data is either old data or fresh default data

	const id = currentData.currentId
	const index = currentData.snippets.findIndex(p => p.id === id)
	if( index === -1 ) {
		return saveNew(name)
	}

	console.log('Saving, settings=', settings);
	if( settings != null ) {
		currentData.settings = settings
	}

	let newData = makeNewSaveObject(json, name)
	// update existing
	currentData.snippets[index] = newData


	localStorage.setItem(LS_KEY, JSON.stringify(currentData))
	makeToast('Sparade block.')
	return name
}
// Save project as a new slot
function saveNew(name='') {
	let json = exportCurrentProject()
	let currentData = getDataFromLS()
	// Current data is either old data or fresh default data

	let newData = makeNewSaveObject(json, name)
	let index = currentData.length

	// insert first
	currentData.snippets.unshift(newData)
	currentData.currentId = newData.id
	
	localStorage.setItem(LS_KEY, JSON.stringify(currentData))
	makeToast('Sparade block.')
	return name
}
function load() {
	let data = tryParse(localStorage.getItem(LS_KEY))
	let wsData = data.snippets.find(s => s.id === data.currentId)
	if( !wsData ) {
		makeToast('Hittade inget tidigare projekt.')
		console.log('Det gick inte att ladda tidigare projekt. Det kan bero på att det inte finns några, eller att inget projekt är valt.');
		return
	}
	Blockly.serialization.workspaces.load(wsData.data, workspace);
	makeToast('Laddade block.')
	console.log('Tidigare projekt lästes in.');
	setWorkspaceTitle(wsData.name)
	return wsData.name
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

export { save, saveNew, load, getSettings, getProjects, getDataFromLS, saveDataToLS, exportCurrentProject, importProject }
