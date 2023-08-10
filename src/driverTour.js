import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const driverObj = driver()
driverObj.setConfig({
	animate: true,
	popoverClass: 'popover',
	// disableActiveInteraction: true
	showProgress: true,
	showButtons: ['next', 'previous'],
	nextBtnText: 'Nästa',
	prevBtnText: 'Föregående',
	doneBtnText: 'Stäng',

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
			element: '#save-btn',
			popover: {
				title: 'Spara',
				description: 'Klicka för att slänga ändringar och spara ditt arbete i webbläsaren.'
			}
		},
		{
			element: '#load-btn',
			popover: {
				title: 'Ladda',
				description: 'Klicka för att återgå till senast sparade version. <br> <br> Nästa gång du besöker sidan, kommer den automatiskt att försöka ladda den senast sparade. <br> <br> Det var allt - börja koda!'
			}
		}
	]
})

export function showTour() {
	driverObj.drive()
}

