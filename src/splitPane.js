// Reworked code from stack overflow answer
// https://stackoverflow.com/questions/12194469/best-way-to-do-a-split-pane-in-html

// A function is used for dragging and moving
function dragElement(element, direction, onResize=null) {
	let md; // remember mouse down info
	const first = document.querySelector(".splitter > :first-child");
	const second = document.querySelector(".splitter > :nth-child(3)");

	element.addEventListener('mousedown', onMouseDown);

	function onMouseDown(e) {
		md = {
			e,
			offsetLeft: element.offsetLeft,
			offsetTop: element.offsetTop,
			firstWidth: first.offsetWidth,
			secondWidth: second.offsetWidth,
			firstHeight: first.offsetHeight,
			secondHeight: second.offsetHeight
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp)

		function onMouseUp(e) {
			document.removeEventListener('mousemove', onMouseMove)
			document.removeEventListener('mouseup', onMouseUp)
		}
	}

	function onMouseMove(e) {
		// TODO: add code that implements minimum height. Check height/width values before setting them.
		
		let delta = {
			x: e.clientX - md.e.clientX,
			y: e.clientY - md.e.clientY
		};

		if (direction === "H") { // Horizontal
			// Prevent negative-sized elements
			delta.x = Math.min(Math.max(delta.x, -md.firstWidth),
				md.secondWidth);

			element.style.left = md.offsetLeft + delta.x + "px";
			first.style.width = (md.firstWidth + delta.x) + "px";
			second.style.width = (md.secondWidth - delta.x) + "px";

		} else if( direction === 'V' ) {
			// Prevent negative-sized elements
			delta.y = Math.min(Math.max(delta.y, -md.firstHeight),
				md.secondHeight);

			element.style.top = md.offsetTop + delta.y + "px";
			first.style.height = (md.firstHeight + delta.y) + "px";
			second.style.height = (md.secondHeight - delta.y) + "px";
		}

		if( onResize ) onResize()
	}
}


export function enableSplit(onResize) {
	dragElement(document.querySelector(".splitter > .separator"), "V", onResize);
}
