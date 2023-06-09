import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function makeToast(text) {
	Toastify({
		text,
		duration: 3000,
		gravity: 'bottom',
		position: 'right',
		close: true,
		// newwindow
	}).showToast()
}

export { makeToast }
