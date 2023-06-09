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
		category('⭐Favoriter', ['text', 'math_number', 'logic_boolean', 'console_log', 'controls_ifelse', 'controls_whileUntil', 'variables_get', 'variables_set'], 'Vanliga block'),
		
		category('Värden', ['math_number', 'text', 'text_join', 'text_length', 'logic_boolean'], 'Number, String, Boolean'),
		category('Variabler', ['variables_get', 'variables_set'], 'Använd variabler för att spara värden, så de kan användas senare i koden.'),

		category('Programflöde', ['controls_if', 'controls_ifelse', 'controls_whileUntil', 'controls_for', 'controls_repeat', 'controls_repeat_ext'], 'Kontrollera flödet med val och upprepning.'),
		
		category('Logik (jämföra värden)', ['logic_compare', 'logic_operation', 'logic_boolean', 'logic_negate' ], 'Logiska operatorer, jämför värden och få true eller false.'),

		category('Matematik', ['math_arithmetic', 'math_random_int', 'math_round'], 'Matematiska operationer.'),
				
		category('Funktioner', ["procedures_callnoreturn", "procedures_callreturn", "procedures_defnoreturn", "procedures_defreturn", 'console_log'], 'Skapa egna eller använd befintliga.'),
		
		category('Listor', ["lists_create_empty", "lists_create_with", "lists_getIndex", "lists_setIndex", "lists_length"], 'Listor används för att spara flera värden av samma sort.'),
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
