
function twoWords() {
	const first = ['anxious', 'happy', 'sad', 'bewildered', 'evil', 'kind', 'super', 'hasty']
	const second = ['armadillo', 'robot', 'snake', 'cat', 'astronaut', 'fireman', 'doctor', 'penguin']

	return chooseOne(first) + ' ' + chooseOne(second)
}

function chooseOne(array) {
	let r = Math.floor(Math.random() * array.length)
	return array[r]
}

export { twoWords }
