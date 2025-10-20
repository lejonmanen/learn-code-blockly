import './styles/style.css'
import './styles/split.css'
import './styles/menu.css'
import { setLocale, inject, svgResize } from 'blockly'
import * as Sv from 'blockly/msg/sv';
import { javascriptGenerator } from 'blockly/javascript'
import { config } from './blocklyConfig.js'

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/default.css';

import { save, load, getSettings } from './saveLoad.js'
import { makeToast } from './utils/makeToast.js'
import { enableSplit } from './splitPane';
import { showTour } from './driverTour';
import { setupDialog } from './dialog.js'
import { blocklyExport, blocklyImport } from './utils/importExport.js';

const bdiv = document.querySelector('.blockly')
const btn = document.querySelector('#initBtn')
const tourBtn = document.querySelector('#tour-btn')
const exBtn = document.querySelector('#export-btn')
const imBtn = document.querySelector('#import-btn')
// const loadBtn = document.querySelector('#load-btn')
const saveBtn = document.querySelector('#save-btn')
const copyBtn = document.querySelector('.codeOutput button')
const output = document.querySelector('.codeOutput code')

// TODO
// Show tour based on localStorage. Checkbox on first tour box.
// Variable: let instead of var, undefined as default value
// Higher order function blocks: forEach, map, find, filter
// Objects, null, undefined

const settings = getSettings()
if( settings.showGuide ) {
	showTour()
	settings.showGuide = false
}
let workspace = init()
setupDialog()  // save/load dialog


function init() {
	setLocale(Sv)
	console.log('** Learn with Blockly 2.0 **')
	console.log("Ignore the warning about getAllVariables, it's internal to Blockly. Hopefully it will be fixed in future versions.")
	console.log('Injecting Blockly...');
	let ws = inject(bdiv, config)

	// Resize code input and output areas
	enableSplit(() => svgResize(ws))

	// JavaScript syntax highlighting
	hljs.highlightElement(output, {language: 'javascript'})

	return ws
}


function updateCode(event) {
	const jsCode = javascriptGenerator.workspaceToCode(workspace)
	output.textContent = jsCode
	output.dataset.highlighted = ''
	hljs.highlightElement(output)
}


// ------ Listeners ------- //

workspace.addChangeListener(updateCode)
// workspace.addTopBlock()
// workspace.toolbox
btn.addEventListener('click', () => {
	init()
	btn.disabled = true
})

tourBtn.addEventListener('click', () => {
	showTour()
	settings.showDialogTour = true
})

exBtn.addEventListener('click', async () => {
	await blocklyExport(workspace)
	makeToast('Alla block kopierade')
})
imBtn.addEventListener('click', async () => {
	const result = await blocklyImport(workspace)
	if( result )
		makeToast('Importerade block')
	else
		makeToast('Kunde inte importera block')
})

function getName() {
	return document.querySelector('#options-dialog input').value || ''
}
// loadBtn.addEventListener('click', () => load(workspace))
// saveBtn.addEventListener('click', () => save(getName()))
copyBtn.addEventListener('click', () => {
	navigator.clipboard.writeText(output.innerText)
	makeToast('Koden kopierad!')
})

function setWorkspaceTitle(name='Namnlöst projekt') {
	document.title = `${name} | Koda med Blockly`
	document.querySelector('#snippet-title').innerText = name
}


function loadLastSession() {
	// Load saved blocks from previous session
	try {
		load(workspace)
		// let msg = 'Laddade sparade block från tidigare session.'
		// console.log(msg);
	} catch(error) {
		console.log('Failed to load blocks. Most likely cause is corrupted data in localStorage.\n' + error.message);
	}
}
// TODO: fix save/load, then enable this
// loadLastSession()


export { workspace, settings, setWorkspaceTitle }
