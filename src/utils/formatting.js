function formatTimeSince(ts) {
	const delta = (Date.now() - ts) / 1000
	const day = 60 * 60 * 24
	if (delta < 60) {
		return `${Math.ceil(delta)} sekunder sedan`
	} else if (delta < 60 * 60) {
		let min = Math.ceil(delta / 60)
		return `${min} minuter sedan`
	} else if (delta < day) {
		const d = new Date(ts)
		const fh = formatNumber(d.getHours())
		const fmi = formatNumber(d.getMinutes())
		// const fs = formatNumber(d.getSeconds())
		return `Idag ${fh}:${fmi}`
	}
	else if (delta < 2 * day) {
		const d = new Date(ts)
		const fh = formatNumber(d.getHours())
		const fmi = formatNumber(d.getMinutes())
		return `Igår ${fh}:${fmi}`
	} else {
		return 'Den ' + formatTimestamp(ts)
	}
}

function formatTimestamp(ts) {
	const d = new Date(ts)
	const fmo = formatNumber(d.getMonth())
	const fd = formatNumber(d.getDate())
	const fh = formatNumber(d.getHours())
	const fmi = formatNumber(d.getMinutes())
	const fs = formatNumber(d.getSeconds())
	return `${d.getFullYear()}-${fmo}-${fd} ${fh}:${fmi}:${fs}`
}

function formatNumber(n, digits = 2) {
	n = String(n)
	while (n.length < digits) {
		n = '0' + n
	}
	return n
}

export { formatNumber, formatTimeSince, formatTimestamp }
