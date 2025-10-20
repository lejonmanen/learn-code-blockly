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
			popover: { title: 'Kod', description: 'De block du lägger in omvandlas till kod, som visas här. <br><br> Tips: klicka på "Kopiera kod" för att kopiera all kod i rutan. Klistra in koden i en .js-fil och kör den genom att skriva i terminalen: <code> node exempel.js </code> '}
		},
		{
			element: '#export-btn',
			popover: { title: 'Spara workspace', description: 'Klicka här för att kopiera alla block du har lagt ut. <br> <br> Klistra in koden i valfri fil, till exempel "save01.txt", med Ctrl+V.'}
		},
		{
			element: '#import-btn',
			popover: { title: 'Ladda workspace', description: 'Börja med att kopiera koden för block som du tidigare har sparat. (Ctrl+C) Klicka sedan här för att ladda blocken i arbetsytan.'}
		},
		{
			popover: {
				title: 'Nu kör vi!',
				description: 'Klicka på "Favoriter", dra ut strängblocket "_" och blocket console.log. Kombinera dem, så du får kod som kan skriva ut "Hello world".'
			}
		}
		// {
		// 	element: '#menu',
		// 	popover: { title: 'Meny', description: 'Här kan du spara eller ta bort din kod, eller ladda ett tidigare projekt.' }
		// }
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
	driverObj.drive()
}

export function showDialogTour() {
	const driverObj2 = driver()
	driverObj2.setConfig({
		...defaultSettings,
		steps: [
			{
				element: '#options-rename',
				popover: { title: 'Spara din kod', description: 'Klicka för att spara din kod. Programmet slumpar ett namn.' }
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