import './style.css'
import Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'
import { config } from './blocklyConfig.js'

let bdiv = document.querySelector('.blockly')
let btn = document.querySelector('#initBtn')


function init() {
	
	console.log('injecting...');
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

btn.addEventListener('click', () => {
	init()
	btn.disabled = true
})



workspace.toolbox