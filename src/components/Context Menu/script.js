let menu = document.querySelector('.menu');
document.addEventListener('contextmenu', (e) => {
	e.preventDefault();
	menu.style.display = 'flex';
	var width =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth;
	var height =
		window.innerHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight;
	let menuDimensions = menu.getBoundingClientRect();
	let menuW = menuDimensions.width,
		menuH = menuDimensions.height;
	let pos = {
		top: e.clientY,
		left: e.clientX,
		right: 'auto',
		toggleLR: 1,
	};
	let thresholdW = menuW + e.clientX >= parseInt(width);
	let thresholdWOptions = menuW * 2 + e.clientX >= parseInt(width);
	let thresholdH = menuH + e.clientY >= parseInt(height);
	let x = 0,
		y = 0;
	if (thresholdW) {
		pos = {
			top: e.clientY,
			right: width - e.clientX,
			left: 'auto',
			toggleLR: -1,
		};
		x = 100;
		y = 0;
	}
	if (thresholdWOptions) {
		pos.toggleLR = -1;
	}
	if (thresholdH) {
		pos = {
			top: e.clientY - menuH,
			left: e.clientX,
			right: 'auto',
			toggleLR: 1,
		};
		x = 0;
		y = 100;
	}
	if (thresholdH && thresholdW) {
		pos = {
			top: e.clientY - menuH,
			left: 'auto',
			right: width - e.clientX,
			toggleLR: -1,
		};
		x = 100;
		y = 100;
	}
	menu.setAttribute(
		'style',
		`display: flex; --toggle: ${pos.toggleLR}; top: ${pos.top}px; left: ${pos.left}px; right: ${pos.right}px`
	);
	menu.animate(
		[
			{ clipPath: `circle(0% at ${x}% ${y}%` },
			{ clipPath: `circle(210% at ${x}% ${y}%` },
		],
		{
			duration: 250,
			easing: 'ease-in-out',
		}
	);
});

document.addEventListener('click', (e) => {
	if (menu.contains(e.target)) return;
	menu
		.animate(
			[
				{ transform: 'scale(1) translateY(0)', opacity: 1 },
				{ transform: 'scale(0.9) translateY(20px)', opacity: 0 },
			],
			{ duration: 100, easing: 'ease-out' }
		)
		.finished.then(() => (menu.style.display = 'none'));
});
