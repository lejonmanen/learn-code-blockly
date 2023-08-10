import './styles/style.css'
import './styles/split.css'
import Blockly from 'blockly'
import * as Sv from 'blockly/msg/sv';
import { javascriptGenerator } from 'blockly/javascript'
import { config } from './blocklyConfig.js'
import hljs from './highlight/highlight.min.js';
import './highlight/styles.min.css';

import { save, load } from './saveLoad.js'
import { makeToast } from './makeToast.js'
import { enableSplit } from './splitPane';

const bdiv = document.querySelector('.blockly')
const btn = document.querySelector('#initBtn')
const loadBtn = document.querySelector('#load-btn')
const saveBtn = document.querySelector('#save-btn')
const copyBtn = document.querySelector('.codeOutput button')
const output = document.querySelector('.codeOutput code')

// TODO
// Variable: let instead of var, undefined as default value
// Higher order function blocks: forEach, map, find, filter
// Objects, null, undefined

function init() {
	
	Blockly.setLocale(Sv);
	console.log('main: Injecting Blockly in page...');
	let ws = Blockly.inject(bdiv, config)

	// Resize code input and output areas
	enableSplit(() => Blockly.svgResize(ws))

	// JavaScript syntax highlighting
	hljs.highlightElement(output)
	
	return ws
}
let workspace = init()

function updateCode(event) {
	// console.log('main: update code', event);
	const jsCode = javascriptGenerator.workspaceToCode(workspace)
	output.textContent = jsCode
	hljs.highlightElement(output)
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
copyBtn.addEventListener('click', () => {
	navigator.clipboard.writeText(output.innerText)
	makeToast('Koden kopierad!')
})

try {
	load(workspace)
	let msg = 'Laddade sparade block från tidigare session.'
	console.log(msg);
} catch(error) {
	console.log('Failed to load blocks. Most likely cause is corrupted data in localStorage.\n' + error.message);
}