let menu = document.querySelector('.menu')
let touchDevice = window.matchMedia('(hover: none), (pointer: coarse)')

document.addEventListener('contextmenu', (e) => {
	e.preventDefault()
	menu.style.display = 'flex'
	if (touchDevice.matches) return

	const width =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth
	const height =
		window.innerHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight

	let menuDimensions = menu.getBoundingClientRect()
	let menuW = menuDimensions.width,
		menuH = menuDimensions.height

	let pos = {
		top: e.clientY,
		left: e.clientX,
		right: 'auto',
		toggleLR: 1,
	}

	let thresholdW = menuW + e.clientX >= parseInt(width)
	let thresholdWOptions = menuW * 2 + e.clientX >= parseInt(width)
	let thresholdH = menuH + e.clientY >= parseInt(height)

	let x = 0,
		y = 0

	if (thresholdH && thresholdW) {
		pos = {
			top: e.clientY - menuH,
			left: 'auto',
			right: width - e.clientX,
			toggleLR: -1,
		}
		x = 100
		y = 100
	} else if (thresholdW) {
		pos = {
			top: e.clientY,
			left: 'auto',
			right: width - e.clientX,
			toggleLR: -1,
		}
		x = 100
	} else if (thresholdWOptions) {
		pos.toggleLR = -1
	} else if (thresholdH) {
		pos = {
			top: e.clientY - menuH,
			left: e.clientX,
			right: 'auto',
			toggleLR: 1,
		}
		y = 100
	}

	menu.setAttribute(
		'style',
		//`display: flex; --toggle: ${pos.toggleLR}; top: ${pos.top}px; left: ${pos.left}px; right: ${pos.right}px`
		`display: flex; --toggle: ${pos.toggleLR}; top: ${pos.top}px; left: ${pos.left === 'auto' ? pos.left : pos.left + 'px'}; right: ${pos.right === 'auto' ? pos.right : pos.right + 'px'}`
	)

	menu.animate(
		[
			{ clipPath: `circle(0% at ${x}% ${y}%` },
			{ clipPath: `circle(210% at ${x}% ${y}%` },
		],
		{
			duration: 250,
			easing: 'ease-in-out',
		}
	)
})

document.addEventListener('click', (e) => {
	if (menu.contains(e.target)) return
	let translateX = 0
	if (touchDevice.matches) {
		translateX = -50
	}
	menu
		.animate(
			[
				{ transform: `translate(${translateX}%, 0) scale(1)`, opacity: 1 },
				{ transform: `translate(${translateX}%, 20px) scale(0.9)`, opacity: 0 },
			],
			{ duration: 100, easing: 'ease-in-out' }
		)
		.finished.then(() => (menu.style.display = 'none'))
})
