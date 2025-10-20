import { serialization } from 'blockly'

// Exportera block till XML (som text)
async function blocklyExport(workspace) {
	const state = serialization.workspaces.save(workspace);
	const jsonText = JSON.stringify(state);
	await navigator.clipboard.writeText(jsonText)

	// // Ladda ner som fil
	// const blob = new Blob([xmlText], { type: 'text/xml' });
	// const url = URL.createObjectURL(blob);
	// const a = document.createElement('a');
	// a.href = url;
	// a.download = 'blockly_export.xml';
	// a.click();
	// URL.revokeObjectURL(url);
}

// Importera block från XML-fil
async function blocklyImport(workspace) {
	const text = await navigator.clipboard.readText()
	try {
		const state = JSON.parse(text);
		serialization.workspaces.load(state, workspace)
		return true
	} catch(error) {
		console.log('Fel vid import! Du måste ha tidigare exporterad kod i urklipp.')
		return false
	}
}

export { blocklyExport, blocklyImport }
