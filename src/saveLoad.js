import { twoWords } from './funRandom.js'
import Blockly from 'blockly'
import { makeToast } from './makeToast.js'

const LS_KEY = 'get-coding-saves'

function defaultData() {
	return {
		selected: 0,
		snippets: [
			{
				name: twoWords(),
				data: ''
			}
		]
	}
}

function save(workspace, name='') {
	let json = Blockly.serialization.workspaces.save(workspace);
	// console.log('save 1', json);
	let saveData = tryParse(localStorage.getItem(LS_KEY))
	if( !name ) name = twoWords()

	let oldName = saveData.snippets[saveData.selected].name
	let newData = { name: oldName, data: json }
	saveData.snippets[saveData.selected].data = json
	// console.log('save 2', saveData);

	localStorage.setItem(LS_KEY, JSON.stringify(saveData))
	makeToast('Sparade block.')
}
function load(workspace) {
	let data = tryParse(localStorage.getItem(LS_KEY))
	let wsData = data.snippets[data.selected]  // {name,data}
	// console.log('load 1', wsData, wsData.data);
	Blockly.serialization.workspaces.load(wsData.data, workspace);
	makeToast('Laddade block.')
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

export { save, load }
