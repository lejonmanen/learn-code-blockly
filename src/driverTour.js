import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const defaultSettings = {
	animate: true,
	popoverClass: 'popover',
	showProgress: true,
	progressText: `{{current}} av {{total}}`,
	showButtons: ['next', 'previous'],
	nextBtnText: 'Nästa',
	prevBtnText: 'Föregående',
	doneBtnText: 'Stäng'
}

const driverObj = driver()
driverObj.setConfig({
	...defaultSettings,

	steps: [
		{
			popover: {
				title: 'Välkommen!',
				description: 'Denna guide introducerar de viktigaste funktionerna. Klicka på knappen "Nästa" för att fortsätta.'
			}
		},
		{
			element: '#tour-btn',
			popover: { title: 'Guide', description: 'Klicka här om du vill visa guiden igen. <br> <br> Tips: du kan använda piltangenterna för att gå till nästa steg, eller Esc för att stänga guiden.'}
		},
		{
			element: '.blocklyToolboxDiv',
			popover: { title: 'Kategorier', description: 'Börja med att välja en kategori. Dra sedan ut ett block till höger, på det vita området. <br> <br> Kombinera blocken som pusselbitar, för att skapa ett sammanhängande program.'}
		},
		{
			element: '.codeOutput',
			popover: { title: 'Kod', description: 'De block du lägger in omvandlas till kod, som visas här. <br><br> Tips: klicka på "Kopiera kod" för att kopiera all kod i rutan.'}
		},
		{
			element: '#menu',
			popover: { title: 'Meny', description: 'Här kan du spara eller ta bort din kod, eller ladda ett tidigare projekt.' }
		}
		/*{
			element: '#save-btn',
			popover: {
				title: 'Spara',
				description: 'Klicka för att slänga ändringar och spara ditt arbete i webbläsaren.'
			}
		}*/
	]
})

export function showTour() {
	console.log('go gadget 1');
	driverObj.drive()
}

export function showDialogTour() {
	console.log('go gadget 2');
	const driverObj2 = driver()
	driverObj2.setConfig({
		...defaultSettings,
		steps: [
			{
				element: '#options-rename',
				popover: { title: 'Spara din kod', description: 'Klicka för att spara din kod. Programmet slumpar ett namn, om du inte vill hitta på ett eget.' }
			},
			{
				element: '#options-dialog .projects',
				popover: { title: 'Dina projekt', description: 'Här kan du byta till ett tidigare projekt.' }
			},
			{
				element: '#options-dialog',
				popover: { title: 'Stänga', description: 'Klicka i det gråa området utanför dialogrutan för att stänga den.' }
			}
		]
	})
	driverObj2.drive()
}