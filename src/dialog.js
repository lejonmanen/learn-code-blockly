// The dialog uses CSS in menu.css

import { twoWords } from "./funRandom"
import { saveNew, getProjects } from "./saveLoad"

let workspace = null

export function setupDialog(ws) {
	// connect gear button to dialog
	// show/hide events
	// localstorage tjofräs
	workspace = ws

	const gearButton = document.querySelector('#menu')
	const dialog = document.querySelector('#options-dialog')
	const inputName = document.querySelector('#options-dialog input')
	const saveBtn = document.querySelector('#options-dialog > button')
	const overlay = document.querySelector('.overlay')

	const closeAction = () => {
		gearButton.classList.remove('open')
		overlay.classList.remove('open')
		hideDialog(dialog)
	}
	const openAction = () => {
		gearButton.classList.add('open')
		overlay.classList.add('open')
		showDialog(dialog)
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
		saveNew(workspace, inputName.value || twoWords() )
		renderDialog(dialog)
	})
	dialog.addEventListener('click', e => e.stopPropagation())
	// showDialog(dialog)
}

function renderDialog(dialog) {
	// TODO använd valt projekt om det finns
	dialog.querySelector('input').value = twoWords()

	const projects = getProjects()
	const projectContainer = document.querySelector('dialog .projects')
	projectContainer.innerHTML = ''
	projects.forEach(p => {
		const ts = formatTimestamp(p.timestamp)
		const item = document.createElement('p')
		item.classList.add('item')
		item.innerHTML = `<span>Den ${ts} | ${p.name}</span>`
		const btn = document.createElement('button')
		btn.innerText = 'Byt till'
		item.append(btn)
		// TODO btn.addEventListener byta till projekt
		// TODO remove-button 🗑️
		projectContainer.append(item)
	})
}
function showDialog(dialog) {
	renderDialog(dialog)
	dialog.show()
}
function formatTimestamp(ts) {
	const d = new Date(ts)
	const fmo = formatNumber(d.getMonth())
	const fd = formatNumber(d.getDate())
	const fh = formatNumber(d.getHours())
	const fmi = formatNumber(d.getMinutes())
	return `${d.getFullYear()}-${fmo}-${fd} ${fh}:${fmi}`
}
function formatNumber(n, digits=2) {
	n = String(n)
	while( n.length < digits ) {
		n = '0' + n
	}
	return n
}

function hideDialog(dialog) {
	dialog.close()
}