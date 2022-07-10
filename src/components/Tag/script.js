let input = document.querySelector('#tag-input');
let form = document.querySelector('.input-form');
let tagInput = document.querySelector('.component__tag-input');

const addTag = (text) => {
	if (!text) return;
	let tag = document.createElement('div');
	tag.classList.add('tag');
	tag.innerHTML = `
	 ${text}
		<button class="icon icon-delete">
			<svg height="16" width="16">
				<use href="#delete-icon" />
			</svg>	
		</button>
`.trim();
	form.before(tag);
	form.reset();
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	addTag(input.value);
});

input.addEventListener('keydown', (e) => {
	if (e.code === 'Comma') {
		e.preventDefault();
		addTag(input.value);
	} 
	else if (e.code === 'Backspace' && !input.value.length)
		e.target.parentNode?.previousElementSibling?.remove();
});

tagInput.addEventListener('click', (e) => {
	if (!e.target.classList.contains('icon-delete')) return;
	let animation = e.target.parentNode.animate(
		[{ transform: 'scale(1.0)' }, { transform: 'scale(0.5)' }],
		{
			fill: 'forwards',
			duration: 50,
			easing: 'ease-in',
		}
	);
	animation.finished.then(() => e.target.parentNode.remove());
});
