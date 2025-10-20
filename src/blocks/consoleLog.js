/*import * as Blockly from 'blockly'
import { JavaScript } from 'blockly/javascript'
// import 'blockly/javascript'
const Blocks = Blockly.Blocks

// -------------------------------------------------- //
// Extend JavaScript code generator so that it can render code based on block
JavaScript['console_log'] = function (block) {
	let value = JavaScript.valueToCode(block, 'TEXT', JavaScript.ORDER_ATOMIC);
	let code = `console.log(${value})\n`;
	return code;
};


// console.log block
Blocks['console_log'] = {
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
*/
import * as Blockly from 'blockly';
import 'blockly/javascript'; // registrerar generatorn globalt

const Blocks = Blockly.Blocks;
const JavaScript = Blockly.JavaScript; // finns nu efter importen

// -----------------------------
// Definiera ett "console.log"-block
Blocks['console_log'] = {
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

// -----------------------------
// Definiera hur generatorn skapar JS-kod från blocket
JavaScript['console_log'] = function (block) {
  const value = JavaScript.valueToCode(block, 'TEXT', JavaScript.ORDER_ATOMIC);
  const code = `console.log(${value});\n`;
  return code;
};
