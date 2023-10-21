
function twoWords() {
	const first = ['anxious', 'happy', 'sad', 'bewildered', 'evil',
		'kind', 'super', 'hasty', 'tasty', 'delicious', 'present',
		'studious', 'expert', 'nice', 'nyan', 'digital', 'hacker'
	]
	const second = ['armadillo', 'robot', 'snake', 'cat', 'astronaut',
		'fireman', 'doctor', 'penguin', 'nurse', 'mountain', 'cyborg',
		'student', 'troll', 'elf', 'hobbit', 'badger', 'firefly'
	]

	return chooseOne(first) + ' ' + chooseOne(second)
}

function chooseOne(array) {
	let r = Math.floor(Math.random() * array.length)
	return array[r]
}

export { twoWords }
