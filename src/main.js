import './style.css'
import Blockly from 'blockly'
import * as Sv from 'blockly/msg/sv';
import { javascriptGenerator } from 'blockly/javascript'
import { config } from './blocklyConfig.js'
import { save, load } from './saveLoad.js'

let bdiv = document.querySelector('.blockly')
let btn = document.querySelector('#initBtn')
let loadBtn = document.querySelector('#load-btn')
let saveBtn = document.querySelector('#save-btn')

// TODO
// Variable: let instead of var, undefined as default value
// Higher order function blocks: forEach, map, find, filter
// Objects, null, undefined
// Save to localStorage. Array

function init() {
	Blockly.setLocale(Sv);
	console.log('main: Injecting Blockly in page...');
	
	let ws = Blockly.inject(bdiv, config)
	// console.log('x', ws);
	return ws
}
let workspace = init()

function updateCode(event) {
	// console.log('main: update code', event);
	const jsCode = javascriptGenerator.workspaceToCode(workspace)
	let output = document.querySelector('.codeOutput')
	console.log('main: update code', jsCode);
	output.innerText = jsCode
}
workspace.addChangeListener(updateCode)
// workspace.addTopBlock()
// workspace.toolbox

btn.addEventListener('click', () => {
	init()
	btn.disabled = true
})

loadBtn.addEventListener('click', () => load(workspace))
saveBtn.addEventListener('click', () => save(workspace))

try {
	load(workspace)
	let msg = 'Laddade sparade block från tidigare session.'
	console.log(msg);
} catch(error) {
	console.log('Failed to load blocks. Most likely cause is corrupted data in localStorage.\n' + error.message);
}