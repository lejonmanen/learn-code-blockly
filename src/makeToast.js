import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function makeToast(text) {
	Toastify({
		text,
		duration: 3000,
		gravity: 'bottom',
		position: 'center',
		close: true
	}).showToast()
}

export { makeToast }
