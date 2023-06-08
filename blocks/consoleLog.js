import Blockly from 'blockly'
// Extend the existing JavaScript code generator
import { javascriptGenerator as jsGen } from 'blockly/javascript'

// -------------------------------------------------- //
// Extend JavaScript code generator so that it can render code based on block
jsGen['console_log'] = function (block) {
	let value = jsGen.valueToCode(block, 'TEXT', jsGen.ORDER_NONE);
	let code = `console.log(${value})\n`;
	return code;
};


// console.log block
Blockly.Blocks['console_log'] = {
	init: function () {
		this.appendValueInput('TEXT')
			.setCheck(null)
			.appendField('console.log');
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(160);
		this.setTooltip('Prints the value to the console');
		this.setHelpUrl('');
	}
};

