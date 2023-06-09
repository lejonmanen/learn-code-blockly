import './blocks/consoleLog.js'

function category(name, blockTypes, lbl=null) {
	let xs = blockTypes.map(bt => block(bt))
	if( label ) { xs = [label(lbl), ...xs]}
	return {
		kind: 'category',
		name: name,
		contents: xs
	}
}
function block(type) {
	return { kind: 'block', type: type }
}
function label(text) {
	return { kind: 'label', text: text, "web-class": "my-label" }
}

const toolbox = {
	"kind": "categoryToolbox",
	"contents": [
		category('⭐Starred', [], 'Common blocks'),
		
		category('Control', ['controls_if', 'controls_ifelse', 'controls_whileUntil', 'controls_for', 'controls_repeat', 'controls_repeat_ext'], 'Controlling the flow of the code.'),
		
		category('Logic (compare)', ['logic_compare', 'logic_operation', 'logic_boolean', 'logic_negate' ], 'Logical operations, comparing values resulting in true or false.'),

		category('Numbers', ['math_arithmetic', 'math_number', 'math_random_int', 'math_round'], 'Mathematical operations.'),
		category('Strings', ['text', 'text_join', 'text_length'], 'Strings'),
		category('Booleans', ['logic_boolean'], 'A value that can be true or false. Use with Logic.'),
		category('Variables', ['variables_get', 'variables_set'], 'Variables are used to store values for later use.'),
				
		category('Functions', ['console_log'], 'Utility functions that do something or return a value.'),
		
		category('Lists', ["lists_create_empty", "lists_create_with", "lists_getIndex", "lists_setIndex", "lists_length"], 'Lists are collections of several values.'),
		category('My functions', ["procedures_callnoreturn", "procedures_callreturn", "procedures_defnoreturn", "procedures_defreturn"], 'Create your own functions'),
	]
}
const blocks = [
	
	"procedures_defnoreturn", "procedures_defreturn", "procedures_callnoreturn", "procedures_callreturn"
];


const grid = {
	spacing: 20,
	length: 1,
	colour: '#ccc',
	snap: true
}

const config = {
	toolbox, grid }

export { toolbox, config }
