// The dialog uses CSS in menu.css

import { twoWords } from "./utils/funRandom"
import { saveNew, getProjects, getDataFromLS, exportCurrentProject, importProject, saveDataToLS, save } from "./saveLoad"
import { showDialogTour } from "./driverTour"

// let workspace = null
import { workspace, settings, setWorkspaceTitle } from './main.js'
import { formatTimeSince } from "./utils/formatting"


const dialog = document.querySelector('#options-dialog')
const gearButton = document.querySelector('#menu')
const overlay = document.querySelector('.overlay')


function closeAction() {
	gearButton.classList.remove('open')
	overlay.classList.remove('open')
	dialog.close()
}

export function setupDialog() {
	const inputName = document.querySelector('#options-dialog input')
	const saveBtn = document.querySelector('#options-rename > button')

	const openAction = () => {
		gearButton.classList.add('open')
		overlay.classList.add('open')
		showDialog(dialog)
		// console.log('Settings: ', settings);
		if( settings.showDialogTour ) {
			showDialogTour()
			settings.showDialogTour = false
		}
	}

	overlay.addEventListener('click', closeAction)

	gearButton.addEventListener('click', () => {
		if( gearButton.classList.contains('open') ) {
			closeAction()
		} else {
			openAction()
		}
	})
	saveBtn.addEventListener('click', () => {
		saveNew(inputName.value || twoWords() )
		renderDialog()
	})
	dialog.addEventListener('click', e => e.stopPropagation())
	// showDialog(dialog)
}

function renderDialog() {
	dialog.querySelector('input').value = twoWords()

	const projects = getProjects()
	const projectContainer = document.querySelector('dialog .projects')
	projects.sort((a, b) => a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0)
	projectContainer.innerHTML = ''
	projects.forEach(p => {
		const ts = formatTimeSince(p.timestamp)
		const item = document.createElement('p')
		item.classList.add('item')
		item.innerHTML = `
		<div class="vertical">
			<p class="name">${p.name}</p> <p>${ts}</p>
		</div>
		`
		const btn = document.createElement('button')
		btn.innerText = 'Byt till'
		const removeBtn = document.createElement('button')
		removeBtn.innerText = '🗑️'
		removeBtn.alt = 'Ta bort'
		removeBtn.className = 'ghost'
		btn.addEventListener('click', () => loadCode(p))
		removeBtn.addEventListener('click', () => deleteCode(p))

		item.append(btn)
		item.append(removeBtn)
		projectContainer.append(item)
		projectContainer.append(item)
	})
}

function loadCode(p) {
	// console.log('loadCode', p);
	// Save current project
	const current = exportCurrentProject()
	const lsData = getDataFromLS()
	// const index = projects.findIndex(p => p.id === lsData.currentId)
	lsData.snippets = lsData.snippets.map(s => s.id !== p.id ? s : current )

	// Load selected project
	lsData.currentId = p.id 
	importProject(p.data)
	setWorkspaceTitle(p.name)
	closeAction()  // close dialog (simulate click on gear)
}

function deleteCode(p) {
	// console.log('deleteCode', p);
	// Save current project first
	const lsData = getDataFromLS()
	const name = lsData.snippets.find(s => s.id === lsData.currentId)?.name || 'Clown fiesta'
	save(name)

	lsData.snippets = lsData.snippets.filter(s => s.id !== p.id)
	if( lsData.currentId === p.id ) {
		// If we removed the current project
		lsData.currentId = lsData.snippets[0]?.id || null
	}
	saveDataToLS(lsData)
	// load all from LS
	// delete project from array
	// save back to LS

	renderDialog()
}


function showDialog() {
	renderDialog()
	dialog.show()
}

