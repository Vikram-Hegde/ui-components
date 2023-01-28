let slider = document.getElementById('slider'),
	sliderItems = document.getElementById('slides'),
	prev = document.getElementById('prev'),
	next = document.getElementById('next'),
	bubbles = document.querySelector('.bubbles'),
	slides = document.getElementsByClassName('slide'),
	bubble
for (let i = 0; i < slides.length; i++) {
	bubble = document.createElement('div')
	bubble.classList.add('bubble')
	console.log(bubble)
	bubbles.append(bubble)
}

console.log(bubbles)
function slide(bubbles, slides, wrapper, items, prev, next) {
	let posX1 = 0,
		posX2 = 0,
		posInitial,
		posFinal,
		threshold = 100,
		slidesLength = slides.length,
		slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
		firstSlide = slides[0],
		lastSlide = slides[slidesLength - 1],
		cloneFirst = firstSlide.cloneNode(true),
		cloneLast = lastSlide.cloneNode(true),
		index = 0,
		allowShift = true,
		bubblez = document.querySelectorAll('.bubble')
	// 746
	items.appendChild(cloneFirst)
	items.insertBefore(cloneLast, firstSlide)
	bubblez[0].classList.add('active')
	items.addEventListener('touchstart', dragStart)
	items.addEventListener('touchend', dragEnd)
	items.addEventListener('touchmove', dragAction)

	prev.addEventListener('click', function () {
		shiftSlide(-1)
	})
	next.addEventListener('click', function () {
		shiftSlide(1)
	})

	items.addEventListener('transitionend', checkIndex)

	function dragStart(e) {
		e.preventDefault()
		posInitial = items.offsetLeft

		if (e.type == 'touchstart') {
			posX1 = e.touches[0].clientX
		} else {
			posX1 = e.clientX
			document.onmouseup = dragEnd
			document.onmousemove = dragAction
		}
	}

	function dragAction(e) {
		if (e.type == 'touchmove') {
			posX2 = posX1 - e.touches[0].clientX
			posX1 = e.touches[0].clientX
		} else {
			posX2 = posX1 - e.clientX
			posX1 = e.clientX
		}
		items.style.left = items.offsetLeft - posX2 + 'px'
	}

	function dragEnd(e) {
		posFinal = items.offsetLeft
		if (posFinal - posInitial < -threshold) {
			shiftSlide(1, 'drag')
		} else if (posFinal - posInitial > threshold) {
			shiftSlide(-1, 'drag')
		} else {
			items.style.left = posInitial + 'px'
		}
	}

	function shiftSlide(dir, action) {
		items.classList.add('shifting')

		if (allowShift) {
			if (!action) {
				posInitial = items.offsetLeft
			}

			if (dir == 1) {
				items.style.left = posInitial - slideSize + 'px'
				index++
			} else if (dir == -1) {
				items.style.left = posInitial + slideSize + 'px'
				index--
			}
		}
		allowShift = false
	}

	function checkIndex() {
		items.classList.remove('shifting')

		if (index == -1) {
			items.style.left = -(slidesLength * slideSize) + 'px'
			index = slidesLength - 1
		}

		if (index == slidesLength) {
			items.style.left = -(1 * slideSize) + 'px'
			index = 0
		}
		bubblez.forEach((bubble) => {
			bubble.classList.remove('active')
		})
		bubblez[index].classList.add('active')
		allowShift = true
	}
}

slide(bubbles, slides, slider, sliderItems, prev, next)
let size = window.innerWidth || document.documentElement.clientWidth
window.addEventListener('resize', () => {
	size = window.innerWidth || document.documentElement.clientWidth
	if (size <= 700) {
		location.reload()
		console.log('refresh')
	}
})
